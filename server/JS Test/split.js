const fs = require('fs');

fs.readFile('games.json', (err, data) => {
    if (err) throw err;
    let gamesData = JSON.parse(data);
    console.log(gamesData);
})

