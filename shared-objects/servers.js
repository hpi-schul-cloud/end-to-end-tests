'use strict';

// STATIC DATA FROM ENV + DEFAULTS
const config = {
  CLIENT: {
    PROTOCOLL: process.env.IT_CLIENT_PROTOCOLL || 'http',
    HOST: process.env.IT_CLIENT_HOST || 'localhost',
    PORT: process.env.IT_CLIENT_PORT || '3100'
  }
};

// ADD AGGREGATED VALUE
config.CLIENT.URL = `${config.CLIENT.PROTOCOLL}://${config.CLIENT.HOST}:${config.CLIENT.PORT}`;


module.exports = config;
