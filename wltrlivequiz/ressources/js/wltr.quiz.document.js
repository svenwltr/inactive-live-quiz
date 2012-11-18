/**
 * Document manipulation.
 * 
 * This modules handles manipulation of the DOM. The pages are organized into
 * several tabs, which use several templates.
 * 
 *  - 'quiz.document'
 *      Is the module for accessing the document.
 *      
 *  - 'quiz.document.*'
 *      These are the tabs.
 *  
 * 
 * @author: Sven Walter <sven.walter@wltr.eu>
 * @since: 14 Nov 2012
 * @url: https://github.com/svenwltr/wltr-live-quiz
 * 
 */


/**
 * quiz.document
 */
quiz.document = (new function(){
	var module = {};
	
	module.set_page = function(page) {
		module[page].activate();

		$("a").removeClass("active");
		$("a[href=#"+name+"]").addClass("active");
		quiz.event.trigger("session.set_page", name);
	}
	
	/**
	 * public: .set_tab(name)
	 */
	/*module.set_tab = function(name) {
		quiz.event.trigger("session.set_tab", name);
	}*/
	
	/**
	 * listener: click on tab links
	 */
	$("a").live("click", function(e){
		elem = $(this);
		href = $(this).attr("href");
		name = href.substr(1);
		
		module.set_page(name);
	});
	
	/**
	 * listener: on ready, open first tab
	 */
	quiz.event.register("session.ready", function(){
		hash = window.location.hash.slice(1)
		if(!hash)
			hash = "display";
		$(".overlay").fadeOut(quiz.c.FADE_SPEED, function(){
			$(".overlay").remove();
		});
		
		module.set_page(hash);
	});
	
	/**
	 * init module
	 */
	
	/* END */
	return module;
}());


/**
 * quiz.document.overlay
 */
quiz.document.overlay = (new function(){
	
	/**
	 * private: get_overlay_tpl() - Creates a new overlay template. quiz.tabs
	 *     is not used, because it could throw errors.
	 */
	var get_overlay_tpl = function() {
		tpl = $("<div><div><h1></h1><p></p></div></div>");
		tpl.addClass('overlay');
		
		return tpl;
	}
	
	/**
	 * private: get_error_tpl()
	 */
	var get_error_tpl = function() {
		tpl = get_overlay_tpl();
		tpl.addClass("overlay-error");
		
		return tpl;
	}
	
	/**
	 * listener: on error, display it
	 */
	quiz.event.register("session.error", function(event, data){
		tpl = get_error_tpl();
		tpl.find("h1").text(data.title);
		tpl.find("p").text(data.text);
		quiz.document.set_body(tpl);
	});
	
	/* END */
	return {};
}());


/**
 * quiz.document.display
 */
quiz.document.display = (new function(){
	var module = {};
	
	/**
	 * public .activate() - Activates this tab.
	 */
	module.activate = function() {
		quiz.tabs.show("prepare");
		
	};
	
	
	quiz.event.register("setup.form_update", function(event, data){
		teams = data['teams'];
		var ul = $("<ul>");
		
		for (var i=0;i<teams.length;i++) {
			var li = $("<li>");
			li.text(teams[i]);
			ul.append(li);
		};
		
		$("#prepare-teams ul").remove();
		$("#prepare-teams").append(ul);
		
		if(teams.length==0)
			$("#prepare-teams").fadeOut();
		else
			$("#prepare-teams").fadeIn();
	});
	
	/* END */
	return module;
}());


quiz.document.moderator = (new function(){
	var module = {};
	
	/**
	 * public .activate() - Activates this tab.
	 */
	module.activate = function() {
		quiz.tabs.show("settings");
	};
	
	/* END */
	return module;
}());


quiz.document.moderator.setup = (new function(){
	
	var FORM_INPUTS = "#settings-form input, #settings-form select";
	var FORM = "#settings-form";
	
	var data = function() {
		return quiz.utils.get_form_data(FORM);
	}
	
	var form_update = function()
	{
		/* TODO delay sending */
		quiz.event.trigger("setup.form_update", data(), true);
	}
	
	var quiz_start = function()
	{
		quiz.event.trigger("setup.form_update", data(), true);
		quiz.event.trigger("setup.quiz_start", null, true);
	}
	
	$(FORM).live('submit', function(){
		quiz_start();
		return false;
	});
	
	$(FORM_INPUTS).live("keyup", function(){
		form_update();
	});
	
	$("#settings-form-specials input, #settings-form-teams input").live("keyup", function(){
		var row = $(this).parents(".row");
		//var inputs = row.find("input");
		var rows = row.siblings(".row").add(row);
		
		
		rows.each(function(){
			var row = $(this);
			var is_empty = true;
			var is_last = row.is(':last-child')
			
			row.find("input").each(function(){
				if($(this).val() != '')
					is_empty = false;
			});
			
			if(is_empty && !is_last) {
				row.remove();
			}

			if(is_last && !is_empty ) {
				var clone = row.clone();
				clone.hide();
				clone.find("input").each(function(){
					$(this).val("");
				});
				row.after(clone);
				clone.slideDown();
			}
		});
	});
}());

