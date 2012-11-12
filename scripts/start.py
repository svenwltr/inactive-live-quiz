#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys

import wltrlivequiz.application


try:
    port = int(sys.argv[1])
except:
    port = 8080


wltrlivequiz.application.app.start(port)
