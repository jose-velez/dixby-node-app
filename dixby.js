console.log("it is working");
var keys= require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");
console.log(keys.twitterKeys.consumer_key);
//Variable to store the song
var search = process.argv[2];
var song = [];
var movie = [];
switch (search) {
  case "spotify-this-song":
    song = process.argv[3];
    if (song === undefined) {
        song = "The Sign";
        searchSpotify(song);
    }
    searchSpotify(song);
    break;
  case "my-tweets":
    twitter();
    break;
  case "movie-this":
  movie = process.argv[3];
  movieSearch(movie);
  break;
  case "do-what-it-says":
    readFile();
    break;
  default:

}


// function to call spotify
function searchSpotify(song){
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log("_______________________________________________________");
    var artist = data.tracks.items[0].album.artists[0].name;
    console.log("Artist: " + artist);
    var songName = data.tracks.items[0].name;
    console.log("Song Name: " + songName);
    var songLink = data.tracks.items[0].external_urls.spotify;
    console.log("Link: " + songLink);
    var album = data.tracks.items[0].album.name;
    console.log("Album: " + album);
    console.log("_______________________________________________________");
});
};

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

//Function to call OMDB
function movieSearch(movie)
{
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
  console.log('error:', error); // Print the error if one occurre
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  console.log(body.title);
  console.log(response.title);
});
};
//Function to read the file
function readFile(){
  fs.readFile("random.txt", "utf8", function(error, data){
    var dataArr = data.split(",");
    console.log(dataArr);
    searchSpotify(dataArr[1])
  })
}
