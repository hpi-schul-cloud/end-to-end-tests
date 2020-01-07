# check PWD is not this directory
if [[ $PWD == *"/scripts/ci"* ]]; then 
	echo "call this file from integration-tests root folder to correctly map the configuration file"
	exit -1
fi

# configure server to use mailslurper for sending mails
export SMTP="smtp://localhost:2500"
export SMTP_HOST="localhost"
export SMTP_PORT="2500"

# run mailslurper
docker run -v $PWD/scripts/ci/mailslurper-config.json:/opt/mailslurper/config.json -p 2500:2500 -p 8080:8080 -p 8085:8085 derekahn/mailslurper &
