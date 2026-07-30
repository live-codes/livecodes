<?php

/**
 * Port of server/src/share.ts (Node/Valkey share service) backed by MySQL.
 *
 * GET  /api/share?id=<id>  → project config JSON
 * POST /api/share          → stores config, returns plain-text id
 */

require_once __DIR__ . '/../inc/utils.php';

sendCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $id = isset($_GET['id']) && is_string($_GET['id']) ? $_GET['id'] : '';
    if ($id === '') {
        http_response_code(400);
        echo 'Bad Request!';
        exit;
    }

    $stmt = getDb()->prepare('SELECT `config` FROM `share` WHERE LOWER(`id`) = LOWER(?)');
    $stmt->execute([$id]);
    $value = $stmt->fetchColumn();
    if (!is_string($value) || $value === '') {
        http_response_code(404);
        echo 'Not Found!';
        exit;
    }

    header('Content-Type: application/json');
    echo $value;
    exit;
}

if ($method !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed!';
    exit;
}

$rawBody = file_get_contents('php://input');
$maxBodyBytes = 2 * 1024 * 1024; // adjust as appropriate
if ($rawBody !== false && strlen($rawBody) > $maxBodyBytes) {
    http_response_code(413);
    echo 'Payload Too Large!';
    exit;
}
$data = $rawBody !== false && $rawBody !== '' ? json_decode($rawBody) : null;
if ($data === null) {
    http_response_code(400);
    echo 'Bad Request!';
    exit;
}
$value = json_encode($data);

// note: dpaste id length: 9, API id length: 11, self-hosted id length: 14
$idLength = 14;
$pdo = getDb();
$existsStmt = $pdo->prepare('SELECT 1 FROM `share` WHERE `id` = ?');
// avoid collision
do {
    $id = generateId($idLength);
    $existsStmt->execute([$id]);
} while ($existsStmt->fetchColumn());

$insertStmt = $pdo->prepare('INSERT INTO `share` (`id`, `config`) VALUES (?, ?)');
$insertStmt->execute([$id, $value]);

header('Content-Type: text/plain');
echo $id;
