'use strict';
const request = require('request-promise');

const mailcatcherUrl = 'http://localhost:1080';

const getRequestOptions = (type = 'plain') => {
  const options = {
    method: 'GET',
    uri: `${mailcatcherUrl}/messages/1.${type}`
  };
  return options;
};
const deleteRequestOptions = {
    method: 'DELETE',
    uri: `${mailcatcherUrl}/messages`
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

const clearEmailCache = async () => {
  const response = await request(deleteRequestOptions);
  return response;
}

module.exports = {
  getEmailSubject,
  getEmailLink,
  clearEmailCache
};
