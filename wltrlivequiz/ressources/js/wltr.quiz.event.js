/**
 * Event dispatcher.
 * 
 * This module 'quiz.event' provides the event dispatcher for this application.
 * All communication within this app are handled through events, which are
 * handled here. There are three important functions:
 * 
 *  - quiz.event.register(event, func);
 *      Registers a new callback for a certain 'event' (string). Every time an
 *      event is triggered, all registered callbacks will be called with an
 *      event object as argument.
 *      
 *  - quiz.event.unregister(event, ident);
 *      TODO
 *   
 *  - quiz.event.trigger(event);
 *      Triggers a certain event (string). Everybody can trigger every event
 *      and then all registered callbacks will be called.
 * 
 * The module also take care about the conditions for the 'ready' event.
 * 
 * 
 * @author: Sven Walter <sven.walter@wltr.eu>
 * @since: 14 Nov 2012
 * @url: https://github.com/svenwltr/wltr-live-quiz
 * 
 */


quiz.event = (new function()
{
	var module = {};
	
	var events = {
		
	};
	
	module.register = function(event, func)
	{
		if(events[event] == undefined)
		{
			events[event] = new Array();
		}
		events[event].push(func);
	};
	
	module.unregister = function(event, ident)
	{
		
	};
	
	module.trigger = function(event, data, send)
	{
		console.log("Trigger: " + event, data, send);
		
		if(send) {
			quiz.socket.send(event, data);
		}

		if(events[event] == undefined) {
			return;
		}
		
		for (var i = 0; i < events[event].length; i++) {
		    cb = events[event][i];
		    cb(event, data);
		}
		
	};
	
	
	return module;
}());


quiz.event.ready = (new function(){
	var required = {
		tabs: false,
		dom: false,
		socket: false,
	};
	
	var callback = function(name){
		required[name] = true
		
		if(required.tabs && required.dom && required.socket) {
			quiz.event.trigger("session.ready"); 
		};
	};
	
	quiz.event.register("session.tabs_loaded", function(e){
		callback("tabs");
	});
	
	quiz.event.register("session.socket_open", function(e){
		callback("socket");
	});
	
	$(document).ready(function() {
		callback("dom");
	});
	
	return {};
}());




