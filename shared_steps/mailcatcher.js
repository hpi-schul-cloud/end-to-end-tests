'use strict';
const request = require('request-promise');

const getRequestOptions = (type = 'plain') => {
  const options = {
    method: 'GET',
    uri: `http://localhost:1080/messages/1.${type}`
  };
  return options;
};

const getEmailSubject = async emailAddress => {
  const options = getRequestOptions('json');
  const response = await request(options);
  const regExp = /"subject":"(.*?)"/; // regexp for capturing the subject
  const subjectFromEmail = response.match(regExp); // gherkin does not allow json.parse in this case
  return subjectFromEmail[1];
};

const getEmailLink = async emailAddress => {
  const options = getRequestOptions('plain');
  const response = await request(options);
  const regExp = /localhost:.*\/pwrecovery\/[a-z, 0-9, A-Z]{24}/; // regexp for capturing the generated password link
  const regexResult = response.match(regExp);
  return regexResult[0];
};

module.exports = {
  getEmailSubject,
  getEmailLink
};
