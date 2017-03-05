/**
 * The Editor main class
 *
 * - The entry point is the render 
 */
'use strict';
<% var currentName="Editor"; %>
<%- include('./snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

var Store = require('./Store');

var SINGLETON={};


SINGLETON.render=function(_element,column){

	if (!column){
		return ;
	}

	var el=$(_element);

	if (el.length<=0){
		return ;		
	}

	var html="";
	Store.iterate(function(index,row){
		var value=row[column];

		if (value && $.isArray(value)) {
			var ret="";
			value.forEach(function(part){
				// green for additions, red for deletions
				// grey for common parts
				var color = part.added ? 'green' :
					part.removed ? 'red' : 'grey';
				
				ret+='<span style="color:'+color+'">'+part.value+'</span>';
			});
			html+="<p>"+ret+"</p>";
		} else if (value){
			html+="<p>"+value+"</p>";
		} else {
			html+="<p>"+row["ep"]+"</p>";
		}
	});

	if (html){
		el.html(html);
	}
	
};


module.exports=SINGLETON;
