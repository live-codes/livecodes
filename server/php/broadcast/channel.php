<?php

/**
 * Port of server/src/broadcast/index.ts GET /channels/:id.
 * Serves the broadcast viewer pages.
 */

require_once __DIR__ . '/../inc/utils.php';

if (getConfig('SELF_HOSTED_BROADCAST') !== 'true') {
    http_response_code(400);
    echo 'Broadcast service is disabled!';
    exit;
}

$channel = isset($_GET['id']) && is_string($_GET['id']) ? $_GET['id'] : '';

$stmt = getDb()->prepare('SELECT `data` FROM `broadcast_channels` WHERE `channel` = ?');
$stmt->execute([$channel]);
$row = $stmt->fetch();

if (!is_array($row)) {
    http_response_code(404);
    header('Content-Type: text/plain');
    echo 'Channel not found!';
    exit;
}

getDb()
    ->prepare('UPDATE `broadcast_channels` SET `last_accessed` = ? WHERE `channel` = ?')
    ->execute([(int) round(microtime(true) * 1000), $channel]);

$data = json_decode((string) ($row['data'] ?? ''), true);
$hasData = is_array($data) && count($data) > 0;

$views = ['index', 'code', 'result'];
$view = isset($_GET['view']) && is_string($_GET['view']) ? $_GET['view'] : '';
$file = in_array($view, $views, true) ? $view : ($hasData ? 'index' : 'result');

$fileContent = file_get_contents(__DIR__ . '/assets/' . $file . '.html');
if ($fileContent === false) {
    http_response_code(404);
    echo 'Not Found!';
    exit;
}

header('Content-Type: text/html; charset=utf-8');
echo str_replace('{{AppUrl}}', getRequestOrigin(), $fileContent);
