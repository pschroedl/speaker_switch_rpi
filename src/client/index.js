'use strict';

var $ = require('jquery');
var slateApp = {};

slateApp.onReady = function() {
	console.log('successfully loaded bundle.js');

    $.post( "http://50.250.227.5/switch", function( data ) {
      $( "#speaker_toggle_response" ).html( data );
    });
};

$(document).ready(slateApp.onReady);
module.exports = slateApp;
