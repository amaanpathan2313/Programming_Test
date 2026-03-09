# Programming_Test

.env file crendicials : 

PORT = 3000

MONGO_DB_LINK = 'mongodb://127.0.0.1:27017/programming_test'

KEY = 'amaan'


Method	Route	Description
POST	/api/login	Authenticate user, return JWT token
GET	/api/profile	Return logged-in user's info (protected)
POST	/api/logout	Invalidate the session/token