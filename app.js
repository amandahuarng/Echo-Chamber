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
const clientID = 'cc490ff74fbd4a84b6765221eee81f01';
const redirectURI = 'http://134.209.7.118/Echo-Chamber/newplaylist.html'; //our browser
const scopes = ['user-read-recently-played', 'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'user-top-read', 'playlist-modify-public'];

function handleRedirect(req, res){
  const authURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes}&response_type=token`;
  window.location.href = authURL;
};


function getToken(){

};

if (window.location.href.splice(0,15) == redirectURI){
    hash =window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
   });
   _token = hash.access_token;
};
  

/*
$.ajax({
  url: 'https://api.spotify.com/v1/me',
  headers: {
      'Authorization': 'Bearer ' + accessToken
  },
  success: function(response) {
      ...
  }
});
*/

function options() {
  // Visualization options //

  var valenceopts = {
    angle: 0.15,              // We can have a bunch of gauges displaying your current moods.
    lineWidth: 0.31,          // Line thickness
    radiusScale: 1,           // The relative raidus of the gauge
    pointer: {
      length: 0.6,            // The length of the gauge pointer is 0.6 relative to the radius of the gauge.
      strokeWidth: 0.049,     // We want a pretty thin pointer.
      color: '#00FFA0'        // This will give us a turquoise pointer (Spotify main colour)
    },
    limitMax: 1,              // For a slider like valence, we want it to span between 0 and 1.
    limitMin: 0,
    colorStart: '#FF0000',    // Just a black background
    colorStop: '#0000FF',     // These can really be any values I'll play around with them.
    percentColors: [[0.0, "#FF0000"], [1.0, "#0000FF"]],  // As the valence increases, the colour changes.
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true      // Support for high resolutions
  };

  var acousticnessopts = {
    angle: 0.15,              // We can have a bunch of gauges displaying your current moods.
    lineWidth: 0.31,          // Line thickness
    radiusScale: 1,           // The relative raidus of the gauge
    pointer: {
      length: 0.6,            // The length of the gauge pointer is 0.6 relative to the radius of the gauge.
      strokeWidth: 0.049,     // We want a pretty thin pointer.
      color: '#00FFA0'        // This will give us a turquoise pointer (Spotify main colour)
    },
    limitMax: 1,              // For a slider like acousticness, we want it to span between 0 and 1.
    limitMin: 0,
    colorStart: '#FF0000',    // Change these values (we don't want negative connotations here, maybe purple and blue?)
    colorStop: '#0000FF',     // These can really be any values I'll play around with them.
    percentColors: [[0.0, "#FF0000"], [1.0, "#0000FF"]],  // As the valence increases, the colour changes.
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true      // Support for high resolutions
  };

  var danceabilityopts = {
    angle: 0.15,              // We can have a bunch of gauges displaying your current moods.
    lineWidth: 0.31,          // Line thickness
    radiusScale: 1,           // The relative raidus of the gauge
    pointer: {
      length: 0.6,            // The length of the gauge pointer is 0.6 relative to the radius of the gauge.
      strokeWidth: 0.049,     // We want a pretty thin pointer.
      color: '#00FFA0'        // This will give us a turquoise pointer (Spotify main colour)
    },
    limitMax: 1,              // For a slider like danceability, we want it to span between 0 and 1.
    limitMin: 0,
    colorStart: '#FF0000',    // Change these values (we don't want negative connotations here, maybe purple and blue?)
    colorStop: '#0000FF',     // These can really be any values I'll play around with them.
    percentColors: [[0.0, "#FF0000"], [1.0, "#0000FF"]],  // As the valence increases, the colour changes.
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true      // Support for high resolutions
  };

  var energyopts = {
    angle: 0.15,              // We can have a bunch of gauges displaying your current moods.
    lineWidth: 0.31,          // Line thickness
    radiusScale: 1,           // The relative raidus of the gauge
    pointer: {
      length: 0.6,            // The length of the gauge pointer is 0.6 relative to the radius of the gauge.
      strokeWidth: 0.049,     // We want a pretty thin pointer.
      color: '#00FFA0'        // This will give us a turquoise pointer (Spotify main colour)
    },
    limitMax: 1,              // For a slider like energy, we want it to span between 0 and 1.
    limitMin: 0,
    colorStart: '#FF0000',    // Change these values (we don't want negative connotations here, maybe purple and blue?)
    colorStop: '#0000FF',     // These can really be any values I'll play around with them.
    percentColors: [[0.0, "#FF0000"], [1.0, "#0000FF"]],  // As the valence increases, the colour changes.
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true      // Support for high resolutions
  };

  var instrumentalnessopts = {
    angle: 0.15,              // We can have a bunch of gauges displaying your current moods.
    lineWidth: 0.31,          // Line thickness
    radiusScale: 1,           // The relative raidus of the gauge
    pointer: {
      length: 0.6,            // The length of the gauge pointer is 0.6 relative to the radius of the gauge.
      strokeWidth: 0.049,     // We want a pretty thin pointer.
      color: '#00FFA0'        // This will give us a turquoise pointer (Spotify main colour)
    },
    limitMax: 1,              // For a slider like instrumentalness, we want it to span between 0 and 1.
    limitMin: 0,
    colorStart: '#FF0000',    // Change these values (we don't want negative connotations here, maybe purple and blue?)
    colorStop: '#0000FF',     // These can really be any values I'll play around with them.
    percentColors: [[0.0, "#FF0000"], [1.0, "#0000FF"]],  // As the valence increases, the colour changes.
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true      // Support for high resolutions
  };

  var livenessopts = {
    angle: 0.15,              // We can have a bunch of gauges displaying your current moods.
    lineWidth: 0.31,          // Line thickness
    radiusScale: 1,           // The relative raidus of the gauge
    pointer: {
      length: 0.6,            // The length of the gauge pointer is 0.6 relative to the radius of the gauge.
      strokeWidth: 0.049,     // We want a pretty thin pointer.
      color: '#00FFA0'        // This will give us a turquoise pointer (Spotify main colour)
    },
    limitMax: 1,              // For a slider like liveness, we want it to span between 0 and 1.
    limitMin: 0,
    colorStart: '#FF0000',    // Change these values (we don't want negative connotations here, maybe purple and blue?)
    colorStop: '#0000FF',     // These can really be any values I'll play around with them.
    percentColors: [[0.0, "#FF0000"], [1.0, "#0000FF"]],  // As the valence increases, the colour changes.
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true      // Support for high resolutions
  };

  var speechinessopts = {
    angle: 0.15,              // We can have a bunch of gauges displaying your current moods.
    lineWidth: 0.31,          // Line thickness
    radiusScale: 1,           // The relative raidus of the gauge
    pointer: {
      length: 0.6,            // The length of the gauge pointer is 0.6 relative to the radius of the gauge.
      strokeWidth: 0.049,     // We want a pretty thin pointer.
      color: '#00FFA0'        // This will give us a turquoise pointer (Spotify main colour)
    },
    limitMax: 1,              // For a slider like speechiness, we want it to span between 0 and 1.
    limitMin: 0,
    colorStart: '#FF0000',    // Change these values (we don't want negative connotations here, maybe purple and blue?)
    colorStop: '#0000FF',     // These can really be any values I'll play around with them.
    percentColors: [[0.0, "#FF0000"], [1.0, "#0000FF"]],  // As the valence increases, the colour changes.
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true      // Support for high resolutions
  };

  // Defining valence canvas element and creating valence gauge
  var valencetarget = document.getElementById('valencegauge');
  var valencegauge = new Gauge(valencetarget).setOptions(valenceopts);
  valencegauge.setMinValue(0);
  valencegauge.maxValue(1);
  valencegauge.set(0);

  // Defining the acousticness canvas element and creating the acousticness gauge
  var acousticnesstarget = document.getElementById('acousticnessgauge');
  var acousticnessgauge = new Gauge(acousticnesstarget).setOptions(acousticnessopts);
  acousticnessgauge.setMinValue(0);
  acousticnessgauge.maxValue(1);
  acousticnessgauge.set(0);

  // Defining the danceability canvas element and creating the danceability gauge
  var danceabilitytarget = document.getElementById('danceabilitygauge');
  var danceabilitygauge = new Gauge(danceabilitytarget).setOptions(danceabilityopts);
  danceabilitygauge.setMinValue(0);
  danceabilitygauge.maxValue(1);
  danceabilitygauge.set(0);

  // Defining the energy canvas element and creating the energy gauge
  var energytarget = document.getElementById('energygauge');
  var energygauge = new Gauge(energytarget).setOptions(energyopts);
  energygauge.setMinValue(0);
  energygauge.setMaxValue(1);
  energygauge.set(0);

  // Defining the instrumentalness canvas element and creating the instrumentalness gauge
  var instrumentalnesstarget = document.getElementById('instrumentalnessgauge');
  var instrumentalnessgauge = new Gauge(instrumentalnesstarget).setOptions(instrumentalness);
  instrumentalnessgauge.setMinValue(0);
  instrumentalnessgauge.setMaxValue(1);
  instrumentalnessgauge.set(0);

  // Defining the liveness canvas element and creating the liveness gauge
  var livenesstarget = document.getElementById('livenessgauge');
  var livenessgauge = new Gauge(livenesstarget).setOptions(liveness);
  livenessgauge.setMinValue(0);
  livenessgauge.setMaxValue(1);
  livenessgauge.set(0);

  // Defining the speechiness canvas element and creating the speechiness gauge
  var speechinesstarget = document.getElementById('speechinessgauge');
  var speechinessgauge = new Gauge(speechinesstarget).setOptions(speechiness)
  speechinessgauge.setMinValue(0);
  speechinessgauge.setMaxValue(1);
  speechinessgauge.set(0);

  $('form').submit(function(event) {
    event.preventDefault();
    $('ul#values').empty();
    $.get('/audiofeatures?' + $.param({track: track}), function(data) {
      $('input').val('');
      $('input').focus();
      $('#artistName').html("Audio features for data.track.name");
      $('#valence').html(data.valence);
      valencegauge.set(data.valence);
      $('#acousticness').html(data.acousticness);
      acousticnessgauge.set(data.acousticness);
      $('#danceability').html(data.danceability);
      danceabilitygauge.set(data.danceability);
      $('#energy').html(data.energy);
      energygauge.set(data.energy);
      $('#instrumentalness').html(data.instrumentalness);
      instrumentalnessgauge.set(data.instrumentalness);
      $('#liveness').html(data.liveness);
      livenessgauge.set(data.liveness);
      $('#speechiness').html(data.speechiness);
      speechinessgauge.set(data.speechiness);
      $('#duration_time').html(data.duration_time);
      console.log(data.duration_time);
      $('#tempo').html(data.tempo);
      console.log(data.tempo);
      $('#loudness').html(data.loudness);
      console.log(data.loudness);
      $('#key').html(data.key);
      console.log(data.key);

      data.audiofeatures.forEach(function(feature) {
        $('<li></li>').text(features).appendTo('ul#values');
      });
    });
  });
}
