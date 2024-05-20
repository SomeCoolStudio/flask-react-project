from flask_smorest import Blueprint

bp = Blueprint("Games", __name__, description="Operations on games")

from . import routes