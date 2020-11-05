#!/usr/bin/env bash

set -e

# set envs
export IT_CLIENT_HOST=nuxtclient
export IT_CLIENT_PORT=4000

echo "BRANCH: $BRANCH_NAME"

# fetch default (develop) script
echo "try fetching script from default branch"
curl -fO "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/develop/scripts/ci/end-to-end-tests.sh" || true

# use master as default for releases & hotfixes
if [[ $BRANCH_NAME = release* || $BRANCH_NAME = hotfix* ]];
then
	echo "try fetching script from master branch"
	curl -fO "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/master/scripts/ci/end-to-end-tests.sh" || true
fi
# use branch specific script if available
echo "try fetching script from $BRANCH_NAME branch"
curl -fO "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/$BRANCH_NAME/scripts/ci/end-to-end-tests.sh" || true

ls -a
chmod 700 end-to-end-tests.sh
bash end-to-end-tests.sh
set +e
