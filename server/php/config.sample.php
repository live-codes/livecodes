<?php

/**
 * Sample server configuration.
 *
 * At deploy time, the GitHub workflow generates `config.php` (in the build root)
 * from two sources:
 *
 *   PHP_ENV (repository variable, .env format):
 *     Non-sensitive values — hostnames, feature flags, Firebase config, log URL.
 *     See the deploy workflow for the supported keys.
 *
 *   GitHub Secrets:
 *     Sensitive values only — MySQL credentials, API_TOKEN, BROADCAST_TOKENS.
 *
 * You can also create `config.php` manually, or set the same keys as real
 * environment variables (environment variables take precedence).
 */

return [
    // MySQL connection (required)
    'MYSQL_HOST' => 'localhost',
    'MYSQL_PORT' => '3306',
    'MYSQL_USER' => '',
    'MYSQL_PASSWORD' => '',
    // created automatically if it does not exist (and the user has the privilege)
    'MYSQL_DATABASE' => 'livecodes',

    // hostname of the app (used by the CORS proxy and oEmbed origin checks)
    'HOST_NAME' => 'example.com',

    // optional: server-side analytics endpoint + token (disabled when empty)
    'LOG_URL' => '',
    'API_TOKEN' => '',

    // optional: comma-separated user tokens for the broadcast server (empty = no auth)
    'BROADCAST_TOKENS' => '',
];
