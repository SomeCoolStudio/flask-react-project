from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, get_jwt

from db import db
from blocklist import BLOCKLIST
from models import UserModel
from schemas import UserSchema, UserUpdateSchema


bp = Blueprint("Users", __name__, description="Operations on users")


@bp.route("/register")
class UserRegister(MethodView):

    # Create user
    @bp.arguments(UserSchema)
    # @bp.response(201, UserSchema)
    def post(self, user_data):

        user = UserModel( 
            username=user_data["username"],
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"])
        )
        # user = UserModel(**user_data]))

        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            abort(400, message="A user with that name already exists.")
        except SQLAlchemyError:
            abort(500, message="An error occured while creating this user.")
    
        return {"message":"User created successfully."},201


@bp.route("/login")
class UserLogin(MethodView):

    # Login user
    @bp.arguments(UserSchema)
    def post(self, user_data):
        user = UserModel.query.filter(UserModel.username == user_data["username"]).first()
        print(user_data)
        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(identity=user.id)
            return {"access_token": access_token, "refresh_token": refresh_token}
        abort (401, message="Invalid credentials")

    
@bp.route("/refresh")
class UserLogout(MethodView):
    
    # Refresh user
    @jwt_required(refresh=True)  
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        jti = get_jwt()["jti"]
        BLOCKLIST.add(jti)
        return {"refresh_token": new_token}

@bp.route("/logout")
class UserLogout(MethodView):
    
    # Logout user
    @jwt_required()  
    def post(self):
        jti = get_jwt()["jti"]
        BLOCKLIST.add(jti)
        return {"message": "Successfully logged out."}

@bp.route("/user/<int:user_id>")
class User(MethodView):

    #  Get user
    @bp.response(200, UserSchema)
    def get(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        return user
    
  # Update a user by id
    @bp.arguments(UserUpdateSchema)
    @bp.response(200, UserSchema)
    def put(self, user_data, user_id):
        user = UserModel.query.get(user_id)
        if user:
            for k , v in user_data.items():
                setattr(user, k, v)

        else:
            user = UserModel(id=user_id, **user_data)

        db.session.add(user)
        db.session.commit()
        return user

    #  Delete user
    def delete(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted"}, 200


         