#!/bin/bash
#BRANCH_NAME=feature/bc-68-e2e-build
if [[ -z "$BRANCH_NAME" ]]; then
    echo "Must provide BRANCH_NAME in environment"
    exit 1
fi
echo "BRANCH_NAME: $BRANCH_NAME"

get_sha1(){
	gitsha=$(git ls-remote https://github.com/hpi-schul-cloud/${1}.git refs/heads/${$BRANCH_NAME} | cut -f 1)
	if [ -z "$gitsha" ]
	then
		echo "no branch found ${1}"
		gitsha=$(git ls-remote https://github.com/hpi-schul-cloud/${1}.git refs/heads/main | cut -f 1)
	fi

	if [ -z "$gitsha" ]
	then
		echo "no sha1 found for ${1} main"
		exit 1
	else
		set -a
		export $2=$gitsha
		printenv | grep $2
	fi
}

setImageTags(){
	get_sha1 "nuxt-client" "NUXT_DOCKER_TAG"
	get_sha1 "schulcloud-client" "CLIENT_DOCKER_TAG"
	get_sha1 "schulcloud-server" "SERVER_DOCKER_TAG"
}

install(){
	git clone https://github.com/hpi-schul-cloud/end-to-end-tests.git end-to-end-tests
	cd end-to-end-tests
	git checkout "$BRANCH_NAME"
	npm ci
	cd ..

	git clone https://github.com/hpi-schul-cloud/docker-compose.git docker-compose
	cd docker-compose
	git checkout "$BRANCH_NAME"

	# authenticate against docker hub
	chmod 700 ./scripts/dockerhub.login.sh
	./scripts/dockerhub.login.sh

	set -a
	source ./envs/default.env
	source ./envs/end-to-end-tests.env
	[ -f ./envs/.env ] && source ./envs/.env

	docker-compose --verbose \
		--env-file ./envs/end-to-end-tests.env \
		-f ${COMPOSE_FILES_PATH}/docker-compose.yml \
		pull --ignore-pull-failures --include-deps # --quiet
}

startContainer(){
	docker-compose -f compose-files/docker-compose.yml up -d mongodb mongodb-secondary mongodb-arbiter redis rabbit mailcatcher selenium-hub calendar-init
	docker-compose -f compose-files/docker-compose.yml up -d chrome mongosetup maildrop calendar-postgres
	docker-compose -f compose-files/docker-compose.yml up -d calendar
	docker-compose -f compose-files/docker-compose.yml up -d server client nuxtclient &

	# wait for the nuxt client to be available
	echo "waiting max 4 minutes for Server to be available"
	npx wait-on http://localhost:3030 -t 240000 --httpTimeout 250 --log
	echo "Server is now online"

	# wait for the nuxt client to be available
	echo "waiting max 4 minutes for client to be available"
	npx wait-on http://localhost:3100 -t 240000 --httpTimeout 250 --log
	echo "client is now online"

	# wait for the nuxt client to be available
	echo "waiting max 4 minutes for nuxt to be available"
	npx wait-on http://localhost:4000 -t 240000 --httpTimeout 250 --log
	echo "nuxt is now online"

	#log docker
	#docker-compose -f compose-files/docker-compose.yml logs -f &
	#docker ps &
	cd ..
}

reset_db(){
	server_container=$(docker ps -aqf "name=schulcloud-server")
	docker exec -it ${server_container} apk add mongodb-tools
	docker exec -ti ${server_container} npm run setup
}

main(){
	cd end-to-end-tests
	npm run test
	cd ..
}

set -e
echo "setImageTags..."
setImageTags
echo "setImageTags DONE"

#set +e
echo "install..."
install
echo "install DONE"

#set -e
echo "startContainer..."
startContainer
echo "startContainer DONE"

echo "reset db..."
reset_db
echo "reset db DONE"

echo "run tests..."
main
echo "run tests DONE"
set +e
