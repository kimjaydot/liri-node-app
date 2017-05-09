const keys = require('./keys.js');
const fs = require('fs');
const Twitter = require('twitter');
const spotify = require('spotify');

const command = process.argv[2];

if (command === 'my-tweets') {
    const client = new Twitter(keys);
    const parameters = { screen_name: 'kimjaydot' }

    client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
        if (!error) {
            if (!tweets.length) {
                console.log('You have no tweets');
            }
            console.log(tweets);
        }
        else {
            console.log(error)
        }
    });
} else if (command === 'spotify-this-song') {
    const song = process.argv[3];

    if (song) {
        return
    }

    fs.readFile("../../random.txt", "utf8", function (error, data) {
        if (error) {
            return console.error(error);
        }

        // We will then print the contents of data
        console.log(data);
    })
}