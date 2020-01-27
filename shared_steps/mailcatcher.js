'use strict';
var request = require('request-promise');

const options = {
  method: 'GET',
  uri: 'http://localhost:1080/messages/1.plain'
};

const getEmailSubject = email => {
  request(options).then(response => {
    console.log(response, 'res');
    const data = response.mailItems;
    const object = data.filter(d => d.toAddresses.includes(email))[0];
    const emailSubject = object.subject;
    return emailSubject;
  });
};

const getEmailLink = email => {
  request(options).then(response => {
    console.log(response, 'res');
    const data = response.mailItems;
    const object = data.filter(d => d.toAddresses.includes(email))[0];
    const emailSubject = object.body;
    const regExp = /localhost:.*\/pwrecovery\/[a-z, 0-9, A-Z]{24}/;
    return emailSubject.match(regExp);
  });
};

module.exports = {
  getEmailSubject,
  getEmailLink
};
