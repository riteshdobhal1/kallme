from app import app
#import logging
#from logging.handlers import RotatingFileHandler

if __name__ == '__main__':
 #   logHandler = RotatingFileHandler('logs/info.log', maxBytes=1000, backupCount=1)
    
    # set the log handler level
  #  logHandler.setLevel(logging.DEBUG)

    # set the app logger level
   # app.logger.setLevel(logging.DEBUG)

    #app.logger.addHandler(logHandler)    
    app.run(host='0.0.0.0',debug=app.config["DEBUG"]) 
