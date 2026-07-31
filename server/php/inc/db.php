<?php

require_once __DIR__ . '/config.php';

/**
 * Returns a shared PDO connection, creating the database (best effort)
 * and the required tables when they do not exist.
 */
function getDb(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    if (getConfig('SELF_HOSTED_SHARE') !== 'true' && getConfig('SELF_HOSTED_BROADCAST') !== 'true') {
        throw new RuntimeException('Self-hosted services are disabled!');
    }

    $host = getConfig('MYSQL_HOST', 'localhost');
    $port = getConfig('MYSQL_PORT', '3306');
    $user = getConfig('MYSQL_USER');
    $password = getConfig('MYSQL_PASSWORD');
    $dbName = str_replace('`', '', getConfig('MYSQL_DATABASE'));

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 5,
    ];

    try {
        $pdo = new PDO("mysql:host=$host;port=$port;charset=utf8mb4", $user, $password, $options);
    } catch (PDOException $e) {
        throw new RuntimeException('Database connection failed.');
    }

    if ($dbName !== '') {
        try {
            $pdo->exec(
                "CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
            );
        } catch (Throwable $e) {
            // the database user may not have the CREATE privilege
            // (e.g. when the database was pre-created by the hosting provider)
        }
        $pdo->exec("USE `$dbName`");
    }

    if (getConfig('SELF_HOSTED_SHARE') === 'true') {
      $pdo->exec(
          'CREATE TABLE IF NOT EXISTS `share` (' .
              '`id` CHAR(14) NOT NULL PRIMARY KEY, ' .
              '`config` MEDIUMTEXT NOT NULL, ' .
              '`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP' .
              ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4',
      );
  }

    if (getConfig('SELF_HOSTED_BROADCAST') === 'true') {
      $pdo->exec(
          'CREATE TABLE IF NOT EXISTS `broadcast_channels` (' .
              '`channel` VARCHAR(11) NOT NULL PRIMARY KEY, ' .
              '`channel_token` VARCHAR(11) NOT NULL, ' .
              '`result` MEDIUMTEXT NULL, ' .
              '`data` MEDIUMTEXT NULL, ' .
              '`last_accessed` BIGINT NOT NULL' .
              ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4',
      );
    }

    return $pdo;
}
