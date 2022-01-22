// id: mv98buy2t8cuewa9m8c050uk53dacd
// secret: 552y7n44kauxkk8h80gq7d31dejjrc

const axios = require("axios");

class TwitchOAuth {
    static async getCredentials() {
        const response = await axios({
            method: "POST",
            url: `https://id.twitch.tv/oauth2/token`,
            params: {
                client_id: `mv98buy2t8cuewa9m8c050uk53dacd`,
                client_secret: `552y7n44kauxkk8h80gq7d31dejjrc`,
                grant_type: "client_credentials"
            }
        })
        return response.data;
    }
}

module.exports.Twitch = TwitchOAuth;