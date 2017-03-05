/**
 * This SINGLETON store the application document tree and manipulate it.
 * 
 */
'use strict';
<% var currentName="Tree"; %>
<%- include('./snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>


var GP = require('./GlobalProperties');
var $ = require('jquery');

var SINGLETON={};

var root=null;


//
// Tree leaf example
//
// {
// 	"level":0,
// 	"parent":null,
// 	"childs":[],
// 	"title":"This is the title",
// 	"cell":id
//
// }];
//
//
// The cell Id is unique
//

/**
 * this create a leaf, low level
 */
function createLeaf(level,parent,title,cell){
	return {
		level:level,
		parent:parent,
		title:title,
		cell:cell,
		childs:[]
	};
}

/**
 * Getin automatly the title from the node level in the tree
 * and the order into the parent
 */
function getTitle(level,order){
	if (level === 0){
		return GP.get("DEFAULT_TABLE_TITLE","");
	} else if (level === 1){
		return " Artlcle "+order;
	} else if (level === 2){
		return "  "+String.fromCharCode("A"+order);
	} else if (level === 3){
		return String.fromCharCode("a"+order);
	} else {
		return "("+level+","+order+")" ;		
	}
}

/**
 * This generate automalty the title using the parent and 
 * assuming the this will be the new last child
 */
function getTitleFromParent(parent){
	if (!parent){
		return "";
	} else {
		var level=parent.level+1;
		var order=parent.childs.length+1;

		return getTitle(level,order);
	}
}

/**
 * This add a new cell into the parent. The new created node
 * will be the last child of the root.
 */
function addChild(root,cell){
	if (!root){
		return;
	} else {
		root.childs.push(createLeaf(root.level+1,
									root,
									getTitleFromParent(root),
									cell
								   ));
	}
}

function iteratePreOrder(root,f){
	if (root){
		var ret=f(root);

		if (ret){
			return ret;
		} else {
			$.each(root.childs,function(index,child){
				ret=iteratePreOrder(child,f);

				if (ret){
					return ret;
				}
			});
		}
	}
}

/**
 * This create a new tree using an array of data
 */
SINGLETON.newTree=function(data,title){
	if (!data || !$.isArray(data)){
		return ;
	} else {
		root=createLeaf(0,null,(title)?title:GP.get("DEFAULT_TABLE_TITLE",""),null);

		$.each(data,function(index,element){
			// Ussing the Id ?
			addChild(root,element);
		});
	}
};

/**
 * Tree iterate from top to down from First to last child.
 * Root node always first.
 * The current node is passed to the iterator function f. If this function return differnt
 * from null or undefined the iteration stop and the value is returned.
 */
SINGLETON.iteratePreOrder=function(f){
	if ($.isFunction(f) && root){
		return iteratePreOrder(root,f);
	}
	
};


module.exports=SINGLETON;
