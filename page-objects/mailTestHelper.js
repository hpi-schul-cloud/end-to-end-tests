'use strict'
var request = require('request-promise');

const options = {
    method: 'GET',
    uri: 'http://localhost:8085/mail',
    json: true,

}

const getLastPin = (email) => request(options)
    .then(function(response) {
        var data = response.mailItems;
        var object = data.filter(d => d.toAddresses.includes(email))[0];
        const string = object.body;
        let re = /PIN: (\d\d\d\d)/g;
        var pinString = string.match(re)[0];
        var pin = pinString.substring(5,9);
        console.log("PIN:", pin);
        return pin;
    });


module.exports = {
    getLastPin,
}

