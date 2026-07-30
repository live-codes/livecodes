<?php

/**
 * Port of functions/index.ts (Cloudflare Pages function).
 * Serves the app index page with project-specific meta tags and an oEmbed
 * discovery link injected, plus optional server-side analytics logging.
 */

require_once __DIR__ . '/inc/utils.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$origin = getRequestOrigin();
$currentUrl = $origin . ($_SERVER['REQUEST_URI'] ?? '/');

$data = [
    'url' => $currentUrl,
    'resource' => 'app',
    'method' => $method,
    'date' => date(DATE_W3C),
    'accept' => $_SERVER['HTTP_ACCEPT'] ?? null,
    'accept-encoding' => $_SERVER['HTTP_ACCEPT_ENCODING'] ?? null,
    'accept-language' => $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? null,
    'referer' => $_SERVER['HTTP_REFERER'] ?? null,
    'sec-ch-ua' => $_SERVER['HTTP_SEC_CH_UA'] ?? null,
    'sec-ch-ua-mobile' => $_SERVER['HTTP_SEC_CH_UA_MOBILE'] ?? null,
    'sec-ch-ua-platform' => $_SERVER['HTTP_SEC_CH_UA_PLATFORM'] ?? null,
    'sec-fetch-dest' => $_SERVER['HTTP_SEC_FETCH_DEST'] ?? null,
    'sec-fetch-mode' => $_SERVER['HTTP_SEC_FETCH_MODE'] ?? null,
    'sec-fetch-site' => $_SERVER['HTTP_SEC_FETCH_SITE'] ?? null,
    'user-agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
];

$indexFile = __DIR__ . '/index.html';
$originalBody = is_file($indexFile) ? file_get_contents($indexFile) : false;
if ($originalBody === false) {
    http_response_code(404);
    $notFound = __DIR__ . '/404.html';
    if (is_file($notFound)) {
        header('Content-Type: text/html; charset=utf-8');
        readfile($notFound);
    } else {
        echo 'Not Found!';
    }
    exit;
}

try {
    // oEmbed & meta tags
    $oembedUrl = rawurlencode($currentUrl);
    $info = getProjectInfo($currentUrl);
    $title = $info['title'];
    $description = $info['description'];

    $titleContent =
        $title === '' || $title === 'Untitled Project'
            ? 'LiveCodes'
            : encodeHTML($title) . ' - LiveCodes';
    $descriptionContent =
        $title === '' && $description === ''
            ? 'A Code Playground That Just Works!'
            : encodeHTML($description !== '' ? $description : 'A project on LiveCodes.');

    $originHtml = encodeHTML($origin);
    $modifiedBody = str_replace(
        'href="oembed?url=https%3A%2F%2Flivecodes.io&format=json"',
        'href="' . $originHtml . '/oembed?url=' . $oembedUrl . '&format=json"',
        $originalBody,
    );
    $modifiedBody = preg_replace_callback(
        '/title" content="LiveCodes"/',
        fn() => 'title" content="' . $titleContent . '"',
        $modifiedBody,
    );
    $modifiedBody = preg_replace_callback(
        '/content="A Code Playground That Just Works!"/',
        fn() => 'content="' . $descriptionContent . '"',
        $modifiedBody,
    );
    $modifiedBody = preg_replace_callback(
        '#content="https://livecodes\.io/"#',
        fn() => 'content="' . encodeHTML($currentUrl) . '"',
        $modifiedBody,
    );
    $modifiedBody = preg_replace_callback(
        '#content="https://livecodes\.io/livecodes#',
        fn() => 'content="' . $originHtml . '/livecodes',
        $modifiedBody,
    );

    header(
        'Link: <' .
            $origin .
            '/oembed?url=' .
            $oembedUrl .
            '&format=json>; rel="alternate"; type="application/json+oembed"; title="LiveCodes"',
        false,
    );
    header('Content-Type: text/html; charset=utf-8');
    echo $modifiedBody;

    $data['ok'] = true;
    $data['content-type'] = 'text/html; charset=utf-8';
    $data['status'] = 200;
    $data['statusText'] = 'OK';
} catch (Throwable $e) {
    header('Content-Type: text/html; charset=utf-8');
    echo $originalBody;

    $data['ok'] = false;
    $data['error'] = $e->getMessage();
}

// server-side analytics (only when LOG_URL is configured)
logToAPI($data);

function logToAPI(array $data): void
{
    $logUrl = getConfig('LOG_URL');
    if ($logUrl === '' || !filter_var($logUrl, FILTER_VALIDATE_URL)) {
        return;
    }
    // let the response reach the client first, where supported
    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    }
    try {
        fetchUrl(
            $logUrl,
            'POST',
            json_encode(['type' => 'analytics', 'data' => $data]),
            [
                'API-Token' => getConfig('API_TOKEN'),
                'Content-Type' => 'application/json',
            ],
            2,
        );
    } catch (Throwable $e) {
        // logging failures are ignored
    }
}
