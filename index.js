var Twit = require('twit');
var Fs = require('fs');
var Notification = require('node-notifier');

// Read the Configuration
var configuration = JSON.parse(
  Fs.readFileSync('config.json')
);

// New Twitter
var T = new Twit({ consumer_key:configuration.consumer_key, consumer_secret:configuration.consumer_secret, access_token:configuration.access_token, access_token_secret:configuration.access_token_secret });

var stream = T.stream('statuses/filter', { follow: configuration.follow })
var notifier = new Notification();

stream.on('tweet', function (tweet) {
	if( configuration.follow.indexOf(tweet.user.id) >= 0 ) {
  		console.log('DEBUG: '+ tweet.user.name + ': ' + tweet.text);
  		notifier.notify({ title: tweet.user.name, icon: 'stock_person', e, message: tweet.text });
  	} 
})