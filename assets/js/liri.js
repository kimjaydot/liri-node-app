//reads a javascript file, executes the file, and then proceeds to return the exports object
const keys = require('./keys.js');
const fs = require('fs');
const Twitter = require('twitter');
const spotify = require('spotify');

console.log(keys + 'This is working') ;
//gets array takes my input
const command = process.argv[2];

if (command === 'my-tweets') {
    const client = new Twitter(keys);
    const parameters = { screen_name: 'randomuser713' }

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
    let searchObj = { };

    if (song === undefined) {
        fs.readFile("../../random.txt", "utf8", function (error, data) {
            if (error) {
                return console.error(error);
            }

            const trackName = data.split(',')[1].replace('"', '').replace('"', '');

            searchObj = {
                type: 'track',
                query: trackName
            };

            return spotify.search(searchObj, function (err, data) {
                if (err) {
                    console.error(err);
                }

                console.log(data.tracks.items[0].album.artists[0]);
            });
        });
    } else {
        searchObj = {
            type: 'track',
            query: song
        };

        spotify.search(searchObj, function (err, data) {
            if (err) {
                console.error(err);
            }

            console.log(data.tracks.items[0].album.artists[0]);
        });
    }
}