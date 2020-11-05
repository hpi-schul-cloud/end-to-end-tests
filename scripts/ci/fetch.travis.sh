#!/usr/bin/env bash

set -e

export BRANCH_NAME=${TRAVIS_PULL_REQUEST_BRANCH:=$TRAVIS_BRANCH}

echo "BRANCH: $BRANCH_NAME"

./fetch.sh

chmod 700 end-to-end-tests.travis.sh
bash end-to-end-tests.travis.sh
set +e
