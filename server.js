// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// SPOTIFY AUTHENTICATION
// https://github.com/thelinmichael/spotify-web-api-node#client-credential-flow
// ------------------------------------------- //


var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId: '6f90aae762534341aac911e306e7fc91',
  scopes: "user-read-recently-played user-library-read playlist-read-private playlist-read-collaborative user-top-read playlist-modify-public",
});


// ------------------------------------------- //


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));




// SPOTIFY API CALLS
// -------------------------------------------------------------------------------------------------------- //

app.get("/audiofeatures", function (request, response) {
  // Un-comment this line if you need to insert a value into a text box.
  // var track = request.query.track;
  var trackName, trackId;
  // This will search the track inputted as the first parameter.
  spotifyApi.searchTracks('Mo Bamba', { limit: 3, offset: 2 })
    .then(function (data) {
      // Return first search result
      trackName = data.body.tracks.items[0].name;
      console.log(trackName);
      trackId = data.body.tracks.items[0].id;
      console.log(trackId);
      return trackId;
    })
    .then(function (trackId) {
      // Get the audio features for the track
      return spotifyApi.getAudioFeaturesForTrack(trackId);
    })
    .then(function (audioFeatures) {
      // Get the valence attribute of each track and return as an array
      console.log(audioFeatures);
      // Valence audio feature
      var valenceValues = audioFeatures.body.audio_features.map(function (t) { return t ? t.valence : null; }).filter(e => e);
      console.log(valenceValues);
      // Acousticness audio feature
      var acousticnessValues = audioFeatures.body.audio_features.map(function (t) { return t ? t.acousticness : null; }).filter(e => e);
      // Danceability audio feature
      var danceabilityValues = audioFeatures.body.audio_features.map(function (t) { return t ? t.danceability : null; }).filter(e => e);
      // Energy audio feature
      var energyValues = audioFeatures.body.audio_features.map(function (t) { return t ? t.energy : null; }).filter(e => e);
      // Instrumentalness audio feature
      var instrumentalnessValues = audioFeatures.body.audio_features.map(function (t) { return t ? t.instrumentalness : null; }).filter(e => e);
      // Liveness audio feature
      var livenessValues = audioFeatures.body.audio_features.map(function (t) { return t ? t.liveness : null; }).filter(e => e);
      // Speechiness audio feature
      var speechinessValues = audioFeatures.body.audio_features.map(function (t) { return t ? t.speechiness : null; }).filter(e => e);
      // Duration Time audio feature
      var durationtime = audioFeatures.body.audio_features.map(function (t) { return t ? t.durationtime : null; }).filter(e => e);
      // Tempo audio feature
      var tempo_ = audioFeatures.body.audio_features.map(function (t) { return t ? t.tempo_ : null; }).filter(e => e);
      // Loudness audio feature
      var loudness_ = audioFeatures.body.audio_features.map(function (t) { return t ? t.loudness : null; }).filter(e => e);
      // Key audio feature
      var key_ = audioFeatures.body.audio_features.map(function (t) { return t ? t.key : null; }).filter(e => e);
      // Create and output the array containing all of the audio feature values
      response.json({
        track: { name: trackName, id: trackId }, valence: valenceValues, acousticness: acousticnessValues,
        danceability: danceabilityValues, energy: energyValues, instrumentalness: instrumentalnessValues,
        liveness: livenessValues, speechiness: speechinessValues, duration_time: durationtime, tempo: tempo_, loudness: loudness_, key: key_
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});




// -------------------------------------------------------------------------------------------------------- //


app.get('/', (req, res) => res.send('Hello World!'))

// listen for requests :)
app.listen(8888, function () {
  console.log('Your app is listening on port 8888');
});
