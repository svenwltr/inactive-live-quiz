

quiz.socket = (new function(){
	var module = {};
	
	var URI = 'ws://localhost:8080/ws';
	
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