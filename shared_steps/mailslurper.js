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
        //let re = /PIN: (\d\d\d\d)/g;
        return emailSubject;
    });
const getEmailLink = (email) => request(options)
    .then(function(response) {
        var data = response.mailItems;
        var object = data.filter(d => d.toAddresses.includes(email))[0];
        const emailSubject = object.body;


    },
    


module.exports = {
    getEmailSubject, getEmailLink
}
