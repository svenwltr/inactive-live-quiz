
import logging

from websocket import QuizWebSocket

from validator import Validator


class Quiz(object):

    def __init__(self):
        self.startup_events = {}

    
    def recv(self, ws, event, data):
        mname = "on_%s" % event.replace('.', '_')
        
        logging.debug("Event: %s, %r" % (event, data))
        
        if hasattr(self, mname):
            method = getattr(self, mname)
            method(ws, data)
    
    
    def on_session_ready(self, ws, data):
        for event, data in self.startup_events.items():
            ws.send(event, data)
    
    
    def on_setup_form_update(self, ws, data):
        teams = [t for t in data['teams'] if t] # remove empty ones
        teams.sort()
        
        QuizWebSocket.send_all("data.team_update", teams)
        self.startup_events["data.team_update"] = teams

        
        validator = Validator(data)

        validator.require("title", 1001)
        validator.require("mode", 1002)
        validator.require("catalog", 1003)
        validator.require("questions", 1004)
  
        ws.send("setup.form_validation", list(validator.errors))







quiz = Quiz()
