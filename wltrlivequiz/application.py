import os
import sys
import logging


import tornado.httpserver
import tornado.ioloop
import tornado.web


import wltrlivequiz
from wltrlivequiz.websocket import QuizWebSocket


class WltrLiveQuiz(object):
    
    RESSOURCES_DIR = "ressources"
    
    def __init__(self):
        self.application = tornado.web.Application([
            (r'/ws', QuizWebSocket),
            (r"/(.*)", StaticFileHandler,
                {"path": self._get_ressources_path()}),
        ])
        
        logging.basicConfig(
            level = logging.DEBUG,
            format = "%(asctime)s %(levelname)s: %(message)s",
            stream = sys.stdout,
        )
        
        
    def _get_ressources_path(self):
        pkg_dir = os.path.dirname(wltrlivequiz.__file__)
        return os.path.join(pkg_dir, WltrLiveQuiz.RESSOURCES_DIR)
    
    
    def start(self, port):
        http_server = tornado.httpserver.HTTPServer(self.application)
        http_server.listen(port)
        try:
            tornado.ioloop.IOLoop.instance().start()
        except KeyboardInterrupt:
            pass

    

class StaticFileHandler(tornado.web.StaticFileHandler):
    
    INDEX = "index.html"
    
    def get(self, path, include_body=True):
        if path == "":
            path = StaticFileHandler.INDEX
        elif path == StaticFileHandler.INDEX:
            raise tornado.web.HTTPError(403)

        super(StaticFileHandler, self).get(path, include_body)



app = WltrLiveQuiz()
