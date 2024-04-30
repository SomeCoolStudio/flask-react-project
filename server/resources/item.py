from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models import ItemModel
from schemas import ItemSchema, ItemUpdateSchema


bp = Blueprint("Items", __name__, description="Operations on items")


@bp.route("/item/<int:item_id>")
class Item(MethodView):
    
    # Get an item with id
    @jwt_required()
    @bp.response(200, ItemSchema)
    def get(self, item_id):
       item = ItemModel.query.get_or_404(item_id)
       return item

    # Update an item with id
    @bp.arguments(ItemUpdateSchema)
    @bp.response(200, ItemSchema)
    def put(self, item_data, item_id):
        item = ItemModel.query.get(item_id)
        if item:
            item.price = item_data["price"]
            item.name = item_data["name"]
        else:
            item = ItemModel(id=item_id, **item_data)

        db.session.add(item)
        db.session.commit()
        return item
    
    # Delete an item with id
    @jwt_required()
    def delete(self, item_id):
       item = ItemModel.query.get_or_404(item_id)
       db.session.delete(item)
       db.session.commit()
       return {"message": "Item deleted"}

@bp.route("/item")
class ItemList(MethodView):
   
    # Get all items
    @jwt_required()
    @bp.response(200, ItemSchema(many=True))
    def get(self):
        return ItemModel.query.all()

    # Create an item
    @jwt_required()
    @bp.arguments(ItemSchema)
    @bp.response(201, ItemSchema)
    def post(self, item_data):
        item = ItemModel(**item_data)
        try:
            db.session.add(item)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occured while inserting the item.")

        return item
