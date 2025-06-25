#! /bin/sh

# if IP address
if expr "${HOST_NAME}" : '[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*$' >/dev/null; then
  export DEFAULT_SNI="default_sni ${HOST_NAME}"
fi

$@
