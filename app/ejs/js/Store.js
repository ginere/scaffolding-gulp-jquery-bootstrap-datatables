/**
 * This is the Store for the editor. Contains the busines logic
 */
'use strict';
<% var currentName="Editor"; %>
<%- include('./snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

var Tree = require('./Tree');

var SINGLETON={};

//
// Cell Data Example.
//
// var data=[{
// 	"id":1,
// 	"ec":"text1",
// 	"ep":"text2",
// 	"ceu":"text3",
// 	"agreement":"text4"
//
// }];
//
//
// The cell Id is unique
//

var data=[];

SINGLETON.inserDataLoaded=function(_data){
	if (_data && $.isArray(_data)){
		data=_data;
		Tree.newTree(data,"Nuevo Documento");
	}
	return data;
};

SINGLETON.updateCell=function(){
	
};

/**
 * Iterate on all the lements on the cell. If the f return not null,
 * Stops the iteration and returns the value.
 */
SINGLETON.iterate=function(f){
	if ($.isFunction(f) && data.length > 0){
		var i=0;
		var ret=null;
		
		for (i=0;i<data.length;i++){
			var element=data[i];

			ret=f(i,element);

			if (ret){
				console.info("Iteration breaked by client in index:"+i);
				continue;
			}
		}

		return ret;		
	}
};

/**
 * Tree iterate from top to down from First to last child.
 * Root node always first.
 * The current node is passed to the iterator function f. If this function return differnt
 * from null or undefined the iteration stop and the value is returned.
 */
SINGLETON.treeIterate=function(f){
	return Tree.iteratePreOrder(f);
};


module.exports=SINGLETON;
