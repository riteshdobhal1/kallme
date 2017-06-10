from flask import Flask
app = Flask(__name__)
 
@app.route("/restserver")
def hello():
    return "Welcome to Python Flask App!"

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
