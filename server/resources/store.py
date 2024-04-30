import uuid
from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from db import db
from models import StoreModel
from schemas import StoreSchema


bp = Blueprint("Stores", __name__, description="Operations on stores")


@bp.route("/store/<int:store_id>")
class Store(MethodView):

    # Get a store with id
    @bp.response(200, StoreSchema)
    def get(self, store_id):
        store = StoreModel.query.get_or_404(store_id)
        return store
    
    # Delete a store with id
    def delete(self, store_id):
        store = StoreModel.query.get_or_404(store_id)
        db.session.delete(store)
        db.session.commit()
        return {"message": "Store deleted"}


@bp.route("/store")
class StoreList(MethodView):

    # Get all stores
    @bp.response(200, StoreSchema(many=True))
    def get(self):
        return StoreModel.query.all()

    # Create a store
    @bp.arguments(StoreSchema)
    @bp.response(201, StoreSchema)
    def post(self, store_data):
        store = StoreModel(**store_data)
        try:
            db.session.add(store)
            db.session.commit()
        except IntegrityError:
            abort(400, message="A store with that name already exists.")
        except SQLAlchemyError:
            abort(500, message="An error occured while creating the store.")

        return store