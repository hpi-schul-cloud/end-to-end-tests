'use strict';
var request = require('request-promise');

const getRequestOptions = (type = 'plain') => {
  const options = {
    method: 'GET',
    uri: `http://localhost:1080/messages/1.${type}`
  };
  return options;
};

const getEmailSubject = async email => {
  console.log('getEmailSubject');
  const options = getRequestOptions('json');
  const response = await request(options);
  const regExp = /"subject":"(.*?)"/;
  const subjectFromEmail = response.match(regExp); // gherkin does not allow json.parse in this case
  return subjectFromEmail[1];
};

const getEmailLink = async email => {
  console.log('getEmailLink');
  const options = getRequestOptions('plain');
  const response = await request(options);
  console.log(response, typeof response, response.length, 'res');
  const regExp = /localhost:.*\/pwrecovery\/[a-z, 0-9, A-Z]{24}/;
  const a = response.match(regExp);
  console.log(a, 'response password');
  return response.match(regExp);
};

module.exports = {
  getEmailSubject,
  getEmailLink
};
