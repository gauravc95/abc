#!/bin/bash
cd "$(dirname "${0}")"

docker-compose run --rm --service-ports --entrypoint /bin/bash libvcx
