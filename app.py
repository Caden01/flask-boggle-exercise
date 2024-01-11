from flask import Flask, session, render_template, request, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "SECRET"

boggle_game = Boggle()

@app.route("/")
def home():
    """Set up game board and display times user had played"""

    board = boggle_game.make_board()
    session["board"] = board
    times_played = session.get("times_played", 0)
    
    return render_template("index.html", board=board, times_played=times_played)
    
@app.route("/check-word")
def check_word():
    """Retrieves user input and checks if it is a valid word"""

    word = request.args["word"]
    board = session["board"]
    result = boggle_game.check_valid_word(board, word)
    print(result)
    return jsonify({"result": result})

@app.route("/show-score", methods=["POST"])
def show_score():
    """Retrieves the users score to check if they got a new highscore and upadates times user has played"""
    
    score = request.json["score"]
    highscore = session.get("highscore", 0)
    times_played = session.get("times_played", 0)
    
    session["highscore"] = max(score, highscore)
    session["times_played"] = times_played + 1  
    return jsonify({"new_record": score > highscore})