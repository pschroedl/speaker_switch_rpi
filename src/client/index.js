'use strict';

var $ = require('jquery');
var slateApp = {};

slateApp.onReady = function() {
	console.log('successfully loaded bundle.js');

    $.post( "http://0.0.0.0:8080/switch", function( data ) {
        $('#speaker_toggle_response').html('posted to switch.  response : ' + data.status);
    });
};

$(document).ready(slateApp.onReady);
module.exports = slateApp;
