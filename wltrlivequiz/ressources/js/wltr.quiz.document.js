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
	
	/**
	 * public: .set_title(text)
	 */
	module.set_title = function(text) {
		document.title = quiz.c.TITLE + text;
	}
	
	/**
	 * public: .set_body(html)
	 */
	module.set_body = function(html) {
		$("#body").fadeOut(quiz.c.FADE_SPEED, function(){
			$("#body").html(html);
			$("#body").fadeIn(quiz.c.FADE_SPEED);
		});
	}
	
	/**
	 * public: .set_tab(name)
	 */
	module.set_tab = function(name) {
		quiz.document[name].activate();

		$("a").removeClass("active");
		$("a[href=#"+name+"]").addClass("active");
		
		quiz.event.trigger("set_tab", {"name": name});
	}
	
	/**
	 * listener: click on tab links
	 */
	$("a").live("click", function(e){
		elem = $(this);
		href = $(this).attr("href");
		tab = href.substr(1);
		
		module.set_tab(tab);
	});
	
	/**
	 * listener: on ready, open first tab
	 */
	quiz.event.register("ready", function(){
		hash = window.location.hash.slice(1)
		if(!hash)
			hash = "display";
		$(".overlay").fadeOut(quiz.c.FADE_SPEED, function(){
			$(".overlay").remove();
		});
		quiz.document.set_tab(hash);
	});
	
	/**
	 * init module
	 */
	module.set_title("Loading");
	
	/* END */
	return module;
}());


/**
 * quiz.document.overlay
 */
quiz.document.overlay = (new function(){
	
	/**
	 * private: get_overlay_tpl() - Creates a new overlay template. quiz.templates
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
	quiz.event.register("error", function(event, data){
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
		quiz.document.set_body(quiz.templates.get("prepare"));
		quiz.document.set_title("warte");
		
	};
	
	
	quiz.event.register("ws_setup_teamupdate", function(event, data){
		
		var ul = $("<ul>");
		
		for (var i=0;i<data.length;i++) {
			var li = $("<li>");
			li.text(data[i]);
			ul.append(li);
		};
		
		$("#prepare-teams ul").remove();
		$("#prepare-teams").append(ul);
		
		if(data.length==0)
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
		quiz.document.set_body(quiz.templates.get("settings"));
		quiz.document.set_title("Moderator");
	};
	
	/* END */
	return module;
}());


quiz.document.moderator.setup = (new function(){
	
	var FORM_INPUTS = "#settings-form input, #settings-form select";
	var FORM = "#settings-form";
	
	
	var validate_form = function()
	{
		quiz.socket.send("setup_validate", quiz.utils.get_form_data(FORM));
	}
	
	var submit_form = function()
	{
		quiz.socket.send("setup_submit", quiz.utils.get_form_data(FORM));
	}
	
	$(FORM).live('submit', function(){
		submit_form();
		return false;
	});
	
	$(FORM_INPUTS).live("blur", function(){
		validate_form();
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

