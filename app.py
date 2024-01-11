from flask import Flask, session, render_template, request, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "SECRET"

boggle_game = Boggle()

@app.route("/")
def home():
    board = boggle_game.make_board()
    session["board"] = board
    
    return render_template("index.html", board=board)
    
@app.route("/check-word")
def check_word():
    word = request.args["word"]
    board = session["board"]
    result = boggle_game.check_valid_word(board, word)
    print(result)
    return jsonify({"result": result})