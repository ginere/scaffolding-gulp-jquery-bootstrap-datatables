/**
 * THis display the document overlay, this means the document index
 *
 */
'use strict';
<% var currentName="Editor"; %>
<%- include('./snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

var SINGLETON={};

var Store = require('./Store');

var KeyboardEvents=require('./KeyboardEvents');
var Viewport=require('./Viewport');

var opened=false;
var viewport;

/**
 * Set the width of the side navigation to 250px and the left margin of the page content to 250px 
 */
function openNav() {
	
	var html="";


	Store.treeIterate(function(node){
		html+='<li class="list-group-item node-treeview4" data-nodeid="0" style="color:undefined;background-color:undefined;" data-cell="'+node.cell+'">'+node.title+'</li>';		
	});
	
	// Store.iterate(function(index,row){
	// 	var value=row["id"];
	//
	// 	if (value){
	// 		html+='<li class="list-group-item node-treeview4" data-nodeid="0" style="color:undefined;background-color:undefined;">Article '+index+'</li>';
	// 		// html+="<button class='btn btn-default'> Article "+value+". </button>";
	// 	}
	// });

	var el=$("#mySidenav");
	el.html('<ul class="list-group">'+
			html+
			'</ul>');
	
	el.css("width","200px");
	
    document.getElementById("main").style.marginLeft = "200px";
}

/**
 * Set the width of the side navigation to 0 and the left margin of the page content to 0 
 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function getSelected(){
	var jTable=$("#mySidenav");
	var listSelected=jTable.find("li.selected");
}

function getSelectedNode(){
	var selected=getSelected();

	if (selected){
		var cell=selected.data("cell");
		return Tree.getNode(cell);
	}
}

function changeSelection(forward){
	var jTable=$("#mySidenav");
	var listSelected=jTable.find("li.selected");
	
	if (listSelected.length === 0) {
		// none selected, select the first or the last
		if (forward) { // Select the first element that is the second row. The first row is the header.
			jTable.find("li:eq(1)").toggleClass('selected');
			
			debugger;
			viewport.scrollToElement(jTable.find("li:eq(1)"));
			
		} else { // select the last elemnt
			jTable.find("li:last").toggleClass('selected');
			viewport.scrollToElement(jTable.find("li:last"));
		}
	} else {
		if (forward) {
			var next=listSelected.next();
			if (next.length === 0) {
				next=jTable.find("li:eq(1)");
			}
			next.toggleClass('selected');
			viewport.scrollToElement(next);
		} else {
			var prev=listSelected.prev();
			
			if (prev.length === 0) {
				prev=jTable.find("li:last");
			}
			prev.toggleClass('selected');
			viewport.scrollToElement(prev);
		}
		
		listSelected.toggleClass('selected');
	}
}

function previousSelection(event){
	changeSelection(false);
	event.preventDefault();
}

function nextSelection(event){
	changeSelection(true);
	event.preventDefault();
}

function nodeUp(event){
	
	event.preventDefault();
}


SINGLETON.handleEvent=function(event){
	var code=event.which;
	switch(code){
	case 37:
		nodeUp(event);
		break;
	case 39:
		nodeDown(event);
		break;
	case 38:
		previousSelection(event);
		break;
	case 40:
		nextSelection(event);
		break;
	default:
		console.debug("Editor Key code:"+code);
		break;
	}
};

SINGLETON.close=function(){
	closeNav();
	opened=false;
};

SINGLETON.open=function(){
	openNav();
	opened=true;
};

SINGLETON.switch=function(){
	if (opened){
		SINGLETON.close();		
	} else {
		SINGLETON.open();
	}
	return opened;
};

SINGLETON.isOpen=function(){
	return opened;
};

SINGLETON.render=function(){
	viewport=new Viewport();	
};


module.exports=SINGLETON;
