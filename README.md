# mini-wp


# LIST OF USER ROUTES

Routes| Method | Request Body | Response Data| Response Error | Description 
------|--------|--------------|--------------|----------------|-------------
/user/register | POST | firstName:String **required**, lastName:String **required**,  email:String **required**, password:String **required** | { accessToken } | 400 - Email has already been registered| Register a new user
/user/login | POST |  email:string **required**, password:string **required** | { accessToken } | 400 -  Username/password incorrect | login with an existing user
/user/googlesign | POST | id_token | { accessToken } | none | Sign in with Google API

# LIST OF ARTICLE ROUTES

Routes| Method | Request Body | Response Data| Response Error | Description 
------|--------|--------------|--------------|----------------|-------------
/article | GET | none | list of all user articles | 401 - User unauthorized | list of articles based on logged user 
/article | POST | title:String **required**, content:String, image:String | { newUser } | 400 - missing required field | adds an article and uploads image to google cloud (if attached)
/article/:id | DELETE | none | { deletedCount } | 401 - User unauthorized | deletes an article based on its id
/article/:id | PATCH | title:String, content:String, image:String | { editedCount } | 401 - User unauthorized | edits an article based on its id
