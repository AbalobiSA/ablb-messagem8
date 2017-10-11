let parseNumber = require('./tools').parseNumber;
let requester = require('request-promise');

module.exports = {
    /**
     * DEPRECATED!!!!!!!!!!!!!!!!
     * Sends a message once supplied with secrets file.
     * @param secrets
     * @param message_number
     * @param message_body
     */
    sendMessage: (secrets, message_number, message_body) => {
        return new Promise((resolve, reject) => {
            // Messagegate sends the entire object through as a url param.
            let options = {
                method: 'POST',
                url: (function () {

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
                    for (let i in params) {
                        if (i !== "username") {
                            mainUrl += `&${i}=${params[i]}`
                        }
                    }


                    return mainUrl;
                })(),
                body: (function () {
                    return {}
                })(),
                headers: {
                    "Content-Type": "application/json",
                },
                json: true
            };

            // requester(options, function (error, response, body) {
            //     if (error) throw new Error(error);
            //     console.log("LOGGING RESPONSE");
            //     console.log(body);
            // });

            requester(options).then(response => {
                // console.log(response);
                resolve(response);
            }).catch(ex => {
                // console.log("Error!", ex);
                console.log("Error sending sms with messagem8!");
                reject(ex);
            })
        });
    }
};