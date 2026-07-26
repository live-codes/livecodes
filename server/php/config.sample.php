<?php

/**
 * Sample server configuration.
 *
 * The GitHub deploy workflow generates `config.php` (in the build root)
 * from repository secrets/variables with this shape. You can also create
 * it manually, or set the same names as real environment variables
 * (environment variables take precedence).
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
