from db import db

class ScoreboardModel(db.Model):
    __tablename__ = "scoreboards"

    id = db.Column(db.Integer, primary_key=True)
    new_username = db.Column(db.String(80))
    first_username = db.Column(db.String(80))
    second_username = db.Column(db.String(80))
    third_username = db.Column(db.String(80))
    new_score = db.Column(db.Integer)
    first_score = db.Column(db.Integer)
    second_score = db.Column(db.Integer)
    third_score = db.Column(db.Integer)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    
    game = db.relationship("GameModel", back_populates="scoreboards")

