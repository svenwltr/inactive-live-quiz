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
	TEMPLATES: ["display_wait", "moderator"],
	TITLE: "wltr Live Quiz :: ",
	FADE_SPEED: 200,
	WEBSOCKET: 'ws://localhost:8080/ws',

}
