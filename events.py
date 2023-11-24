import json

def create_game():
    game = {
        "gravity": 0.2,
        "width": 480,
        "height": 400
    }
    return json.dumps(game)