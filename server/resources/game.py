from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from db import db
from models import GameModel
from schemas import GameSchema


bp = Blueprint("Games", __name__, description="Operations on games")


@bp.route("/game/<int:game_id>")
class Game(MethodView):

    # Get a game with id
    @bp.response(200, GameSchema)
    def get(self, game_id):
        game = GameModel.query.get_or_404(game_id)
        return game
    
    # Delete a game with id
    def delete(self, game_id):
        game = GameModel.query.get_or_404(game_id)
        db.session.delete(game)
        db.session.commit()
        return {"message": "Game deleted"}


@bp.route("/game")
class GameList(MethodView):

    # Get all games
    @bp.response(200, GameSchema(many=True))
    def get(self):
        return GameModel.query.all()

    # Create a game
    @bp.arguments(GameSchema)
    @bp.response(201, GameSchema)
    def post(self, game_data):
        game = GameModel(**game_data)
        try:
            db.session.add(game)
            db.session.commit()
        except IntegrityError:
            abort(400, message="A game with that name already exists.")
        except SQLAlchemyError:
            abort(500, message="An error occured while creating the game.")

        return game