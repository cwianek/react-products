from app.dao import get_db, toRest, getSequenceNextValue
db = get_db()

class User:

  def __init__(self, email, password):
    self.email = email
    self.password = password

  def save(self):
    id = db.users.insert_one({"email": self.email, "password": self.password}).inserted_id
    return id 

  def match_password(self, password):
    if password != self.password:
      raise User.PasswordDoesNotMatch

  @classmethod
  def get(self, email):
    user = db.users.find_one({'email': email})
    if user == None:
      raise User.DoesNotExist
    return User(user['email'], user['password'])

  class PasswordDoesNotMatch(BaseException):
    pass

  class DoesNotExist(BaseException):
    pass