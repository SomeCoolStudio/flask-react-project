from db import db

class GameModel(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    
    scoreboards = db.relationship("ScoreboardModel", back_populates="game", lazy="dynamic", cascade="all, delete" )
    