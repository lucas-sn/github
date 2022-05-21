from blocklist_logout import BLOCKLIST_LOGOUT
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
from flask_restful import Resource, reqparse
import hashlib
from models.user import UserModel
import os
from werkzeug.security import safe_str_cmp


def hash_generate(value):
    m = hashlib.md5()
    hash_value = f"{os.getenv('FLASK_SECRET_KEY')}{value}"
    return hashlib.md5(str.encode(hash_value)).hexdigest()


def verifiy_is_email_exist(email):
    if UserModel.find_by_email(email):
        return 400


def verifiy_is_username_exist(username):
    if UserModel.find_by_username(username):
        return 400


def msg_value_already_exist(key_value):
    return {"message": f"A user with this {key_value} already exists"}, 400


class UserRegister(Resource):

    def post(self):
        _user_parser = reqparse.RequestParser()
        _user_parser.add_argument('username',
                                  type=str,
                                  required=True,
                                  help="This field cannot be blank."
                                  )

        _user_parser.add_argument('email',
                                  type=str,
                                  required=True,
                                  help="This field cannot be blank."
                                  )
        _user_parser.add_argument('password',
                                  type=str,
                                  required=True,
                                  help="This field cannot be blank."
                                  )
        data = _user_parser.parse_args()

        if verifiy_is_username_exist(data['username']) == 400:
            return msg_value_already_exist('username')

        if verifiy_is_email_exist(data['email']) == 400:
            return msg_value_already_exist('email')

        user = UserModel(**data)
        user.save_to_db()

        return {"message": "User created successfully."}, 201


class UserLogin(Resource):
    def post(self):
        _user_parser = reqparse.RequestParser()
        _user_parser.add_argument('username',
                                  type=str,
                                  required=True,
                                  help="This field cannot be blank."
                                  )
        _user_parser.add_argument('password',
                                  type=str,
                                  required=True,
                                  help="This field cannot be blank."
                                  )
        data = _user_parser.parse_args()

        user = UserModel.find_by_username(data['username'])
        if user and safe_str_cmp(user.password, hash_generate(data['password'])):
           # identity will be add the user.id information in JWT
            access_token = create_access_token(identity=user.id, fresh=False)
            return {
                'access_token': access_token
            }, 200

        return {"message": "Invalid Credentials"}, 401


class UserLogout(Resource):
    @jwt_required()
    def post(self):
        jti = get_jwt()['jti']  # jti is the JWT identification
        BLOCKLIST_LOGOUT.add(jti)
        return {"message": "Successfully logged out"}, 200


class UserProfile(Resource):
    @jwt_required()
    def get(self):
        user = UserModel.find_by_id(get_jwt_identity())
        return {
            "usuario": user.username,
            "email": user.email
        }, 200

    @jwt_required()
    def put(self):
        _user_parser = reqparse.RequestParser()

        _user_parser.add_argument('username',
                                  type=str,
                                  required=False,
                                  help="This field cannot be blank."
                                  )

        _user_parser.add_argument('email',
                                  type=str,
                                  required=False,
                                  help="This field cannot be blank."
                                  )
        _user_parser.add_argument('password',
                                  type=str,
                                  required=True,
                                  help="This field cannot be blank."
                                  )
        _user_parser.add_argument('new_password',
                                  type=str,
                                  required=True,
                                  help="This field cannot be blank."
                                  )
        data = _user_parser.parse_args()
        user = UserModel.find_by_id(get_jwt_identity())
        if user and safe_str_cmp(user.password, hash_generate(data['password'])):
            if data['email']:
                if verifiy_is_email_exist(data['email']) == 400:
                    return msg_value_already_exist('email')
                user.email = data['email']
                
            if data['username']:
                if verifiy_is_username_exist(data['username']) == 400:
                        return msg_value_already_exist('username')
                user.username = data['username']

            if data['new_password']:
                user.password = hash_generate(data['new_password'])
            user.save_to_db()

            jti = get_jwt()['jti']  # jti is the JWT identification
            BLOCKLIST_LOGOUT.add(jti)
            return {"message": "Changes completed successfully. Please log in again"}, 200

        return {"message": "Invalid Credentials!"}, 401
