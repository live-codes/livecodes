# LiveCodes PHP Server

PHP + MySQL implementation of the LiveCodes server functions, for self-hosting on shared hosting (Apache + PHP + MySQL), without installing anything on the server.

These files are copied to the `build/` directory after the app is built (`npm run copy-php`), and are deployed via FTP/SSH using the GitHub workflow `.github/workflows/deploy-php.yml`.

See the [documentation](https://livecodes.io/docs/advanced/php) for setup instructions.
