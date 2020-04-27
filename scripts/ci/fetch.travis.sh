#!/usr/bin/env bash

set -e

export BRANCH_NAME=${TRAVIS_PULL_REQUEST_BRANCH:=$TRAVIS_BRANCH}

echo "BRANCH: $BRANCH_NAME"

# fetch default (develop) script
echo "try fetching script from default branch"
curl -fO "https://raw.githubusercontent.com/schul-cloud/integration-tests/develop/scripts/ci/integration-test.travis.sh" || true

# use master as default for releases & hotfixes
if [[ $BRANCH_NAME = release* || $BRANCH_NAME = hotfix* ]];
then
	echo "try fetching script from master branch"
	curl -fO "https://raw.githubusercontent.com/schul-cloud/integration-tests/master/scripts/ci/integration-test.travis.sh" || true
fi
# use branch specific script if available
echo "try fetching script from $BRANCH_NAME branch"
curl -fO "https://raw.githubusercontent.com/schul-cloud/integration-tests/$BRANCH_NAME/scripts/ci/integration-test.travis.sh" || true

ls -a
chmod 700 integration-test.travis.sh
bash integration-test.travis.sh
set +e
