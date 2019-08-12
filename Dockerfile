FROM timbru31/java-node

# Install package dependencies
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
RUN npm i -g selenium-standalone
RUN selenium-standalone install

COPY . .

RUN chmod 550 ./startup.sh
CMD ./startup.sh