/**
 * Base script
 * 
 * This script defines the only global var 'quiz' and the app constants in
 * 'quiz.c'.
 * 
 * 
 * @author: Sven Walter <sven.walter@wltr.eu>
 * @since: 14 Nov 2012
 * @url: https://github.com/svenwltr/wltr-live-quiz
 * 
 */


var quiz = {};


quiz.c = {
	TEMPLATES: ["prepare", "settings"],
	TITLE: "wltr Live Quiz :: ",
	FADE_SPEED: 0,
	WEBSOCKET: 'ws://localhost:8080/ws',
}



quiz.utils = {
	get_form_data : function(form) {
		var $form = $(form);
		var data = {};
		
		$.each($form.find("*[name]"), function() {
			var elem = $(this);
			var name = elem.attr('name');
			var value = elem.val();
			
			if(name.slice(-2) == "[]"){
				name = name.slice(0,-2);
				if(data[name] == undefined)
					data[name] = [];
				data[name].push(value);
			} else {
				data[name] = value;
			}
		});
		
		return data;
	}
}