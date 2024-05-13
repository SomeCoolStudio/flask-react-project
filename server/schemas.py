from marshmallow import Schema, fields

class PlainGameSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)

class PlainScoreboardSchema(Schema):
    id = fields.Int(dump_only=True)
    first_username = fields.Str()
    second_username = fields.Str()
    third_username = fields.Str()
    first_score = fields.Int()
    second_score = fields.Int()
    third_score = fields.Int()
    new_username = fields.Str()
    new_score = fields.Int()

class ScoreboardUpdateSchema(Schema):
    new_username = fields.Str()
    new_score = fields.Int()
    game_id = fields.Int()

class ScoreboardSchema(PlainScoreboardSchema):
    game_id = fields.Int(required=True, load_only=True)
    game = fields.Nested(PlainGameSchema(), dump_only=True)

class GameSchema(PlainGameSchema):
    items = fields.List(fields.Nested(PlainScoreboardSchema()), dump_only=True)
    
class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Str()
    password = fields.Str(required=True, load_only=True)

class UserUpdateSchema(Schema):
    username = fields.Str()
    email = fields.Str()
