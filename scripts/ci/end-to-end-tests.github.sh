#!/bin/bash

echo "current pwd"
pwd

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
	#_switchBranch "$1" "main" "$2"

	# if branch exists, try to switch to it
	_switchBranch "$1" "$BRANCH_NAME" "$2"
}

fetch(){
	echo "current pwd in fetch"
    pwd
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

build_images(){
   docker-compose -f compose-files/docker-compose.yml images | grep $1 
   docker-compose -f compose-files/docker-compose.yml images | grep -c $1 
}

install(){
	cd docker-compose

	echo "current pwd in install"
    pwd

	# authenticate against docker
	chmod 700 ./scripts/dockerhub.login.sh
	./scripts/dockerhub.login.sh

	chmod 700 ./startup_end-to-end-tests.sh
	echo "PULL CONTAINERS..."
	./startup_end-to-end-tests.sh pull --ignore-pull-failures --include-deps # --quiet
	echo "PULL CONTAINERS DONE"

	 build_images schulcloud-server
	 build_images schulcloud-client
	 build_images nuxt-client
	
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
	docker-compose -f compose-files/docker-compose.yml up server client nuxtclient &
	cd ..

	echo "INSTALL DEPENDNECIES..."
	cd schulcloud-server && npm ci && cd ..
	cd end-to-end-tests && npm ci && cd ..
	echo "INSTALL DEPENDNECIES DONE"

	cd schulcloud-server && npm run setup && npm run seed && cd ..


	# wait for the nuxt client to be available
	echo "waiting max 4 minutes for nuxt to be available"
	npx wait-on http://localhost:4000 -t 240000 --httpTimeout 250 --log
	echo "nuxt is now online"

	log_docker
	docker ps &
}

main(){
	cd end-to-end-tests
	npm run test
	cd ..
}

set -e
echo "FETCH..."
fetch
echo "FETCH DONE"

set +e
echo "INSTALL..."
install
echo "INSTALL DONE"

set -e
echo "BEFORE..."
before
echo "BEFORE DONE"

echo "MAIN..."
main
echo "MAIN DONE"
set +e
