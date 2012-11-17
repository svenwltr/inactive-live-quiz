
import logging

class Quiz(object):
    
    
    def send(self, event, data):
        from websocket import QuizWebSocket
        self.send = QuizWebSocket.send_all

    
    def recv(self, event, data):
        mname = "on_%s" % event
        
        if hasattr(self, mname):
            method = getattr(self, mname)
            method(data)
    
    
    def on_setup_validate(self, data):
        
        teams = [t for t in data['teams'] if t] # remove empty ones
        teams.sort()
        
        self.send("setup_teamupdate", teams)




quiz = Quiz()