from blocklist_logout import BLOCKLIST_LOGOUT
from db import db
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from resources.character import UserCharacters, MarvelCharacters, MarvelCharacterDetails
from resources.comic import UserComics, MarvelComics, MarvelComicDetails
from resources.user import UserRegister, UserLogin, UserLogout, UserProfile
import os



app = Flask(__name__)
app.config['JWT_BLOCKLIST_ENABLED'] = True  # enable blocklist feature
# allow blocklisting for access and refresh tokens
app.config['JWT_BLOCKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.config['SECRET_KEY'] =  os.getenv('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)
CORS(app)


jwt = JWTManager(app)

api.add_resource(UserLogin, '/login')
api.add_resource(UserLogout, '/logout')  # Ex: /marvel/characters/1009515
api.add_resource(MarvelCharacterDetails,
                 '/marvel/characters/<int:id_character>')  # Ex: /marvel/comics/1009515
api.add_resource(MarvelCharacters, '/marvel/characters')
api.add_resource(MarvelComicDetails, '/marvel/comics/<int:id_comic>')
api.add_resource(MarvelComics, '/marvel/comics')
api.add_resource(UserRegister, '/register')
api.add_resource(UserCharacters, '/user/characters')
api.add_resource(UserComics, '/user/comics')
api.add_resource(UserProfile, '/user/my_profile')


@app.before_first_request
def create_tables():
    db.create_all()


# This method will check if a token is blocklisted, and will be called automatically when blocklist is enabled
@jwt.token_in_blocklist_loader
def token_in_blocklist_loader(jwt_header, decrypted_token):
    # Here we blocklist particular JWTs that have been created in the past.
    return decrypted_token['jti'] in BLOCKLIST_LOGOUT


if __name__ == '__main__':
    db.init_app(app)

    app.run(port=5000,  debug=False)
