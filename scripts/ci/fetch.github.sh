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
#         run: curl "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/main/scripts/ci/fetch.github.sh" | bash
#       - uses: actions/upload-artifact@v1
#         if: always()
#         with:
#           name: report
#           path: end-to-end-tests/reports
#
########################################

set -e

# install dependencies
sudo apt-get -y install gnupg apt-transport-https ca-certificates curl git
sudo apt-get update

if [[ -z "$BRANCH_NAME" ]]; then
    echo "Must provide BRANCH_NAME in environment"
    exit 1
fi
echo "BRANCH_NAME: $BRANCH_NAME"

# fetch default (main) script
echo "try fetching script from default branch"
curl -fO "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/main/scripts/ci/end-to-end-tests.github.sh" || true

# use branch specific script if available
echo "try fetching script from $BRANCH_NAME branch"
curl -fO "https://raw.githubusercontent.com/hpi-schul-cloud/end-to-end-tests/$BRANCH_NAME/scripts/ci/end-to-end-tests.github.sh" || true

ls -a
chmod 700 end-to-end-tests.github.sh
bash end-to-end-tests.github.sh $1
set +e

