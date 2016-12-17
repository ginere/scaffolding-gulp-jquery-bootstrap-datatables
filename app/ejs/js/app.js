/**
 * Appication entry point
 */
'use strict';
<% var currentName="app"; %>
<%- include('./snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

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
