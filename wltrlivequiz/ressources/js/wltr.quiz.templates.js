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


quiz.templates = (new function()
{
	var module = {};

	var jqXHRs = [];
	module.templates = $();
	
	/* load templates */
	for(i in quiz.c.TEMPLATES)
	{
		(function(){ /* avoid closure */
			var name = quiz.c.TEMPLATES[i]
			jqXHRs.push($.get("templates/" + name + ".html", function(data){
				tab = $("<div>");
				tab.addClass("tab");
				tab.attr("tab", name);
				tab.html(data);
				tab.hide();
				$("#body").append(tab);
				module.templates = module.templates.add(tab);
			}));
		})();
	};
	
	$.when.apply(null, jqXHRs).then(function(){
		quiz.event.trigger("templates_done");
	})
	
	module.show = function(name) {
		module.templates.hide();
		module.templates.filter("[tab="+name+"]").show();
	}
	
	return module;
}());