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
# sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv B00A0BD1E2C63C11
#wget -qO - https://pgp.mongodb.com/server-6.0.asc | sudo apt-key add -
sudo apt-get -y install gnupg curl apt-transport-https ca-certificates curl git
sudo apt-get update
# install mongodb
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-database-tools

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

