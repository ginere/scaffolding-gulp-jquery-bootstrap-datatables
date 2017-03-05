/**
 * This contains the 4 columns editor
 *
 * - The entry point is the render 
 */
'use strict';
<% var currentName="TrilogueEvents"; %>
<%- include('./snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var SINGLETON={};

SINGLETON.ROW_SELECTEC_EVENT="row-selected";

SINGLETON.fireRowSelected(){

	$( document ).trigger( "myCustomEvent", [ "bim", "baz" ] );
	
}


// $( document ).on( "myCustomEvent", {
//     foo: "bar"
// }, function( event, arg1, arg2 ) {
//     console.log( event.data.foo ); // "bar"
//     console.log( arg1 );           // "bim"
//     console.log( arg2 );           // "baz"
// });
// 
// $( document ).trigger( "myCustomEvent", [ "bim", "baz" ] );


module.exports=SINGLETON;
