
from flask.views import MethodView
from flask_smorest import abort
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models import ScoreboardModel
from schemas import ScoreboardSchema, ScoreboardUpdateSchema, PlainScoreboardSchema

from . import bp


@bp.route("/scoreboard/<int:scoreboard_id>")
class Scoreboard(MethodView):
    
    # Get scoreboard with id
    @bp.response(200, ScoreboardSchema)
    def get(self, scoreboard_id):
       scoreboard = ScoreboardModel.query.get_or_404(scoreboard_id)
       return scoreboard

    # Update an scoreboard with id
    @bp.arguments(ScoreboardUpdateSchema)
    @bp.response(200, ScoreboardSchema)
    def put(self, scoreboard_data, scoreboard_id):

        scoreboard = ScoreboardModel.query.get(scoreboard_id)
        
        if scoreboard_data["new_score"] > scoreboard.first_score:
            scoreboard.first_username = scoreboard_data["new_username"]
            scoreboard.first_score = scoreboard_data["new_score"]

        elif scoreboard_data["new_score"] > scoreboard.second_score:
            scoreboard.second_username = scoreboard_data["new_username"]
            scoreboard.second_score = scoreboard_data["new_score"]

        elif scoreboard_data["new_score"] > scoreboard.third_score:
            scoreboard.third_username = scoreboard_data["new_username"]
            scoreboard.third_score = scoreboard_data["new_score"]

        else:
            scoreboard = ScoreboardModel(id=scoreboard_id, **scoreboard_data)
            abort (401, message="Score too low")

        db.session.add(scoreboard)
        db.session.commit()

        return scoreboard
      
    
    # Delete an scoreboard with id
    def delete(self, scoreboard_id):
       scoreboard = ScoreboardModel.query.get_or_404(scoreboard_id)
       db.session.delete(scoreboard)
       db.session.commit()
       return {"message": "Scoreboard deleted"}

@bp.route("/scoreboard")
class ScoreboardList(MethodView):
   
    # Get all scoreboards
    @bp.response(200, PlainScoreboardSchema(many=True))
    def get(self):
        return ScoreboardModel.query.all()

    # Create an scoreboard
    @bp.arguments(PlainScoreboardSchema)
    @bp.response(201, PlainScoreboardSchema)
    def post(self, scoreboard_data):
        scoreboard = ScoreboardModel(**scoreboard_data)
        try:
            db.session.add(scoreboard)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occured while inserting the scoreboard.")

        return scoreboard
