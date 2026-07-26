<?php

/**
 * Configuration loader.
 *
 * Values are read from environment variables first, then from `config.php`
 * in the build root (one level up from this directory). The `config.php`
 * file is generated at deploy time by the GitHub workflow from repository
 * secrets and is never committed. See `config.sample.php`.
 */

function getConfig(?string $key = null, string $default = '')
{
    static $config = null;
    if ($config === null) {
        $config = [];
        $configFile = dirname(__DIR__) . '/config.php';
        if (is_file($configFile)) {
            $fileConfig = require $configFile;
            if (is_array($fileConfig)) {
                $config = $fileConfig;
            }
        }
        $names = [
            'MYSQL_HOST',
            'MYSQL_PORT',
            'MYSQL_USER',
            'MYSQL_PASSWORD',
            'MYSQL_DATABASE',
            'HOST_NAME',
            'LOG_URL',
            'API_TOKEN',
            'BROADCAST_TOKENS',
            'SELF_HOSTED_SHARE',
            'SELF_HOSTED_BROADCAST',
        ];
        foreach ($names as $name) {
            $value = getenv($name);
            if ($value !== false && $value !== '') {
                $config[$name] = $value;
            }
        }
    }
    if ($key === null) {
        return $config;
    }
    return isset($config[$key]) && $config[$key] !== '' ? $config[$key] : $default;
}
