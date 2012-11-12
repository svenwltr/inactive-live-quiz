quiz.event = (new function()
{
	var module = {};
	
	var events = {
		
	};
	
	module.register = function(name, func)
	{
		if(events[name] == undefined)
		{
			events[name] = new Array();
		}
		events[name].push(func);
	};
	
	module.unregister = function(name, ident)
	{
		
	};
	
	module.trigger = function(name, data)
	{
		console.log("Trigger: " + name);
		e = {
			name: name,
			data: data,
		}
		
		if(events[name] == undefined) {
			return;
		}
		
		for (var i = 0; i < events[name].length; i++) {
		    cb = events[name][i];
		    cb(e);
		}
	};
	
	
	return module;
}());


quiz.event.ready = (new function(){
	var required = {
		loader: false,
		dom: false,
		socket: false,
	};
	
	var callback = function(name){
		required[name] = true
		
		if(required.loader && required.dom && required.socket) {
			quiz.event.trigger("ready"); 
		};
	};
	
	quiz.event.register("loader_done", function(e){
		callback("loader");
	});
	
	quiz.event.register("socket_open", function(e){
		callback("socket");
	});
	
	$(document).ready(function() {
		callback("dom");
	});
	
	return {};
}());




