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
	
	module.send = function(event, data)
	{
		var e = [ event, data ];
		socket.send(JSON.stringify(e));
	};
	

	
	var onopen = function () {
		quiz.event.ready.done("socket");
	};
	

	var onerror = function (error) {
		quiz.event.trigger("local:session.error", {
			title: "WebSocket-Fehler",
			text: "Die Verbindung zum Webserver ging verloren. Bitte versuchen Sie es erneut.",
		});
	};

	
	var onmessage = function (e) {
		var j = eval(e.data);
		var event = j[0];
		var data = j[1];
		
		quiz.event.socket_event(event, data);
	};
	
	
	var onclose = function(e) {
		quiz.event.trigger("local:session.error", {
			title: "WebSocket-Fehler",
			text: "Die Verbindung zum Webserver ging verloren. Bitte versuchen Sie es erneut.",
		});
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