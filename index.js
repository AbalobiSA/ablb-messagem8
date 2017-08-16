/**
 * SMSController
 *
 * @description :: Server-side logic for managing sms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let request = require("request");

/**
 * Sends a message once supplied with secrets file.
 * @param secrets
 * @param message_number
 * @param message_body
 */
function sendMessage(secrets, message_number, message_body) {
    // Messagegate sends the entire object through as a url param.
    let options = {
        method: 'POST',
        url: (function(){

            let params = {
                "username": secrets.MESSAGEGATE.username,
                "password": secrets.MESSAGEGATE.password,
                "account": secrets.MESSAGEGATE.account,
                "da": parseNumber(message_number),
                "ud": message_body,
                "id": "message02",
            };

            let mainUrl = `http://sms.msgm8.mobi/submit/single/?username=${params.username}`;

            // Build the url from the params we've entered,
            // ignoring the username as it always gets added first
            for (let i in params){
                if (i !== "username"){
                    mainUrl += `&${i}=${params[i]}`
                }
            }


            return mainUrl;
        })(),
        body: (function() {
            return { }
        })(),
        headers: {
            "Content-Type": "application/json",
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log("LOGGING RESPONSE");
        console.log(body);
    });
}

/**
 * Takes a number and replaces it with the South African country code,
 * removing invalid characters
 * @param input
 * @returns {string} - parsed number
 */
function parseNumber(input) {
    // Process the cell number here

    let initialNumber = input;
    let newNumber = "";

    // console.log("SUBSTRING OF INITIAL: " + initialNumber.substring(0, 3));

    // replace all spaces
    if (initialNumber.indexOf(' ') >= 0){

        // console.log("Spaces detected, replacing...");
        initialNumber = initialNumber.replace(/ /g, '');
    }

    // If the number begins with 0, replace with 27
    if (initialNumber.substring(0, 1) === "0") {

        // console.log("SUBSTRING: " + initialNumber.substring(0, 2) + "\n");
        newNumber = "27" + initialNumber.substring(1);
    }

    // If the number begins with a +27, remove the plus
    else if (initialNumber.substring(0, 3) === "+27") {
        // console.log("SUBSTRING: " + initialNumber.substring(1) + "\n");
        newNumber = initialNumber.substring(1);
    } else {
        newNumber = initialNumber;
    }

    return newNumber;
}

module.exports = {
    send: sendMessage
};