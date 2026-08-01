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

if (!allowedOrigin($origin) || ($method !== 'GET' && $method !== 'POST')) {
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
    $status = $response['status'] > 0 ? $response['status'] : 502;
    http_response_code($status);
    echo $response['statusText'] !== '' ? $response['statusText'] : 'Bad Gateway!';
    exit;
}

$responseContentType = $response['headers']['content-type'] ?? '';
if ($responseContentType !== '') {
    header('Content-Type: ' . $responseContentType);
}
echo $response['body'];
