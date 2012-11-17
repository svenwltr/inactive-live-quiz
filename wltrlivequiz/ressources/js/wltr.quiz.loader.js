/**
 * Template loader.
 * 
 * Loads all templates, for later use.
 * 
 * 
 * @author: Sven Walter <sven.walter@wltr.eu>
 * @since: 14 Nov 2012
 * @url: https://github.com/svenwltr/wltr-live-quiz
 * 
 */


quiz.loader = (new function()
{
	var module = {};

	var jqXHRs = [];
	var templates = new Array();
	
	/* load templates */
	for(i in quiz.c.TEMPLATES)
	{
		(function(){ /* avoid closure */
			var name = quiz.c.TEMPLATES[i]
			jqXHRs.push($.get("templates/" + name + ".html", function(data){
				templates[name] = data;
			}));
		})();
	};
	
	$.when.apply(null, jqXHRs).then(function(){
		quiz.event.trigger("loader_done");
	})
	
	module.get = function(name) {
		return templates[name];
	}
	
	return module;
}());