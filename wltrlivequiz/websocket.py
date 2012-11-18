import json
import logging

import tornado.websocket


from quiz import quiz



class QuizWebSocket(tornado.websocket.WebSocketHandler):
    
    all = []
    
    @staticmethod
    def send_all(event, data):
        for ws in QuizWebSocket.all:
            ws.send(event, data)

    @staticmethod
    def forward(sender, event, data):
        for ws in QuizWebSocket.all:
            if ws is sender:
                continue
            ws.send(event, data)
    
    def open(self): #@ReservedAssignment
        QuizWebSocket.all.append(self)


    def on_close(self):
        QuizWebSocket.all.remove(self)

    
    def write_message(self, message):
        def callback():
            super(QuizWebSocket, self).write_message(message)
        
        tornado.ioloop.IOLoop.instance().add_callback(callback)
    
    
    def on_message(self, message):
        try:
            event, data = json.loads(message)
            quiz.recv(self, event, data)
        except Exception, e:
            self.exception(e)
    
    
    def send(self, event, data):
        try:
            message = json.dumps((event, data))
            self.write_message(message)
        except Exception, e:
            self.exception(e)
        
     
    def exception(self, e):
        logging.error("%s: %s" % (e.__class__.__name__, e))
        self.write_message(json.dumps({
            'event': 'exception',
            'message': unicode(e),
        }))
