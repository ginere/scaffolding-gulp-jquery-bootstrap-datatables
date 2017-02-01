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
var ConsolidatedView = require('./ConsolidatedView');
var Overlay = require('./Overlay');

var KeyboardEvents=require('./KeyboardEvents');


$(document).ready(function() {
    console.log( "ready!" );

	// The keyboard events
	KeyboardEvents.ready();

	// render the table
	Editor.render("#table");

	// Render
	Overlay.render();

	if (Overlay.isOpen()){
		KeyboardEvents.default(Overlay.handleEvent);
	} else {
		KeyboardEvents.default(Editor.handleEvent);
	}
	
	// T
	KeyboardEvents.shorcut(84,false,function(){
		if (Overlay.switch()){
			KeyboardEvents.default(Overlay.handleEvent);
		} else {
			KeyboardEvents.default(Editor.handleEvent);
		}
	});	

	KeyboardEvents.shorcut(67,false,function(){ // C
		console.info("Consolidated view");
		
		$("#container-table").hide();
		ConsolidatedView.render("#container-consolidated-view","ep");		
		$("#container-consolidated-view").fadeIn();
		
	});

	KeyboardEvents.shorcut(86,false,function(){ //V
		console.info("Consolidated view");
		
		$("#container-table").hide();
		ConsolidatedView.render("#container-consolidated-view","ceu");		
		$("#container-consolidated-view").fadeIn();
		
	});

	KeyboardEvents.shorcut(66,false,function(){ //B
		console.info("Consolidated view");
		
		$("#container-table").hide();
		ConsolidatedView.render("#container-consolidated-view","agreement");		
		$("#container-consolidated-view").fadeIn();
		
	});

	KeyboardEvents.shorcut(69,false,function(){ //E
		console.info("Editor view");

		$("#container-consolidated-view").hide();
		$("#container-table").fadeIn();
		// Editor.render("#table");
	});

	// $('#example').DataTable();
});
