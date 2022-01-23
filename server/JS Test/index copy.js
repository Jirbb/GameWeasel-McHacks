const axios = require("axios");
const Twitch = require("./TwitchOAuth");
const fs = require("fs");

var stream = fs.createWriteStream("tags.json", {flags:'w'});
var offset = 0;
var tagHeatMap = new Map();

const retrieveCredentials = async () => {
    await Twitch.Twitch.getCredentials()
    .then(data => {
        //console.log(data);
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
        data: `where total_rating_count >= 1; sort total_rating_count desc; fields age_ratings,category,genres,keywords,name,platforms,themes; limit 500; offset ${offset};`
        })
        .then(response => {
            if (response.data.length == 0)
            {
                clearInterval(penis);
                for (const [key, value] of tagHeatMap.entries()){
                    tagHeatMap.set(key, Array.from(tagHeatMap.get(key)));
                }
                
                stream.write(`${JSON.stringify(Array.from(tagHeatMap.entries()))}`);
            }
            response.data.forEach(element => {
                if (element.genres){
                    element.genres.forEach(mainTag => {
                        element.genres.forEach(otherTag => {
                            if (!tagHeatMap.has(mainTag)){
                                tagHeatMap.set(mainTag, new Map());
                            }
                            if (!tagHeatMap.get(mainTag).has(otherTag)){
                                tagHeatMap.get(mainTag).set(otherTag, 1);
                            }
                            else {
                                tagHeatMap.get(mainTag).set(otherTag, tagHeatMap.get(mainTag).get(otherTag) + 1);
                            }
                            console.log(tagHeatMap.get(mainTag).get(otherTag));
                        })
                    })
                }
                //console.log(JSON.stringify(element));
                //stream.write(`${JSON.stringify(element)}`);
            });
            // clearInterval(penis);
        })
        .catch(err => {
            console.error(err);
    });
    return response.data;
}



penis = setInterval( () => {
    offset += 500;
    retrieveCredentials();
} , 500);



//console.log(credentials);
//pollGames(credentials);