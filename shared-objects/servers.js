'use strict';

const config = {
  CLIENT: {
    HOST: process.env.IT_CLIENT_HOST || 'localhost',
    PORT: process.env.IT_CLIENT_PORT || '3100'
  }
};

config.CLIENT.URL = `${config.CLIENT.HOST}:${config.CLIENT.PORT}`;

module.exports = config;
