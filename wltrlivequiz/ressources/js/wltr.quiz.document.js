quiz.document = (new function(){
	var module = {};
	
	module.set_title = function(text) {
		document.title = quiz.c.TITLE + text;
	}
	
	module.set_body = function(html) {
		$("#body").fadeOut(quiz.c.FADE_SPEED, function(){
			$("#body").html(html);
			$("#body").fadeIn(quiz.c.FADE_SPEED);
		});
	}
	
	module.set_tab = function(name) {
		$(".overlay").fadeOut(quiz.c.FADE_SPEED, function(){
			$(".overlay").remove();
		});
		quiz.document[name].activate();

		$("a").removeClass("active");
		$("a[href=#"+name+"]").addClass("active");

	}
	
	$("a").live("click", function(e){
		elem = $(this);
		href = $(this).attr("href");
		tab = href.substr(1);
		
		module.set_tab(tab);
	});
	
	
	module.set_title("Loading");
	
	quiz.event.register("ready", function(){
		quiz.document.set_tab("display");
	});
	
	return module;
}());


quiz.document.overlay = (new function(){
	
	var get_overlay_tpl = function() {
		tpl = $("<div><div><h1></h1><p></p></div></div>");
		tpl.addClass('overlay');
		
		return tpl;
	}
	
	var get_error_tpl = function() {
		tpl = get_overlay_tpl();
		tpl.addClass("overlay-error");
		
		return tpl;
	}
	
	quiz.event.register("error", function(e){
		tpl = get_error_tpl();
		tpl.find("h1").text(e.data.title);
		tpl.find("p").text(e.data.text);
		quiz.document.set_body(tpl);
	});
	
	return {};
}());


quiz.document.display = (new function(){
	var module = {};
	
	module.activate = function() {
		quiz.document.set_body(quiz.loader.get("display_wait"));
		quiz.document.set_title("warte");
		
		$("#head").css("opacity", "0.1");
		
		$("#head").hover(function(){
			$("#head").animate({"opacity": "1"}, quiz.c.FADE_SPEED);
		}, function(){
			$("#head").animate({"opacity": "0.1"}, quiz.c.FADE_SPEED);
		});
	}
	
	return module;
}());