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


quiz.tabs = (new function()
{
	var module = {};

	var jqXHRs = [];
	module.tabs = $();
	
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
				module.tabs = module.tabs.add(tab);
			}));
		})();
	};
	
	$.when.apply(null, jqXHRs).then(function(){
		quiz.event.trigger("tabs_done");
	})
	
	module.show = function(name) {
		module.tabs.hide();
		module.tabs.filter("[tab="+name+"]").show();
	}
	
	return module;
}());