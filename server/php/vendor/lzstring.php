<?php

/**
 * Decompression-only implementation of the lz-string algorithm,
 * compatible with the JavaScript library lz-string by pieroxy
 * (https://github.com/pieroxy/lz-string), which is MIT/WTFPL licensed.
 *
 * Only `decompressFromEncodedURIComponent` and `decompressFromBase64`
 * are implemented (that is all LiveCodes server functions need).
 *
 * Compressed data encodes UTF-16 code units, so output is assembled as
 * a UTF-16BE byte string and converted to UTF-8 at the end. This keeps
 * non-ASCII content (including surrogate pairs) intact.
 */

function lzDecompressFromEncodedURIComponent(?string $input): ?string
{
    if ($input === null) {
        return '';
    }
    if ($input === '') {
        return null;
    }
    $input = str_replace(' ', '+', $input);
    return lzDecompress($input, 32, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$');
}

function lzDecompressFromBase64(?string $input): ?string
{
    if ($input === null) {
        return '';
    }
    if ($input === '') {
        return null;
    }
    return lzDecompress($input, 32, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
}

function lzDecompress(string $input, int $resetValue, string $alphabet): ?string
{
    $length = strlen($input);

    $baseReverse = [];
    for ($i = 0; $i < strlen($alphabet); $i++) {
        $baseReverse[$alphabet[$i]] = $i;
    }
    $getNextValue = function (int $index) use ($input, $baseReverse): int {
        return $baseReverse[$input[$index] ?? ''] ?? 0;
    };

    // a UTF-16 code unit as a 2-byte (big endian) string
    $chr16 = fn(int $code): string => chr(($code >> 8) & 0xFF) . chr($code & 0xFF);

    $dictionary = [0, 1, 2];
    $dictSize = 4;
    $numBits = 3;
    $enlargeIn = 4;
    $result = '';
    $dataVal = $getNextValue(0);
    $dataPosition = $resetValue;
    $dataIndex = 1;

    $readBits = function (int $exponent) use (
        &$dataVal,
        &$dataPosition,
        &$dataIndex,
        $resetValue,
        $getNextValue
    ): int {
        $bits = 0;
        $maxPower = 1 << $exponent;
        $power = 1;
        while ($power !== $maxPower) {
            $resb = $dataVal & $dataPosition;
            $dataPosition >>= 1;
            if ($dataPosition === 0) {
                $dataPosition = $resetValue;
                $dataVal = $getNextValue($dataIndex);
                $dataIndex++;
            }
            $bits |= ($resb > 0 ? 1 : 0) * $power;
            $power <<= 1;
        }
        return $bits;
    };

    $next = $readBits(2);
    if ($next === 0) {
        $c = $chr16($readBits(8));
    } elseif ($next === 1) {
        $c = $chr16($readBits(16));
    } else {
        return '';
    }

    $dictionary[3] = $c;
    $w = $c;
    $result .= $c;

    while (true) {
        if ($dataIndex > $length) {
            return '';
        }

        $c = $readBits($numBits);
        switch ($c) {
            case 0:
                $dictionary[$dictSize] = $chr16($readBits(8));
                $dictSize++;
                $c = $dictSize - 1;
                $enlargeIn--;
                break;
            case 1:
                $dictionary[$dictSize] = $chr16($readBits(16));
                $dictSize++;
                $c = $dictSize - 1;
                $enlargeIn--;
                break;
            case 2:
                return mb_convert_encoding($result, 'UTF-8', 'UTF-16BE');
        }

        if ($enlargeIn === 0) {
            $enlargeIn = 1 << $numBits;
            $numBits++;
        }

        if (array_key_exists($c, $dictionary)) {
            $entry = $dictionary[$c];
        } elseif ($c === $dictSize) {
            $entry = $w . substr($w, 0, 2);
        } else {
            return null;
        }

        $result .= $entry;
        $dictionary[$dictSize] = $w . substr($entry, 0, 2);
        $dictSize++;
        $enlargeIn--;
        $w = $entry;

        if ($enlargeIn === 0) {
            $enlargeIn = 1 << $numBits;
            $numBits++;
        }
    }
}
