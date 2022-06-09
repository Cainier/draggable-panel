#!/usr/bin/env sh

# Stop when error
set -e

# Build lib
npm run build:lib

# Build example
npm run build:example

# CD example
cd example

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# Deploy example
git push -f git@github.com:Cainier/draggable-panel.git main:gh-pages

cd -
