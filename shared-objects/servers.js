'use strict';

// STATIC DATA FROM ENV + DEFAULTS
const config = {
  CLIENT: {
    PROTOCOLL: process.env.IT_CLIENT_PROTOCOLL || 'http',
    HOST: process.env.IT_CLIENT_HOST || 'localhost',
    PORT: process.env.IT_CLIENT_PORT || '3100',
    get URL() {
      return `${config.CLIENT.PROTOCOLL}://${config.CLIENT.HOST}:${config.CLIENT.PORT}`
    }
  },
  SERVER: {
    PROTOCOLL: process.env.IT_SERVER_PROTOCOLL || 'http',
    HOST: process.env.IT_SERVER_HOST || 'localhost',
    PORT: process.env.IT_SERVER_PORT || '3100',
    get URL() {
      return `${config.SERVER.PROTOCOLL}://${config.SERVER.HOST}:${config.SERVER.PORT}`
    }
  }
};

module.exports = config;
