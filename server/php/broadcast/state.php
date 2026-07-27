<?php

/**
 * Channel state endpoint polled by the broadcast viewer pages
 * (replaces the socket.io `receive` events of the Node broadcast server).
 *
 * GET /broadcast/state.php?channel=<id>  → {result, data}
 */

require_once __DIR__ . '/../inc/utils.php';

sendCorsHeaders();
header('Content-Type: application/json');

$channel = isset($_GET['channel']) && is_string($_GET['channel']) ? $_GET['channel'] : '';

$stmt = getDb()->prepare(
    'SELECT `result`, `data` FROM `broadcast_channels` WHERE `channel` = ?',
);
$stmt->execute([$channel]);
$row = $stmt->fetch();

if (!is_array($row)) {
    http_response_code(404);
    echo json_encode(['error' => 'Channel not found!']);
    exit;
}

getDb()
    ->prepare('UPDATE `broadcast_channels` SET `last_accessed` = ? WHERE `channel` = ?')
    ->execute([(int) round(microtime(true) * 1000), $channel]);

$data = json_decode((string) ($row['data'] ?? ''));
echo json_encode([
    'result' => (string) ($row['result'] ?? ''),
    'data' => $data instanceof stdClass || is_array($data) ? $data : new stdClass(),
]);
