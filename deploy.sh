#!/bin/bash

GH_PAGE_CNAME='door-stage.nexf.org'

echo 'Remove all stale files (./dist and /tmp/nex-door-web/) ...'
rm -rf ./dist/
rm -rf /tmp/nex-door-web/

echo 'Cloning and build the project ...'
git clone git@github.com:nexfoundation/nex-door-web.git /tmp/nex-door-web

docker run --rm -v $PWD:/app node:14.17.0-alpine3.13 sh -c "cd /app && npm install && npm run build"

cp -r $PWD/dist/* /tmp/nex-door-web
cd /tmp/nex-door-web

echo $GH_PAGE_CNAME > CNAME

echo 'Pushing to remote gh-page branch'
git checkout -b gh-page
git add -fA
git commit --allow-empty -m "Build - $(date -u)"
git push -f -q origin gh-page
