FROM node:10.15-alpine

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
RUN npm i -g selenium-standalone
RUN selenium-standalone install

COPY . .

RUN chmod 550 ./startup.sh
CMD bash ./startup.sh