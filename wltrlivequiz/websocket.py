import json
import logging

import tornado.websocket



class QuizWebSocket(tornado.websocket.WebSocketHandler):
    
    def open(self): #@ReservedAssignment
        pass


    def on_close(self):
        pass

    
    def write_message(self, message):
        def callback():
            super(QuizWebSocket, self).write_message(message)
        
        tornado.ioloop.IOLoop.instance().add_callback(callback)
    
    
    def on_message(self, message):
        try:
            request = json.loads(message)
            event = request.pop('event')
            self.monitor.request(event, **request)
        except Exception, e:
            self.exception_response(e)
    
    
    def response(self, event, **kwargs):
        kwargs['event'] = event
        try:
            message = json.dumps(kwargs)
            self.write_message(message)
        except Exception, e:
            self.exception_response(e)
        
     
    def exception_response(self, e):
        logging.error("%s: %s" % (e.__class__.__name__, e))
        self.write_message(json.dumps({
            'event': 'exception',
            'message': unicode(e),
        }))
