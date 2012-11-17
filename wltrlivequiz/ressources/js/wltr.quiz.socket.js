/**
 * Websocket handler.
 * 
 * Opens the socket to the server and handles all requests.
 * 
 * 
 * @author: Sven Walter <sven.walter@wltr.eu>
 * @since: 14 Nov 2012
 * @url: https://github.com/svenwltr/wltr-live-quiz
 * 
 */


quiz.socket = (new function(){
	var module = {};
	
	var URI = quiz.c.WEBSOCKET;
	
	var socket;
	
	
	var onopen = function () {
		quiz.event.trigger("socket_open");
	};
	

	var onerror = function (error) {
		quiz.event.trigger("error", {
			title: "WebSocket-Fehler",
			text: "Die Verbindung zum Webserver ging verloren. Bitte versuchen Sie es erneut.",
		});
	};

	
	var onmessage = function (e) {
	};
	
	
	var onclose = function(e) {
	}

	
	var open = function()
	{
		socket = new WebSocket(URI);
		socket.onopen = onopen;
		socket.onerror = onerror;
		socket.onmessage = onmessage;
		socket.onclose = onclose;
	}
	
	open();
	
	
	
	return module;	
}());