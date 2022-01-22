const axios = require("axios");
const Twitch = require("./TwitchOAuth");

const retrieveCredentials = async () => {
    await Twitch.Twitch.getCredentials()
    .then(data => {
        console.log(data);
    })
}

retrieveCredentials();