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
	
	var registered_events = {};
	
	var parse_eventname = function(event) {
		var local;
		var remote;
		
		if(event.substr(0,6) == "local:") {
			local = true;
			remote = false;
			event = event.substr(6);
			
		} else if(event.substr(0,7) == "remote:") {
			local = false;
			remote = true;
			event = event.substr(7);
			
		} else {
			local = true;
			remote = true;
		}
		
		return {
			'event': event,
			'local': local,
			'remote': remote,
		}
	}
	
	module.register = function(eventname, cb)
	{
		e = parse_eventname(eventname);
		
		if(registered_events[e.event] == undefined)
			registered_events[e.event] = new Array();
		
		registered_events[e.event].push({
			'callback': cb,
			'remote': e.remote,
			'local': e.local
		});
	};
	
	module.unregister = function(eventname, ident)
	{
		/* TODO */
	};
	
	module.trigger = function(eventname, data)
	{
		console.log("Trigger: " + eventname, data);
		
		e = parse_eventname(eventname);
		
		if(e.remote == true) {
			quiz.socket.send(e.event, data);
		}

		if(e.local == true) {
			try {
				for (var i = 0; i < registered_events[e.event].length; i++) {
				    r = registered_events[e.event][i];
				    r.callback(e.event, data);
				}
			}
			/* Must catch error if events[e.event] is undefined. Typecheck
			 * doesn't work and I don't know why :-@ ... or I am too stupid! */
			catch(err){ }
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




