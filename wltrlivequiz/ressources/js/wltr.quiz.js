/**
 * Entry script.
 * 
 * This is the enty script for this application. It loads all required .js
 * files from the web server.
 * 
 * This script could be replaced with a minified version of the other script
 * files, later.
 * 
 * 
 * @author: Sven Walter <sven.walter@wltr.eu>
 * @since: 14 Nov 2012
 * @url: https://github.com/svenwltr/wltr-live-quiz
 * 
 * @todo: Speed up, loading text (i.e. load css dynamicly)!
 * 
 */

var loading_queue = [
    "js/jquery-1.8.2.min.js",
    "js/wltr.quiz.base.js",
    "js/wltr.quiz.event.js",
    "js/wltr.quiz.tabs.js",
    "js/wltr.quiz.document.js",
    "js/wltr.quiz.socket.js",
];

function require(url, callback){
	/* from http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/ */
	var script = document.createElement("script")
	script.type = "text/javascript";
	
	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" || script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others
		script.onload = function(){
			callback();
		};
	}
	
	script.src = url + "?v=" + new Date().getTime();
	document.getElementsByTagName("head")[0].appendChild(script);
}

function load() {
	var url = loading_queue.shift();
	
	if(url == undefined) {
		quiz.event.ready.done("scripts");
	} else {
		require(url, load);
	}
}

load();