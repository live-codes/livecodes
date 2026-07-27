<?php

/**
 * Port of server/src/broadcast/index.ts POST API, backed by MySQL.
 *
 * The app posts broadcasts over plain HTTP (same wire format as the Node
 * broadcast server). Viewer pages poll broadcast/state.php for updates
 * (WebSockets are not available on shared PHP hosting).
 *
 * POST /  (routed here by .htaccess for POST requests to the origin root)
 */

require_once __DIR__ . '/../inc/utils.php';

sendCorsHeaders();
header('Content-Type: application/json');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed!']);
    exit;
}

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) {
    $body = $_POST;
}

// user token auth
$userTokens = getConfig('BROADCAST_TOKENS');
if (trim($userTokens) !== '') {
    $userToken = $body['userToken'] ?? $_GET['userToken'] ?? $_GET['token'] ?? '';
    $validTokens = array_map('trim', explode(',', $userTokens));
    if (!is_string($userToken) || !in_array($userToken, $validTokens, true)) {
        http_response_code(401);
        echo json_encode(['error' => 'Permission denied! Invalid user token.']);
        exit;
    }
}

$pdo = getDb();

// evict channels idle for more than 20 minutes
$timeout = 1000 * 60 * 20;
$pdo->prepare('DELETE FROM `broadcast_channels` WHERE `last_accessed` < ?')->execute([
    (int) round(microtime(true) * 1000) - $timeout,
]);

$newChannel = empty($body['channel']);
$channel = $newChannel ? generateId() : (string) $body['channel'];
$result = isset($body['result']) && is_string($body['result']) ? $body['result'] : '';
$data = $body['data'] ?? null;
$stopBroadcast = !empty($body['stop']);

$existing = null;
if (!$newChannel) {
    $stmt = $pdo->prepare('SELECT * FROM `broadcast_channels` WHERE `channel` = ?');
    $stmt->execute([$channel]);
    $existing = $stmt->fetch();
    if (!is_array($existing)) {
        http_response_code(404);
        echo json_encode(['error' => 'Channel not found!']);
        exit;
    }
    if (($body['channelToken'] ?? '') !== $existing['channel_token']) {
        http_response_code(401);
        echo json_encode(['error' => 'Permission denied! Invalid channel token.']);
        exit;
    }
    if ($stopBroadcast) {
        $pdo->prepare('DELETE FROM `broadcast_channels` WHERE `channel` = ?')->execute([$channel]);
        echo json_encode(['message' => 'Broadcast stopped!']);
        exit;
    }
}

$channelToken = $newChannel ? generateId() : $existing['channel_token'];

$reducedData = is_array($data) ? $data : [];
foreach (['markup', 'style', 'script'] as $editor) {
    if (isset($reducedData[$editor]) && is_array($reducedData[$editor])) {
        $reducedData[$editor]['compiled'] = '';
    }
}

$storedResult = strlen($result) < 300000 ? $result : '';
$dataJson = json_encode($reducedData);
if ($dataJson === '[]') {
    $dataJson = '{}';
}
$storedData = strlen($dataJson) < 500000 ? $dataJson : '{}';

$stmt = $pdo->prepare(
    'INSERT INTO `broadcast_channels` (`channel`, `channel_token`, `result`, `data`, `last_accessed`) ' .
        'VALUES (?, ?, ?, ?, ?) ' .
        'ON DUPLICATE KEY UPDATE `result` = VALUES(`result`), `data` = VALUES(`data`), ' .
        '`last_accessed` = VALUES(`last_accessed`)',
);
$stmt->execute([
    $channel,
    $channelToken,
    $storedResult,
    $storedData,
    (int) round(microtime(true) * 1000),
]);

$channelUrl = getRequestOrigin() . '/channels/' . $channel;

echo json_encode(
    array_merge(
        [
            'channel' => $channel,
            'channelUrl' => $channelUrl,
        ],
        $newChannel ? ['channelToken' => $channelToken] : [],
    ),
);
