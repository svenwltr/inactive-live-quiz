

function require(name) {
	var url = "js/wltr.quiz." + name + ".js";
	
	$.ajax({
		  url: url,
		  dataType: "script",
		  async: false,
	});
}

setTimeout(function(){
	require("base");
	require("event");
	require("loader");
	require("document");
	require("socket");
},1);