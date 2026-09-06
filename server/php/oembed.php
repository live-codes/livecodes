<?php

/**
 * Port of functions/oembed.ts (Cloudflare Pages function).
 * oEmbed provider endpoint. See https://oembed.com
 */

require_once __DIR__ . '/inc/utils.php';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;
const THUMB_WIDTH = 1200;
const THUMB_HEIGHT = 630;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'GET' && $method !== 'HEAD') {
    http_response_code(405);
    header('Allow: GET, HEAD');
    echo 'Method Not Allowed!';
    exit;
}

$format = $_GET['format'] ?? null;
if ($format !== null && $format !== 'json') {
    http_response_code(501);
    echo 'Not Implemented!';
    exit;
}

$urlParam = isset($_GET['url']) && is_string($_GET['url']) ? $_GET['url'] : '';
$parts = $urlParam !== '' ? parse_url($urlParam) : false;
if (!is_array($parts) || !isset($parts['scheme'], $parts['host'])) {
    http_response_code(400);
    echo 'Bad Request!';
    exit;
}

$scheme = strtolower((string) $parts['scheme']);
$path = isset($parts['path']) && $parts['path'] !== '' ? $parts['path'] : '/';
$origin = $scheme . '://' . $parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : '');

if (
    ($scheme !== 'http' && $scheme !== 'https') ||
    !allowedOrigin($origin) ||
    ($path !== '/' && $path !== '/index.html')
) {
    http_response_code(404);
    echo 'Not Found!';
    exit;
}

// normalized URL (equivalent of new URL(urlParam).href)
$href = $origin . $path;
if (isset($parts['query'])) {
    $href .= '?' . $parts['query'];
}
if (isset($parts['fragment'])) {
    $href .= '#' . $parts['fragment'];
}

$getSize = function (string $name): int {
    $value = isset($_GET[$name]) && is_numeric($_GET[$name]) ? (float) $_GET[$name] : 0;
    return is_finite($value) && $value > 0 ? (int) floor($value) : 0;
};
$maxWidth = $getSize('maxwidth');
$maxHeight = $getSize('maxheight');

$info = getProjectInfo($href);
$title = $info['title'];
$fullTitle =
    $title === '' || $title === 'Untitled Project'
        ? 'LiveCodes'
        : mb_substr($title, 0, 160) . ' - LiveCodes';

$width = $maxWidth !== 0 && $maxWidth < DEFAULT_WIDTH ? $maxWidth : DEFAULT_WIDTH;
$height = $maxHeight !== 0 && $maxHeight < DEFAULT_HEIGHT ? $maxHeight : DEFAULT_HEIGHT;
$thumbnailWidth = $maxWidth !== 0 && $maxWidth < THUMB_WIDTH ? $maxWidth : THUMB_WIDTH;
$propHeight = (int) round($thumbnailWidth * (THUMB_HEIGHT / THUMB_WIDTH));
$thumbnailHeight = $maxHeight !== 0 && $maxHeight < $propHeight ? $maxHeight : $propHeight;

$iframeHtml =
    '<iframe' .
    "\n        " .
    'src="' .
    encodeHTML($href) .
    '"' .
    "\n        " .
    'title="' .
    encodeHTML($fullTitle) .
    '"' .
    "\n        " .
    'loading="lazy"' .
    "\n        " .
    'scrolling="no"' .
    "\n        " .
    'allowfullscreen' .
    "\n        " .
    'height="' .
    $height .
    '"' .
    "\n        " .
    'style="border: 1px solid black; border-radius: 6px; width: 100%;' .
    ($maxWidth !== 0 ? ' max-width: ' . $maxWidth . 'px;' : '') .
    '"' .
    "\n      " .
    '></iframe>';

$body = [
    'type' => 'rich',
    'version' => '1.0',
    'provider_name' => 'LiveCodes',
    'provider_url' => 'https://livecodes.io',
    'title' => $fullTitle,
    'width' => $width,
    'height' => $height,
    'thumbnail_url' => $origin . '/livecodes/assets/images/oembed.png',
    'thumbnail_width' => $thumbnailWidth,
    'thumbnail_height' => $thumbnailHeight,
    'cache_age' => 3600,
    'html' => $iframeHtml,
];

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=3600');
echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
