#!/bin/bash
cd "$(dirname "${0}")"

# if [ $# -gt 1 ]; then
#     _UIDGUID=$(stat -c %u:%g .) docker-compose "${@}"
# else
#     _UIDGUID=$(stat -c %u:%g .) docker-compose up
# fi
docker-compose up
