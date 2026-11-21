<?php

/**
 * Port of server/src/cors.ts (CORS proxy for importing external content).
 *
 * GET|POST /api/cors?url=<url>  → proxied resource
 */

require_once __DIR__ . '/../inc/utils.php';

sendCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// same-origin GET/HEAD requests do not send an Origin header, so an absent
// Origin must not be rejected (it is not an authorization boundary either way)
if (($origin !== '' && !allowedOrigin($origin)) || ($method !== 'GET' && $method !== 'POST')) {
    http_response_code(403);
    echo 'Forbidden!';
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$rawBody = $method === 'POST' ? (string) file_get_contents('php://input') : '';

$url = isset($_GET['url']) && is_string($_GET['url']) ? $_GET['url'] : '';
if ($url === '' && $rawBody !== '') {
    if (str_contains($contentType, 'application/json')) {
        $bodyJson = json_decode($rawBody, true);
        $url = is_array($bodyJson) && isset($bodyJson['url']) ? (string) $bodyJson['url'] : '';
    } elseif (str_contains($contentType, 'application/x-www-form-urlencoded')) {
        parse_str($rawBody, $bodyParams);
        $url = isset($bodyParams['url']) ? (string) $bodyParams['url'] : '';
    }
}
if ($url === '') {
    http_response_code(400);
    echo 'Bad Request!';
    exit;
}

$headers = [];
if ($method === 'POST' && $contentType !== '') {
    $headers['Content-Type'] = $contentType;
}
$response = fetchUrl($url, $method, $method === 'POST' ? $rawBody : null, $headers, 30);

if (!$response['ok']) {
    $status = $response['status'] >= 400 && $response['status'] < 600 ? $response['status'] : 502;
    http_response_code($status);
    // proxied content is untrusted: never render it as active content on this origin
    header('Content-Type: text/plain; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header("Content-Security-Policy: sandbox; default-src 'none'");
    header('Content-Disposition: attachment');
    echo 'Upstream request failed.';
    exit;
}

$responseContentType = $response['headers']['content-type'] ?? '';
if ($responseContentType !== '') {
    header('Content-Type: ' . $responseContentType);
}
// proxied content is untrusted: never render it as active content on this origin
header('X-Content-Type-Options: nosniff');
header("Content-Security-Policy: sandbox; default-src 'none'");
header('Content-Disposition: attachment');
echo $response['body'];
