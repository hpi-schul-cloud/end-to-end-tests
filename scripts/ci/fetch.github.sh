#!/usr/bin/env bash

########################################
# USAGE:
#
# name: end-to-end-tests
# on: [push]
# jobs:
#   end-to-end-tests:
#     runs-on: ubuntu-latest
#     steps:
#       - name: execute tests
#         run: curl "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/develop/scripts/ci/fetch.github.sh" | bash
#       - uses: actions/upload-artifact@v1
#         if: always()
#         with:
#           name: report
#           path: end-to-end-tests/reports
#
########################################

set -e

# install dependencies
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 4B7C549A058F8B6B
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl git mongodb-org-tools

# set envs
export BRANCH_NAME=${GITHUB_REF#refs/heads/}

echo "BRANCH: $BRANCH_NAME"

# fetch default (develop) script
echo "try fetching script from default branch"
curl -fO "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/develop/scripts/ci/end-to-end-tests-core.github.sh" || true

# use master as default for releases & hotfixes
if [[ $BRANCH_NAME = release* || $BRANCH_NAME = hotfix* ]];
then
	echo "try fetching script from master branch"
	curl -fO "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/master/scripts/ci/end-to-end-tests.github.sh" || true
fi
# use branch specific script if available
echo "try fetching script from $BRANCH_NAME branch"
curl -fO "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/$BRANCH_NAME/scripts/ci/end-to-end-tests-core.github.sh" || true

ls -a
chmod 700 end-to-end-tests-core.github.sh
bash end-to-end-tests-core.github.sh
set +e
