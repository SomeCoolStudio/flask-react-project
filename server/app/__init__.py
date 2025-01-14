
from flask import Flask, jsonify
from flask_smorest import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from db import db
from blocklist import BLOCKLIST
from Config import Config


app = Flask (__name__)   
CORS(app)

app.config.from_object(Config)
api = Api(app)
jwt = JWTManager(app)
db.init_app(app)
migrate = Migrate(app, db)


from resources.scoreboard import bp as ScoreboardBlueprint
app.register_blueprint(ScoreboardBlueprint)
from resources.game import bp as GameBlueprint
app.register_blueprint(GameBlueprint)
from resources.user import bp as UserBlueprint
app.register_blueprint(UserBlueprint)



@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    return jwt_payload["jti"] in BLOCKLIST

@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return (
        jsonify(
            {"description": "The token has been revoked.", "error": "token_revoked"}
        ),
        401,
    )

@jwt.needs_fresh_token_loader
def token_not_fresh_callback(jwt_header, jwt_payload):
    return (jsonify(
        {
            "description": "The token is not fresh.",
            "error":"fresh_token_required"
        }
    ),
    401,
)

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return (jsonify({"message": "The token has expired.", "error": "token_expired"}), 401,)

@jwt.expired_token_loader
def invalid_token_callback(error):
    return (jsonify({"message": "Signature verification failed.", "error": "invalid_token"}), 401,)

@jwt.unauthorized_loader
def missing_token_callback(error):
    return (jsonify({"message": "Request does not contain an access token.", "error": "authorization_required"}), 401,)



