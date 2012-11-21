#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
Startscript for Live Quiz.

USAGE: start.py [PORT]
"""

import sys

import wltrlivequiz.application


try:
    PORT = int(sys.argv[1])
except IndexError:
    PORT = 8080


wltrlivequiz.application.app.start(PORT)

