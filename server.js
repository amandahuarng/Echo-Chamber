// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// Authorization request
const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';


// Replace with your app's client ID, redirect URI and desired scopes
const clientID = '6f90aae762534341aac911e306e7fc91';
const redirectURI = 'http://localhost:8888'; //our browser
const scopes = ['user-read-recently-played', 'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'user-top-read', 'playlist-modify-public'];





// If there is no token, redirect to Spotify authorization
//if (!_token) {
function authorize()
{
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
}
//}


// SPOTIFY AUTHENTICATION
// https://github.com/thelinmichael/spotify-web-api-node#client-credential-flow
// ------------------------------------------- //

/*
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId : '6f90aae762534341aac911e306e7fc91',
  scopes: "user-read-recently-played user-library-read playlist-read-private playlist-read-collaborative user-top-read playlist-modify-public",

  //clientSecret : process.env.clientSecret
});
*/

/*
function authorize() {
  spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token is ' + data.body['access_token']);
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

*/

// ------------------------------------------- //


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
/*
app.get("/", function (request, response) {
  authorize();
  response.sendFile(__dirname + '/views/index.html');
});
*/


// SPOTIFY API CALLS
// -------------------------------------------------------------------------------------------------------- //

app.get("/audiofeatures", function (request, response) {
  var track = request.query.track;
  var trackName, trackId;
  spotifyApi.searchTracks('Mo Bamba', { limit: 3, offset: 2 })
  .then(function(data) {
    // Return first search result
    trackName = data.body.track.items[0].name;
    trackId = data.body.track.items[0].id;
    return trackId;
  })
  .then(function(trackId) {
    // Get the audio features for the track
    return spotifyApi.getAudioFeaturesForTracks(trackId);
  })
  .then(function(audioFeatures) {
    // Get the valence attribute of each track and return as an array
    console.log(audioFeatures)
    var valenceValues = audioFeatures.body.audio_features.map(function(t) { return t ? t.valence : null; }).filter(e => e);
    var averageValence = valenceValues.reduce(function(a, b) { return a + b; }) / valenceValues.length;
    var acousticnessValues = audioFeatures.body.audio_features.map(function(t) { return t ? t.acousticness : null; }).filter(e => e);
    var danceabilityValues = audioFeatures.body.audio_features.map(function(t) { return t ? t.danceability : null; }).filter(e => e);
    var energyValues = audioFeatures.body.audio_features.map(function(t) { return t ? t.energy : null; }).filter(e => e);
    var instrumentalnessValues = audioFeatures.body.audio_features.map(function(t) { return t ? t.instrumentalness : null; }).filter(e => e);
    var livenessValues = audioFeatures.body.audio_features.map(function(t) { return t ? t.liveness : null; }).filter(e => e);
    var speechinessValues = audioFeatures.body.audio_features.map(function(t) { return t ? t.speechiness : null; }).filter(e => e);
    response.json({ track: { name: trackName, id: trackId }, valence: valenceValues, acousticness: acousticnessValues,
    danceability: danceabilityValues, energy: energyValues, instrumentalness: instrumentalnessValues,
    liveness: livenessValues, speechiness: speechinessValues});
  })
  .catch(function(err) {
    console.log(err);
  });
});


// -------------------------------------------------------------------------------------------------------- //


app.get('/', (req, res) => res.send('Hello World!'))

// listen for requests :)
app.listen(8888, function () {
  console.log('Your app is listening on port 8888');
});
