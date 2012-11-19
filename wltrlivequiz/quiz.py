
import logging

from websocket import QuizWebSocket


class Quiz(object):
    
    def recv(self, ws, event, data):
        mname = "on_%s" % event.replace('.', '_')
        
        logging.debug("Event: %s, %r" % (event, data))
        
        if hasattr(self, mname):
            method = getattr(self, mname)
            method(ws, data)
    
    
    def on_setup_form_update(self, ws, data):
        
        teams = [t for t in data['teams'] if t] # remove empty ones
        teams.sort()
        
        QuizWebSocket.send_all("data.team_update", teams)




quiz = Quiz()