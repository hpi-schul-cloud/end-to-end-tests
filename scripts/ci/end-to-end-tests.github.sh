#!/bin/bash

if [[ -z "$BRANCH_NAME" ]]; then
    echo "Must provide BRANCH_NAME in environment"
    exit 1
fi
echo "BRANCH_NAME: $BRANCH_NAME"

_switchBranch(){
	cd $1
	echo "switching branch..."
	git checkout $2 > /dev/null 2>&1 || true
	echo "(new) active branch for $1:"
	git branch | grep \* | cut -d ' ' -f2
	if [ -z "$3" ]
	then
		echo "No docker tag set for ${1}"
		echo $3
	else
		set -a
		export $3=`git rev-parse HEAD`
		printenv | grep $3
	fi
	cd ..
}

switchBranch(){
	_switchBranch "$1" "main" "$2"

	# if branch exists, try to switch to it
	_switchBranch "$1" "$BRANCH_NAME" "$2"
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
}

log_docker() {
	echo "CONTAINER STARTUP LOG"
	cd docker-compose
	docker-compose -f compose-files/docker-compose.yml logs -f &
	cd ..
}

install(){
	cd docker-compose

	# authenticate against docker
	chmod 700 ./scripts/dockerhub.login.sh
	./scripts/dockerhub.login.sh

	chmod 700 ./startup_end-to-end-tests.sh
	echo "PULL CONTAINERS..."
	./startup_end-to-end-tests.sh pull --ignore-pull-failures --include-deps # --quiet
	echo "PULL CONTAINERS DONE"

	set -a
	source ./envs/end-to-end-tests.env

	cd ..
}

before(){
	# fetch later to use time while container bootstrap
	git clone https://github.com/hpi-schul-cloud/end-to-end-tests.git end-to-end-tests
	switchBranch "end-to-end-tests"

	echo "IT_CLIENT ENVS..."
	echo "IT_CLIENT_HOST="$IT_CLIENT_HOST
	echo "IT_CLIENT_PORT="$IT_CLIENT_PORT
	echo "IT_CLIENT ENVS DONE"

	echo "CONTAINER STARTUP"
	cd docker-compose
	docker-compose -f compose-files/docker-compose.yml up -d mongodb mongodb-secondary mongodb-arbiter redis rabbit mailcatcher selenium-hub calendar-init
	sleep 10
	docker-compose -f compose-files/docker-compose.yml up -d chrome mongosetup maildrop calendar-postgres
	sleep 15
	docker-compose -f compose-files/docker-compose.yml up -d calendar
	sleep 15
	docker-compose -f compose-files/docker-compose.yml up server server-management client nuxtclient &
	cd ..

	echo "INSTALL DEPENDNECIES..."
	cd end-to-end-tests && npm ci && cd ..
	echo "INSTALL DEPENDNECIES DONE"

	echo "waiting max 4 minutes for server-management to be available"
	npx wait-on http://localhost:3333/api/docs -t 240000 --httpTimeout 250 --log
	echo "server-management is now online"

	curl -X POST localhost:3333/api/management/database/seed
	
	echo "waiting max 4 minutes for server to be available"
	npx wait-on http://localhost:3030 -t 240000 --httpTimeout 250 --log
	echo "server is now online"

	echo "waiting max 4 minutes for client to be available"
	npx wait-on http://localhost:3100 -t 240000 --httpTimeout 250 --log
	echo "client is now online"

	echo "waiting max 4 minutes for nuxt to be available"
	npx wait-on http://localhost:4000 -t 240000 --httpTimeout 250 --log
	echo "nuxt is now online"

	#log_docker
	#docker ps &
}

main(){
	cd end-to-end-tests
	if [ -z "$1" ]
	then
		npm run test
	else
		npm run test:$1
	fi
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
main $1
echo "MAIN DONE"
set +e
