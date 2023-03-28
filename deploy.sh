#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://PaulVoron.github.io
# git push -f git@github.com:PaulVoron/PaulVoron.github.io.git main

# if you are deploying to https://PaulVoron.github.io/three-test-task
# git push -f git@github.com:PaulVoron/three-test-task.git main:gh-pages

cd -