/**
 * SMSController
 *
 * @description :: Server-side logic for managing sms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let requester = require("request-promise");
let parseNumber = require('tools').parseNumber;
let deprecated = require('deprecated');

function sendSMS(credentials, number, body) {
    // Messagegate sends the entire object through as a url param.
    let options = {
        method: 'POST',
        url: getURL(credentials, number, body),
        body: {},
        headers: {
            "Content-Type": "application/json",
        },
        json: true
    };

    return requester(options);
}

function getURL(credentials, number, body) {
    let params = {
        "username": credentials.username,
        "password": credentials.password,
        "account": credentials.account,
        "da": parseNumber(number),
        "ud": body,
        "id": "message02",
    };

    let mainUrl = `http://sms.msgm8.mobi/submit/single/?username=${params.username}`;

    // Build the url from the params we've entered,
    // ignoring the username as it always gets added first
    for (let i in params) {
        if (i !== "username") {
            mainUrl += `&${i}=${params[i]}`
        }
    }
    return mainUrl;
}

module.exports = {
    send: deprecated.sendMessage,
    sendSMS: sendSMS
};