/**
 * Viewport
 *
 */
'use strict';


/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false */

var $ = require('jquery');

var SINGLETON=function () {
	var top,left,bottom,right,width,height;
	
	function init(){
		var win=$(window);
		if (win){
			top = win.scrollTop();
			left = win.scrollLeft();
			
			height=win.height();
			
			width=win.width();
			
			bottom = top + height;
			right = left + width;
		}
	}
	
	init();

	return {
		// this update the data related to the croll etc ...				
		updateViewportInformation:function(){
			init();
		},
		// this update the data related to the croll etc ...				
		scrollToElement:function(el){
			init();
			var distance=this.getVerticalScroll(el);

			if (distance === 0) {
				return ;
			} else {
				// log.debug("WIN SCROL:"+$(window).scrollTop());
				// execute the scroll
				$('html, body').animate({
					scrollTop: top+distance
				}, 200);						
			}
		},
		// returns true if the element is INSIDE the view port
		containsElement:function(el){
			if (el){
				var e=$(el);
				var offset = e.offset();
				var etop=offset.top;
				var eleft=offset.left;
				
				if ( etop < top ||						 
					 eleft < left ||
					 (etop+e[0].offsetHeight) > bottom ||						 
					 (eleft+e[0].offsetWidth) > right ){
					
					return false;
				} else {
					return true;
				}						 
			} else {
				return false;
			}
		},
		// if this retuns 0 the element is inside the scroll and dont have to be scrolled
		getVerticalScroll:function(el){
			if (el){
				var e=$(el);
				var offset = e.offset();
				var etop=offset.top;
				var eHight=e[0].offsetHeight;
				/*
				  log.info( "etop:"+etop+
				  " top:"+top+
				  " elbot:"+(etop+eHight)+
				  " bottom:"+bottom+
				  "");
				*/
				if ( etop < top ||						 
					 (etop+eHight) > bottom){
					
					// element center
					var ec=etop+(eHight/2);
					// window Center
					var wc=top+(height/2);
					
					var scrollDistance=(ec-wc);

					// log.info( "scrool distance:"+scrollDistance);

					return scrollDistance;
				} else {
					return 0;
				}						 
			} else {
				return 0;
			}
		},
		checkPosition:function(delta,ctop,cleft){
			return (Math.abs(top-ctop)>delta || Math.abs(left-cleft)>delta);
		},
		checkSize:function(delta,cwidth,cheight){
			return (Math.abs(width-cwidth)>delta || Math.abs(height-cheight)>delta);
		},
		// this return true if some part of the view port has changed
		// a delta num of pixels.
		hasDelta:function(delta,viewport){
			if (viewport.checkPosition(delta,top,left)){
				return true;
			} else if (viewport.checkSize(delta,width,height)){
				return true;
			} else {
				return false;
			}					
		},
		toString:function(){
			var ret="[t:"+top+
				",b:"+bottom+
				",l:"+left+
				",r:"+right+
				"][h:"+height+
				",w:"+width+
				"]";
			
			return ret;
		}
	};
};

module.exports=SINGLETON;
