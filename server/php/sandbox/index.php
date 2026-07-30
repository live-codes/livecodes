<?php

/**
 * Port of server/src/sandbox.ts.
 * Serves the separate-origin sandbox static content from the highest-numbered
 * version directory (v*) found in this directory.
 */

$sandboxDir = __DIR__;

$version = '';
foreach (scandir($sandboxDir) ?: [] as $entry) {
    if (preg_match('/^v(\d+)$/', $entry, $matches) && is_dir($sandboxDir . '/' . $entry)) {
        if ($version === '' || (int) $matches[1] > (int) substr($version, 1)) {
            $version = $entry;
        }
    }
}
$versionDir = $sandboxDir . '/' . $version;

header('Content-Type: text/html; charset=utf-8');

$sendVersionIndex = function (int $status) use ($versionDir): void {
    http_response_code($status);
    readfile($versionDir . '/index.html');
};

$reqPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$reqPath = is_string($reqPath) ? $reqPath : '/';

if ($reqPath === '/') {
    $sendVersionIndex(200);
    exit;
}

if (str_ends_with($reqPath, '/')) {
    $reqPath .= 'index.html';
} elseif (!str_contains(basename($reqPath), '.')) {
    $reqPath .= '.html';
}
$reqPath = ltrim($reqPath, '/');

$filePath = realpath($sandboxDir . '/' . $reqPath);
// guard against path traversal and missing files
if ($filePath === false || !str_starts_with($filePath, $sandboxDir . DIRECTORY_SEPARATOR) || !is_file($filePath)) {
    $sendVersionIndex(404);
    exit;
}

http_response_code(200);
readfile($filePath);
