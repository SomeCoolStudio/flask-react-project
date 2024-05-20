from flask_smorest import Blueprint

bp = Blueprint("Scoreboards", __name__, description="Operations on scoreboards")

from . import routes