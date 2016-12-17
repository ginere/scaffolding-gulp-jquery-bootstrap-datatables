/**
 * Appication entry point
 */
'use strict';

/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false */

console.log("Hello wolrd!");

var $ = require('jquery');
var Q = require('q');

var Editor = require('./Editor');
var KeyboardEvents=require('./KeyboardEvents');


$(document).ready(function() {
    console.log( "ready!" );

	// The keyboard events
	KeyboardEvents.ready();

	// render the table
	Editor.render("#table");

	KeyboardEvents.shorcut(39,false,function(){
		console.info("Pepe:...");
	});
    // $('#example').DataTable();
});
