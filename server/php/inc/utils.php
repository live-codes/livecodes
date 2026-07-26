<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once dirname(__DIR__) . '/vendor/lzstring.php';

function encodeHTML(string $html): string
{
    return str_replace(
        ['&', '<', '>', "'", '"'],
        ['&amp;', '&lt;', '&gt;', '&#39;', '&#34;'],
        $html,
    );
}

function generateId(int $length = 11): string
{
    $alphabet = '23456789abcdefghijkmnpqrstuvwxyz';
    $max = strlen($alphabet) - 1;
    $id = '';
    for ($i = 0; $i < $length; $i++) {
        $id .= $alphabet[random_int(0, $max)];
    }
    return $id;
}

function getRequestOrigin(): string
{
    $https = $_SERVER['HTTPS'] ?? '';
    $scheme = $https !== '' && strtolower((string) $https) !== 'off' ? 'https' : 'http';
    return $scheme . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
}

function sendCorsHeaders(): void
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/**
 * Minimal HTTP client (curl-based).
 * Returns ['ok' => bool, 'status' => int, 'statusText' => string, 'headers' => array, 'body' => string].
 */
function fetchUrl(
    string $url,
    string $method = 'GET',
    ?string $body = null,
    array $headers = [],
    int $timeout = 5,
): array {
    $ch = curl_init($url);
    $responseHeaders = [];
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_HEADERFUNCTION => function ($ch, $line) use (&$responseHeaders) {
            $parts = explode(':', $line, 2);
            if (count($parts) === 2) {
                $responseHeaders[strtolower(trim($parts[0]))] = trim($parts[1]);
            }
            return strlen($line);
        },
    ]);
    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    }
    if ($headers !== []) {
        $headerLines = [];
        foreach ($headers as $name => $value) {
            $headerLines[] = "$name: $value";
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerLines);
    }
    $responseBody = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($responseBody === false) {
        return ['ok' => false, 'status' => 0, 'statusText' => '', 'headers' => [], 'body' => ''];
    }
    return [
        'ok' => $status >= 200 && $status < 300,
        'status' => $status,
        'statusText' => '',
        'headers' => $responseHeaders,
        'body' => (string) $responseBody,
    ];
}

function allowedOrigin(string $origin): bool
{
    $host = parse_url($origin, PHP_URL_HOST);
    if (!is_string($host) || $host === '') {
        return false;
    }
    $host = strtolower($host);
    $matchesDomain = fn(string $domain) => $host === $domain || str_ends_with($host, '.' . $domain);

    $configuredHost = strtolower(getConfig('HOST_NAME'));
    if ($configuredHost !== '' && $matchesDomain($configuredHost)) {
        return true;
    }
    return $matchesDomain('livecodes.io') ||
        $matchesDomain('livecodes.pages.dev') ||
        $matchesDomain('localpen.pages.dev') ||
        $matchesDomain('localhost') ||
        $host === '127.0.0.1' ||
        str_ends_with($host, '.test');
}

function getStarterTemplateTitle(string $name): string
{
    static $templates = null;
    if ($templates === null) {
        $templates = [];
        $file = __DIR__ . '/starter-templates.json';
        if (is_file($file)) {
            $decoded = json_decode((string) file_get_contents($file), true);
            if (is_array($decoded)) {
                $templates = $decoded;
            }
        }
    }
    return $templates[$name] ?? '';
}

function importCompressedCode(string $code): array
{
    try {
        $decoded = lzDecompressFromEncodedURIComponent($code);
        if ($decoded !== null && $decoded !== '') {
            $config = json_decode($decoded, true);
            if (is_array($config)) {
                return $config;
            }
        }
        // for backward compatibility
        $decoded = lzDecompressFromBase64($code);
        $config = $decoded !== null ? json_decode($decoded, true) : null;
        return is_array($config) ? $config : [];
    } catch (Throwable $e) {
        return [];
    }
}

function importProject(string $id): array
{
    if (strlen($id) === 14) {
        // self-hosted share ids are stored in the local database
        try {
            $stmt = getDb()->prepare('SELECT `config` FROM `share` WHERE LOWER(`id`) = LOWER(?)');
            $stmt->execute([$id]);
            $value = $stmt->fetchColumn();
            if (is_string($value)) {
                $config = json_decode($value, true);
                if (is_array($config)) {
                    return $config;
                }
            }
        } catch (Throwable $e) {
            // fall through to remote services
        }
    }
    // dpaste id length: 9, hosted API id length: 11, self-hosted id length: 14
    $apiUrl =
        strlen($id) < 11
            ? 'https://dpaste.com/' . $id . '.txt' // for backward compatibility
            : 'https://api2.livecodes.io/share?id=' . $id;
    try {
        $response = fetchUrl($apiUrl);
        if (!$response['ok']) {
            return [];
        }
        $config = json_decode($response['body'], true);
        return is_array($config) ? $config : [];
    } catch (Throwable $e) {
        return [];
    }
}

/**
 * Port of getProjectInfo() from functions/utils.ts.
 * Accepts a full URL (query string and fragment are both inspected).
 */
function getProjectInfo(string $url): array
{
    $query = [];
    $queryString = parse_url($url, PHP_URL_QUERY);
    if (is_string($queryString)) {
        parse_str($queryString, $query);
    }
    $fragment = '';
    $hashPos = strpos($url, '#');
    if ($hashPos !== false) {
        $fragment = substr($url, $hashPos + 1);
    }

    $title = isset($query['title']) && is_string($query['title']) ? $query['title'] : '';
    $description =
        isset($query['description']) && is_string($query['description'])
            ? $query['description']
            : '';
    if ($title !== '' || $description !== '') {
        return ['title' => $title, 'description' => $description];
    }

    $imports = isset($query['x']) && is_string($query['x']) && $query['x'] !== ''
        ? $query['x']
        : $fragment;
    if (str_starts_with($imports, 'code/')) {
        $config = importCompressedCode(substr($imports, 5));
        return [
            'title' => isset($config['title']) && is_string($config['title']) ? $config['title'] : '',
            'description' => isset($config['description']) && is_string($config['description'])
                ? $config['description']
                : '',
        ];
    }
    if (str_starts_with($imports, 'id/')) {
        $config = importProject(substr($imports, 3));
        return [
            'title' => isset($config['title']) && is_string($config['title']) ? $config['title'] : '',
            'description' => isset($config['description']) && is_string($config['description'])
                ? $config['description']
                : '',
        ];
    }

    $template =
        isset($query['template']) && is_string($query['template']) ? $query['template'] : '';
    if ($template !== '') {
        $templateName = getStarterTemplateTitle($template);
        if ($templateName !== '') {
            return [
                'title' => $templateName,
                'description' => $templateName . ' Template on LiveCodes',
            ];
        }
    }
    return ['title' => '', 'description' => ''];
}
