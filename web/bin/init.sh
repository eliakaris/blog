#!/bin/bash
service ssh start

echo "running the build"
node ./node_modules/serve/bin/serve.js -s /usr/src/app/build