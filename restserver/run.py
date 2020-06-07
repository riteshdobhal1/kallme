from app import app
import os
#import logging
#from logging.handlers import RotatingFileHandler

if __name__ == '__main__':
 #   logHandler = RotatingFileHandler('logs/info.log', maxBytes=1000, backupCount=1)
    
    # set the log handler level
  #  logHandler.setLevel(logging.DEBUG)

    # set the app logger level
   # app.logger.setLevel(logging.DEBUG)

    #app.logger.addHandler(logHandler)   
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or \
    'e5ac358c-f0bf-11e5-9e39-d3b532c10a28' 
    app.run(host='0.0.0.0',port=4996,debug=app.config["DEBUG"],threaded=True) 
