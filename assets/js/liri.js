//reads a javascript file, executes the file, and then proceeds to return the exports object
const keys = require('./keys.js').twitterKeys;
const fs = require('fs');
const Twitter = require('twitter');
const spotify = require('spotify');

// console.log(JSON.stringify(keys)) ;
//gets array takes my input
const command = process.argv[2];

//if the user runs my-tweets command it will console log 20 status
if (command === 'my-tweets') {
    const client = new Twitter(keys);
    const parameters = { screen_name: 'randomuser713', count: 20 }

    client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
        if (error) {
            if (!tweets.length) {
                console.log('You have no tweets');
            }
            console.log(tweets);
            // console.log(response);
        }
        else {
            // console.log(error)
            for (var i = 0; i < tweets.length; i++){
                console.log(JSON.stringify(tweets[i].text, null, 2));
            }
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
