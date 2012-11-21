


class Validator(object):
    

    def __init__(self, data):
        self.data = data
        self.errors = set()


    def require(self, name, code):
        if name not in self.data:
            self.errors.add(code)
            return False

        if not unicode(self.data[name]).strip():
            self.errors.add(code)
            return False

        return True
