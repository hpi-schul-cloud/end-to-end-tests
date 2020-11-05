#! /bin/bash

export BRANCH_NAME=${TRAVIS_PULL_REQUEST_BRANCH:=$TRAVIS_BRANCH}

_switchBranch(){
	cd $1
	echo "switching branch..."
	git checkout $2 > /dev/null 2>&1 || true
	echo "(new) active branch for $1:"
	git branch | grep \* | cut -d ' ' -f2
	if [[ -n "${3}" ]]
	then
		export $3=`git rev-parse HEAD`
		printenv | grep $3
	fi
	cd ..
}

switchBranch(){
	if [[ $BRANCH_NAME = release* || $BRANCH_NAME = hotfix* ]]
	then
		_switchBranch "$1" "master" $3
	fi
	_switchBranch "$1" "$BRANCH_NAME" $3
}

fetch(){
	# clone all required repositories and try to switch to branch with same name as current one
	git clone https://github.com/hpi-schul-cloud/nuxt-client.git nuxt-client
	switchBranch "nuxt-client" "NUXT_DOCKER_TAG"

	git clone https://github.com/hpi-schul-cloud/schulcloud-client.git schulcloud-client
	switchBranch "schulcloud-client" "CLIENT_DOCKER_TAG"

	git clone https://github.com/hpi-schul-cloud/schulcloud-server.git schulcloud-server
	switchBranch "schulcloud-server" "SERVER_DOCKER_TAG"

	git clone https://github.com/hpi-schul-cloud/docker-compose.git docker-compose
	switchBranch "docker-compose"

	git clone https://github.com/hpi-schul-cloud/end-to-end-tests.git end-to-end-tests
	switchBranch "end-to-end-tests"

	git clone https://github.com/hpi-schul-cloud/node-notification-service.git node-notification-service
	switchBranch "node-notification-service" "NOTIFICATION_SERVICE_DOCKER_TAG"
}


install(){
	cd docker-compose

	# add -e on mac, use ; as alternative separator
	sed -i "s/ES_USER.*/ES_USER=${ES_USER}/" docker-compose.end-to-end-tests.yml
	sed -i "s/ES_PASSWORD.*/ES_PASSWORD=${ES_PASSWORD}/" docker-compose.end-to-end-tests.yml
	sed -i "s/SECRET_ES_MERLIN_USERNAME.*/SECRET_ES_MERLIN_USERNAME=${SECRET_ES_MERLIN_USERNAME}/" docker-compose.end-to-end-tests.yml
	sed -i "s/SECRET_ES_MERLIN_PW.*/SECRET_ES_MERLIN_PW=${SECRET_ES_MERLIN_PW}/" docker-compose.end-to-end-tests.yml

	docker-compose -f docker-compose.end-to-end-tests.yml build --parallel
	docker-compose -f docker-compose.end-to-end-tests.yml up -d
	cd ..

	cd schulcloud-server && npm ci && cd ..
	cd end-to-end-tests && npm ci && cd ..
}

before(){
	cd schulcloud-server && npm run setup && npm run seed && cd ..

	# wait for the nuxt client to be available
	echo "waiting max 150s for nuxt to be available"
	npx -p wait-on wait-on http://localhost:4000 -t 150000
	echo "nuxt is now online"
}

main(){
	cd end-to-end-tests
	npm run test
	cd ..
}

set -e
fetch
install
before
main
set +e
