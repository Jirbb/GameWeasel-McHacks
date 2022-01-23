const axios = require("axios");
const Twitch = require("./TwitchOAuth");
const fs = require("fs");

var stream = fs.createWriteStream("games.json", {flags:'a'});
var offset = 0;

const retrieveCredentials = async () => {
    await Twitch.Twitch.getCredentials()
    .then(data => {
        console.log(data);
        pollGames(data);
    })
}

function pollGames(credentials) {
    const response = axios({
        url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'mv98buy2t8cuewa9m8c050uk53dacd',
            'Authorization': `Bearer ${credentials.access_token}`,
        },
        data: `where total_rating_count >= 1; sort total_rating_count desc; fields age_ratings,category,genres,keywords,name,platforms,tags,themes; limit 500; offset ${offset};`
        })
        .then(response => {
            response.data.forEach(element => {
                console.log(JSON.stringify(element));
                stream.write(`${JSON.stringify(element)}`);
            });
        })
        .catch(err => {
            console.error(err);
    });
    return response.data;
}



setInterval( () => {
offset += 500;
retrieveCredentials();
} , 500);

//console.log(credentials);
//pollGames(credentials);