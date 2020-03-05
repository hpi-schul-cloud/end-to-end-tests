#! /bin/bash

export BRANCH_NAME=${GITHUB_REF##*/}

_switchBranch(){
  cd $1
  echo "switching branch..."
  git checkout $2 > /dev/null 2>&1 || true
  echo "(new) active branch for $1:"
  git branch | grep \* | cut -d ' ' -f2
  cd ..
}

switchBranch(){
  if [[ $BRANCH_NAME = release* || $BRANCH_NAME = hotfix* ]]
  then
    _switchBranch "$1" "master"
  fi
  _switchBranch "$1" "$BRANCH_NAME"
}

fetch(){
  # clone all required repositories and try to switch to branch with same name as current one
  git clone https://github.com/schul-cloud/nuxt-client.git nuxt-client
  switchBranch "nuxt-client"

  git clone https://github.com/schul-cloud/schulcloud-client.git schulcloud-client
  switchBranch "schulcloud-client"

  git clone https://github.com/schul-cloud/schulcloud-server.git schulcloud-server
  switchBranch "schulcloud-server"

  git clone https://github.com/schul-cloud/docker-compose.git docker-compose
  switchBranch "docker-compose"

  git clone https://github.com/schul-cloud/integration-tests.git integration-tests
  switchBranch "integration-tests"

  git clone https://github.com/schul-cloud/node-notification-service.git node-notification-service
  switchBranch "node-notification-service"
}

install(){
  cd docker-compose
  docker-compose -f docker-compose.integration-test.yml build --parallel
  docker-compose -f docker-compose.integration-test.yml up -d
  cd ..

  cd integration-tests && npm ci && cd ..
}

before(){
  cd schulcloud-server && npm run setup && npm run seed && cd ..

  # wait for the nuxt client to be available
  echo "waiting max 150s for nuxt to be available"
  npx -p wait-on wait-on http://localhost:4000 -t 150000
  echo "nuxt is now online"
}

main(){
  cd integration-tests
  npm run test
  cd ..
}

set -e
echo "FETCH..."
fetch
echo "FETCH DONE"

echo "INSTALL..."
install
echo "INSTALL DONE"

echo "BEFORE..."
before
echo "BEFORE DONE"

echo "MAIN..."
main
echo "MAIN DONE"
set +e