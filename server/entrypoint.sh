#! /bin/sh

export BACKEND_HOST_NAME=${BACKEND_HOST_NAME:-${HOST_NAME}}

if [ ${BACKEND_HOST_NAME} != ${HOST_NAME} ]; then
  export BACKEND_PORT=${BACKEND_PORT:-443}
  export PARSE_PUBLIC_SERVER_URL=https://${BACKEND_HOST_NAME}${PARSE_SERVER_MOUNT_PATH}
else
  export BACKEND_PORT=${BACKEND_PORT:-1337}
  export PARSE_PUBLIC_SERVER_URL=https://${BACKEND_HOST_NAME}:${BACKEND_PORT}${PARSE_SERVER_MOUNT_PATH}
fi
export PARSE_SERVER_URL=http://backend:${BACKEND_PORT}${PARSE_SERVER_MOUNT_PATH}

# if IP address
if expr "${HOST_NAME}" : '[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*$' >/dev/null; then
  export DEFAULT_SNI="default_sni ${HOST_NAME}"
fi

$@
