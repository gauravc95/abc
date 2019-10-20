#!/bin/bash
cd "$(dirname "${0}")"

if [ -e /.dockerenv ]; then
    curl -L -o /tmp/node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz https://static.pps.evernym.com/diffusion2019/node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz
    tar xzf /tmp/node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz
    npm install ./package
    npm install
else
    docker-compose run --rm --entrypoint /app/build.sh libvcx
fi
