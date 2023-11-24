from os import getenv  
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import events

app = Flask(__name__)
app.config['SECRET_KEY'] = getenv("FLASK_SECRET")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html") 

@socketio.on("start game")
def start_game(json):
    print(f"Start game with: {str(json)}")
    emit("new game", events.create_game())