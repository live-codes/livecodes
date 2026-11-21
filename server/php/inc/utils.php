<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once dirname(__DIR__) . '/vendor/lzstring.php';

function encodeHTML(string $html): string
{
    return str_replace(
        ['&',     '<',    '>',    "'",      '"'],
        ['&amp;', '&lt;', '&gt;', '&#39;',  '&#34;'],
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
 * Checks whether a binary IP address (as returned by inet_pton) is inside a CIDR range.
 */
function ipInCidr(string $packed, string $cidr): bool
{
    $parts = explode('/', $cidr, 2);
    $network = @inet_pton($parts[0]);
    if ($network === false || strlen($network) !== strlen($packed)) {
        return false;
    }
    $bits = (int) $parts[1];
    $bytes = intdiv($bits, 8);
    if ($bytes > 0 && substr($packed, 0, $bytes) !== substr($network, 0, $bytes)) {
        return false;
    }
    $remainder = $bits % 8;
    if ($remainder === 0) {
        return true;
    }
    $mask = (0xff << (8 - $remainder)) & 0xff;
    return (ord($packed[$bytes]) & $mask) === (ord($network[$bytes]) & $mask);
}

/**
 * Returns true for addresses that server-side requests must not reach:
 * private, loopback, link-local, CGNAT, multicast, reserved and documentation ranges.
 */
function isBlockedIp(string $ip): bool
{
    $packed = @inet_pton($ip);
    if ($packed === false) {
        return true;
    }
    // unwrap IPv4-mapped IPv6 addresses (e.g. ::ffff:127.0.0.1)
    if (strlen($packed) === 16 && str_starts_with($packed, str_repeat("\0", 10) . "\xff\xff")) {
        $packed = substr($packed, 12);
    }
    static $blockedRanges = [
        '0.0.0.0/8',
        '10.0.0.0/8',
        '100.64.0.0/10',
        '127.0.0.0/8',
        '169.254.0.0/16',
        '172.16.0.0/12',
        '192.0.0.0/24',
        '192.0.2.0/24',
        '192.88.99.0/24',
        '192.168.0.0/16',
        '198.18.0.0/15',
        '198.51.100.0/24',
        '203.0.113.0/24',
        '224.0.0.0/4',
        '240.0.0.0/4',
        '::/96',
        '64:ff9b::/96',
        '64:ff9b:1::/48',
        '100::/64',
        '2001::/32',
        '2001:db8::/32',
        '2002::/16',
        'fc00::/7',
        'fec0::/10',
        'fe80::/10',
        'ff00::/8',
    ];
    foreach ($blockedRanges as $range) {
        if (ipInCidr($packed, $range)) {
            return true;
        }
    }
    return false;
}

function resolveHostAddresses(string $host): array
{
    $addresses = [];
    $ipv4 = @gethostbynamel($host);
    if (is_array($ipv4)) {
        $addresses = $ipv4;
    }
    if (function_exists('dns_get_record')) {
        $records = @dns_get_record($host, DNS_AAAA);
        if (is_array($records)) {
            foreach ($records as $record) {
                if (isset($record['ipv6']) && is_string($record['ipv6'])) {
                    $addresses[] = $record['ipv6'];
                }
            }
        }
    }
    return array_values(array_unique($addresses));
}

/**
 * Resolves a URL into a request target, or returns null when it must not be requested.
 *
 * The URL is rebuilt from its parsed parts so that curl and PHP agree on the
 * destination host, and `resolve` pins the validated address (using CURLOPT_RESOLVE)
 * so a later DNS answer cannot redirect the request to a different address.
 *
 * @return array{url: string, resolve: string|null}|null
 */
function getProxyTarget(string $url, bool $allowPrivateTargets = false): ?array
{
    $parts = parse_url($url);
    if (!is_array($parts) || !isset($parts['scheme'], $parts['host'])) {
        return null;
    }
    $scheme = strtolower((string) $parts['scheme']);
    if ($scheme !== 'http' && $scheme !== 'https') {
        return null;
    }
    $urlHost = strtolower((string) $parts['host']);
    $host = $urlHost;
    if (strlen($host) > 1 && $host[0] === '[' && str_ends_with($host, ']')) {
        $host = substr($host, 1, -1);
    }
    if ($host === '') {
        return null;
    }
    $defaultPort = $scheme === 'https' ? 443 : 80;
    $port = isset($parts['port']) ? (int) $parts['port'] : $defaultPort;
    if ($port < 1 || $port > 65535) {
        return null;
    }

    $isIpLiteral = filter_var($host, FILTER_VALIDATE_IP) !== false;
    // a non-literal host must be unambiguous, so curl cannot parse a different
    // host than the one that was validated and pinned
    if (!$isIpLiteral && preg_match('/^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/', $host) !== 1) {
        return null;
    }
    $addresses = $isIpLiteral ? [$host] : resolveHostAddresses($host);
    if ($addresses === []) {
        return null;
    }
    if (!$allowPrivateTargets) {
        foreach ($addresses as $address) {
            if (isBlockedIp($address)) {
                return null;
            }
        }
    }

    $path = isset($parts['path']) && $parts['path'] !== '' ? $parts['path'] : '/';
    $targetUrl = $scheme . '://' . $urlHost . ($port !== $defaultPort ? ':' . $port : '') . $path;
    if (isset($parts['query'])) {
        $targetUrl .= '?' . $parts['query'];
    }

    $resolve = null;
    if (!$isIpLiteral) {
        $address = $addresses[0];
        foreach ($addresses as $candidate) {
            // prefer IPv4
            if (!str_contains($candidate, ':')) {
                $address = $candidate;
                break;
            }
        }
        $resolve = $host . ':' . $port . ':' . (str_contains($address, ':') ? "[$address]" : $address);
    }

    return ['url' => $targetUrl, 'resolve' => $resolve];
}

function resolveRedirectUrl(string $baseUrl, string $location): ?string
{
    if ($location === '') {
        return null;
    }
    if (preg_match('#^[a-z][a-z0-9+.\-]*://#i', $location) === 1) {
        return $location;
    }
    $base = parse_url($baseUrl);
    if (!is_array($base) || !isset($base['scheme'], $base['host'])) {
        return null;
    }
    $origin =
        $base['scheme'] . '://' . $base['host'] . (isset($base['port']) ? ':' . $base['port'] : '');
    if (str_starts_with($location, '//')) {
        return $base['scheme'] . ':' . $location;
    }
    if (str_starts_with($location, '/')) {
        return $origin . $location;
    }
    if (str_starts_with($location, '?') || str_starts_with($location, '#')) {
        $path = isset($base['path']) && $base['path'] !== '' ? (string) $base['path'] : '/';
        return $origin . $path . $location;
    }
    $path = isset($base['path']) ? (string) $base['path'] : '/';
    $dir = substr($path, 0, (int) strrpos($path, '/') + 1);
    return $origin . ($dir !== '' ? $dir : '/') . $location;
}

/**
 * Returns the scheme://host:port of a URL, for comparing redirect origins.
 */
function getUrlOrigin(string $url): string
{
    $parts = parse_url($url);
    if (!is_array($parts) || !isset($parts['scheme'], $parts['host'])) {
        return '';
    }
    $origin = strtolower($parts['scheme']) . '://' . strtolower($parts['host']);
    if (isset($parts['port'])) {
        $origin .= ':' . $parts['port'];
    }
    return $origin;
}

/**
 * Removes credential headers so they are never forwarded to a different origin.
 */
function stripCredentialHeaders(array $headers): array
{
    $credentialHeaders = ['authorization', 'api-token', 'cookie', 'proxy-authorization'];
    foreach (array_keys($headers) as $name) {
        if (in_array(strtolower((string) $name), $credentialHeaders, true)) {
            unset($headers[$name]);
        }
    }
    return $headers;
}

/**
 * Minimal HTTP client (curl-based).
 * Only public http(s) targets are requested; redirects are followed manually
 * and each hop is validated. The Origin header is not a security boundary,
 * so it must not be relied on to protect this function.
 * Returns ['ok' => bool, 'status' => int, 'statusText' => string, 'headers' => array, 'body' => string].
 */
function fetchUrl(
    string $url,
    string $method = 'GET',
    ?string $body = null,
    array $headers = [],
    int $timeout = 5,
    bool $allowPrivateTargets = false,
    int $maxBytes = 100 * 1024 * 1024,
): array {
    $maxRedirects = 3;
    $currentUrl = $url;
    $currentMethod = $method;
    $currentBody = $body;
    $currentHeaders = $headers;
    // one deadline covers every redirect hop and the remaining budget is passed
    // to each request. Note: PHP cannot abort a blocking DNS lookup in
    // resolveHostAddresses(), so resolution time is bounded by the resolver's
    // own timeout (configure the system resolver accordingly), not by this value.
    $deadline = microtime(true) + $timeout;

    for ($redirects = 0; ; $redirects++) {
        $remaining = $deadline - microtime(true);
        if ($remaining <= 0) {
            return [
                'ok' => false,
                'status' => 504,
                'statusText' => 'Gateway Timeout!',
                'headers' => [],
                'body' => '',
            ];
        }
        // the trusted-target exemption covers only the configured initial URL;
        // redirect hops are always validated like any other target
        $target = getProxyTarget($currentUrl, $allowPrivateTargets && $redirects === 0);
        if ($target === null) {
            return [
                'ok' => false,
                'status' => 400,
                'statusText' => 'Bad Request!',
                'headers' => [],
                'body' => '',
            ];
        }
        // resolution may have consumed the whole budget; never start a request
        // with no time left (and never round the remaining time up)
        $remainingMs = (int) floor(($deadline - microtime(true)) * 1000);
        if ($remainingMs <= 0) {
            return [
                'ok' => false,
                'status' => 504,
                'statusText' => 'Gateway Timeout!',
                'headers' => [],
                'body' => '',
            ];
        }

        $responseHeaders = [];
        $responseBody = '';
        $tooLarge = false;
        $ch = curl_init($target['url']);
        if ($ch === false) {
            return ['ok' => false, 'status' => 0, 'statusText' => '', 'headers' => [], 'body' => ''];
        }
        $options = [
            CURLOPT_CUSTOMREQUEST => $currentMethod,
            CURLOPT_TIMEOUT_MS => $remainingMs,
            CURLOPT_FOLLOWLOCATION => false,
            // ignore outbound proxy settings from the environment
            CURLOPT_PROXY => '',
            CURLOPT_HEADERFUNCTION => function ($ch, $line) use (&$responseHeaders) {
                $parts = explode(':', $line, 2);
                if (count($parts) === 2) {
                    $responseHeaders[strtolower(trim($parts[0]))] = trim($parts[1]);
                }
                return strlen($line);
            },
            // enforce the size cap on the actual bytes received, not just on
            // the advertised Content-Length (which can be omitted or lie)
            CURLOPT_WRITEFUNCTION => function ($ch, $chunk) use (&$responseBody, &$tooLarge, $maxBytes) {
                if (strlen($responseBody) + strlen($chunk) > $maxBytes) {
                    $tooLarge = true;
                    return 0; // abort the transfer
                }
                $responseBody .= $chunk;
                return strlen($chunk);
            },
        ];
        // PHP 8.3 deprecates CURLOPT_PROTOCOLS in favor of CURLOPT_PROTOCOLS_STR
        if (defined('CURLOPT_PROTOCOLS_STR')) {
            $options[CURLOPT_PROTOCOLS_STR] = 'http,https';
        } else {
            $options[CURLOPT_PROTOCOLS] = CURLPROTO_HTTP | CURLPROTO_HTTPS;
        }
        if ($target['resolve'] !== null) {
            $options[CURLOPT_RESOLVE] = [$target['resolve']];
        }
        curl_setopt_array($ch, $options);
        if ($currentBody !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $currentBody);
        }
        if ($currentHeaders !== []) {
            $headerLines = [];
            foreach ($currentHeaders as $name => $value) {
                $headerLines[] = "$name: $value";
            }
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headerLines);
        }
        $result = curl_exec($ch);
        // read the error before closing the handle
        $errno = curl_errno($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        if ($tooLarge) {
            return [
                'ok' => false,
                'status' => 413,
                'statusText' => 'Payload Too Large!',
                'headers' => [],
                'body' => '',
            ];
        }
        if ($result === false) {
            if ($errno === CURLE_OPERATION_TIMEDOUT) {
                return [
                    'ok' => false,
                    'status' => 504,
                    'statusText' => 'Gateway Timeout!',
                    'headers' => [],
                    'body' => '',
                ];
            }
            return ['ok' => false, 'status' => 0, 'statusText' => '', 'headers' => [], 'body' => ''];
        }

        $location = $responseHeaders['location'] ?? '';
        $isRedirect = in_array($status, [301, 302, 303, 307, 308], true) && $location !== '';
        if (!$isRedirect) {
            return [
                'ok' => $status >= 200 && $status < 300,
                'status' => $status,
                'statusText' => '',
                'headers' => $responseHeaders,
                'body' => (string) $responseBody,
            ];
        }
        if ($redirects >= $maxRedirects) {
            break;
        }
        $nextUrl = resolveRedirectUrl($target['url'], $location);
        if ($nextUrl === null) {
            break;
        }
        if ($status === 303 || (in_array($status, [301, 302], true) && $currentMethod === 'POST')) {
            $currentMethod = 'GET';
            $currentBody = null;
            unset($currentHeaders['Content-Type']);
        }
        if (getUrlOrigin($nextUrl) !== getUrlOrigin($target['url'])) {
            $currentHeaders = stripCredentialHeaders($currentHeaders);
        }
        $currentUrl = $nextUrl;
    }

    return [
        'ok' => false,
        'status' => 502,
        'statusText' => 'Too Many Redirects!',
        'headers' => [],
        'body' => '',
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
            $stmt = getDb()->prepare('SELECT `config` FROM `share` WHERE `id` = ?');
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
    if (preg_match('/^[A-Za-z0-9]{1,32}$/', $id) !== 1) {
        return [];
    }
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
