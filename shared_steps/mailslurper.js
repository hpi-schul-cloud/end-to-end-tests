'use strict'
var request = require('request-promise');

const options = {
    method: 'GET',
    uri: 'http://localhost:8085/mail',
    json: true,

}

const getEmailSubject = (email) => request(options)
    .then(function(response) {
        var data = response.mailItems;
        var object = data.filter(d => d.toAddresses.includes(email))[0];
        const emailSubject = object.subject;
        return emailSubject;
    });
const getEmailLink = (email) => request(options)
    .then(function(response) {
        var data = response.mailItems;
        var object = data.filter(d => d.toAddresses.includes(email))[0];
        const emailSubject = object.body;
        const regExp = /localhost:.*\/pwrecovery\/[a-z, 0-9, A-Z]{24}/;
    return emailSubject.match(regExp);

    });


module.exports = {
    getEmailSubject, getEmailLink
}
