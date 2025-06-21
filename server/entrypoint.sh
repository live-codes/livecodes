#! /bin/sh

# if IP address
if expr "${HOST_NAME}" : '[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*$' >/dev/null; then
  export DEFAULT_SNI="default_sni ${HOST_NAME}"
fi

$@

# this file line endings has to be unix (LF)
#https://stackoverflow.com/questions/26671815/not-foundsh-2-error-comes-while-exectutin-a-shell-command
