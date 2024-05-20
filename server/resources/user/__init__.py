from flask_smorest import Blueprint

bp = Blueprint("Users", __name__, description="Operations on users")

from . import routes