console.log("it is working");
var keys= require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
console.log(keys.twitterKeys.consumer_key);
//Variable to store the song
var search = process.argv[2];
var song = [];
switch (search) {
  case "spotify-this-song":
    song = process.argv[3];
    searchSpotify(song);
    break;
  case "my-tweets":
    twitter();
    break;
  default:

}



function searchSpotify(song){
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log(JSON.stringify(data, null, 2));
    var artist = data.tracks.items[0].album.artists[0].name;
    console.log(artist);
    var songName = data.tracks.items[0].name;
    console.log(songName);
});
}













// Function to call twitter
function twitter(){
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  //console.log(client);

  var params = {screen_name: '___joe363'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i=0; i<20; i++)
    {
      console.log(tweets[i].text);
      console.log("_______________________________________________________");
    }
  }
});

};
