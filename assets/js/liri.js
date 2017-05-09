const keys = require('./keys.js');
const Twitter = require('twitter');

const command = process.argv[2];

if (command === 'my-tweets') {
    const c = new Twitter(keys);
    const p = { screen_name: 'kimjaydot' }

    c.get('statuses/user_timeline', p, function(error, tweets, response) {
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
}
