var Twit = require('twit')
var Notification = require('node-notifier');

var T = new Twit({
    consumer_key:         '{consumer_key}'
  , consumer_secret:      '{consumer_secret}'
  , access_token:         '{access_token}'
  , access_token_secret:  '{access_token_secret}'
})

var follow = [
	7174972,		// NOS 
	14183947, 		// NOSwielrennen
	121096782, 		// NOSvoetbal
	229399494, 		// NOSsport
	19386691,		// NOSop3
	92045258,		// NOScommunicatie
	11914452,		// NOSschaatsen
];

var stream = T.stream('statuses/filter', { follow: follow })
var notifier = new Notification();

stream.on('tweet', function (tweet) {
	if( follow.indexOf(tweet.user.id) >= 0 ) {
  		console.log('DEBUG: '+ tweet.user.name + ': ' + tweet.text);
  		notifier.notify({ title: tweet.user.name, icon: 'stock_person', message: tweet.text })
  	} 
})