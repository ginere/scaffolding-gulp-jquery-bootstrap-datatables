/**
 * The Editor main class
 *
 * - The entry point is the render 
 */
'use strict';
<% var currentName="Editor"; %>
<%- include('./snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

var KeyboardEvents=require('./KeyboardEvents');
var Viewport=require('./Viewport');

var SINGLETON={};

var el;
var table;
var Viewport;

// var DEFAULT_DT_CONFIG={
// 	// ~/projects/ppms/wireframe/src/js/lib/page.js
// 	// http://datatables.net/manual/i18n
// 	language: {
// 		search: ppms.label.filter,
// 		"processing": "Hang on. Waiting for response...",
// 		"loadingRecords":   "Loading...  .."
// 	}
// 	, stateSave: true
// 	, buttons: [{
// 		extend:    'colvis'
// 		, text:      '<i class="fa fa-eye"></i> View'
// 		, titleAttr: 'Column Visibility'
// 		, columns:'.column-toggle'
// 		, postfixButtons: [ 'colvisRestore' ]
// 		/*
// 				},{
// 					extend:    'copyHtml5'
// 					, text:      '<i class="fa fa-files-o"></i> Copy'
// 					, titleAttr: 'Copy to clipboard'
// 					, exportOptions: {
// 						columns: ':visible'												
// 					}
// 					, altAction:getServerExportCB()
// 		*/
// 	},{
// 		extend:    'excelHtml5'
// 		, text:      '<i class="fa fa-file-excel-o"></i> Excel'
// 		, titleAttr: 'Export Excel'
// 		, exportOptions: {
// 			columns: ':visible'
// 		}
// 		, altAction:getServerExportCB()
// 	},{
// 		extend:    'print'
// 		, text:      '<i class="fa fa-print"></i> Print'
// 		, titleAttr: 'Print page'					
// 		, exportOptions: {
// 			columns: ':visible'
// 		}
// 	}]
// 	,"dom":  'B<"#table-header" f >t <i> <l> <p>' // https://datatables.net/reference/option/dom
// 	, colReorder: true
// 	,"order": [[ 0, "asc" ]]
// 	, iDisplayLength: ppms.prop.iDisplayLength
// 	, "lengthMenu": [[10, 25, 50, 100, 1000, -1], [10, 25, 50, 100, 1000, "All"]]
// 	, reponsive:true
// 	, "deferRender": true	
//}

// see // 	// ~/projects/ppms/wireframe/src/js/lib/page.js
function checkServerJsonData(json,url){
	return json;
}

function loadData(){
	return {
		url:"./data/doc1.json",
		cache:false,
		"dataSrc":function(json){
			return checkServerJsonData(json);
		}
	};	
}

function changePage(forward){
	// https://datatables.net/reference/api/page.info()
	// https://datatables.net/reference/api/page()
	var pageinfo=table.page.info();
	var pages=pageinfo.pages;
	var current=pageinfo.page;
	var nextPage;

	if (forward){
		if (current>=(pages-1)){
			nextPage=0;
		} else {
			nextPage=current+1;					
		}
	} else {
		if (current<=0){
			nextPage=pages-1;					
		} else {
			nextPage=current-1;
		}
	}
	table.page(nextPage).draw(false);
}

function changeSelection(forward){
	debugger;
	var jTable=$(el);
	var listSelected=jTable.find("tr.selected");
	
	if (listSelected.length === 0) {
		// none selected, select the first or the last
		if (forward) { // Select the first element that is the second row. The first row is the header.
			jTable.find("tr:eq(1)").toggleClass('selected');
			
			Viewport.scrollToElement(jTable.find("tr:eq(1)"));
			
		} else { // select the last elemnt
			jTable.find("tr:last").toggleClass('selected');
			Viewport.scrollToElement(jTable.find("tr:last"));
		}
	} else {
		if (forward) {
			var next=listSelected.next();
			if (next.length === 0) {
				next=jTable.find("tr:eq(1)");
			}
			next.toggleClass('selected');
			Viewport.scrollToElement(next);
		} else {
			var prev=listSelected.prev();
			
			if (prev.length === 0) {
				prev=jTable.find("tr:last");
			}
			prev.toggleClass('selected');
			Viewport.scrollToElement(prev);
		}
		
		listSelected.toggleClass('selected');
	}
}

function editCell(data,row,tr,td){
	var editor=$("#editor");

	if ($.contains( td, editor[0] )){
		return ;
	}

	var text=$(td).text();
	var height = $(td).height();
	var width = $(td).width();

	if (editor.length>0){
		editor.parent().text(editor.val());
	}
	$(td).html("<textarea id='editor'></textarea>");

	// reload the newly created editor
	editor=$("#editor");
	editor.val(text);
	
    editor.css({'width':width,'height': height});
	editor.focus();
}

function closeCellEditor(){
	var editor=$("#editor");
	if (editor.length>0){
		editor.parent().text(editor.val());
	}
}

function tableClickEventhadler(event) {
	// var td=this;
	// event.target

	var td=event.currentTarget;
	var tr = $(this).closest('tr');
	var row=table.row( tr );
	var data=row.data();
						
	editCell(data,row,tr,td);
}


function searchKeySelection(event){
	var focused = $(':focus');
	var search=$('input[type="search"]');
	
	if (focused.get(0) === search.get(0)){
		console.info("Blur");
		search.blur();
	} else {
		console.info("Focus");
		search.focus();
	}

	event.preventDefault();
	event.stopPropagation();
}


function previousSelection(event){
	changeSelection(false);
	event.preventDefault();
}

function nextSelection(event){
	changeSelection(true);
	event.preventDefault();
}

function nextPage(event){
	changePage(true);
	event.preventDefault();
}

function previousPage(event){
	changePage(false);
	event.preventDefault();
}


function setupEventHandlers(){
	KeyboardEvents.shorcut(37,false,previousPage);
	KeyboardEvents.shorcut(39,false,nextPage);
	
	KeyboardEvents.shorcut(38,false,previousSelection);
	KeyboardEvents.shorcut(40,false,nextSelection);

	KeyboardEvents.shorcut(27,false,closeCellEditor); // ESC
	KeyboardEvents.shorcut(70,false,searchKeySelection); // F 

	// te problem are child tables of this current tables...
	// $("table.dataTable > tbody > tr > td").off("click"); 
	// $(document).on("click","table.dataTable > tbody > tr > td",tableClickEventhadler); 
	// $("table.dataTable > tbody > tr > td").click(tableClickEventhadler); 

	$("table.dataTable").delegate("td","click",tableClickEventhadler); 
	

//	$("table.dataTable > tbody > tr > td > textarea").click(tableClickEventhadler); 

}

function initTable(_table){
	table=_table;

	setupEventHandlers();	
}


SINGLETON.render=function(_element){
	el=$(_element);
	Viewport=new Viewport();

	el.on( 'error.dt', function ( e, settings, techNote, message ) {
		debugger;
        console.log( 'An error has been reported by DataTables: ', message );
    } ).DataTable({
		"columns": [{ 
			"data":"id",
			"className":"dt-right",
			"width": "1%",
			"type": "num",
			"searchable":true,
			"visible":true 			
		},{
			"data":"ec",
			"type": "string",
			"searchable":true,
			"orderable":false,
			"width": "25%",
			"className":"dt-left",
		},{
			"data":"ep",
			"type": "string",
			"searchable":true,
			"orderable":false,
			"width": "25%",
			"className":"dt-left",
		},{
			"data":"ceu",
			"type": "string",
			"searchable":true,
			"orderable":false,
			"width": "25%",
			"className":"dt-left",
		},{
			"data":"agreement",
			"type": "string",
			"searchable":true,
			"orderable":false,
			"width": "24%",
			"className":"dt-left",
		}]			
		,"order": [[ 0, "asc" ]]
		// https://datatables.net/reference/option/dom
		// ,"dom":  'B<"#table-header" f >t <i> <l> <p>'
		// , "dom": 'lrtip'
		// , "dom": '<"wrapper"flipt>'
		// , "dom": '<lf<t>ip>'
		// , "dom": '<"top"i>rt<"bottom"flp><"clear">'
		, "dom": "<'#table-header'>" +
			"<'row'<'col-sm-3'l><'col-sm-3'i><'col-sm-3'p><'col-sm-3'f>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-5'i><'col-sm-7'p>>"

		, colReorder: true
		, reponsive:true
		, iDisplayLength: 10
 		, "lengthMenu": [[10, 25, 50, 100, 1000, -1], [10, 25, 50, 100, 1000, "All"]]

		,"initComplete": function () {
			$("#table-header").append($("#table-header-template").html());

			var _table = this.api();

			initTable(_table);

		}
		,ajax:loadData()

	});	
};


module.exports=SINGLETON;


