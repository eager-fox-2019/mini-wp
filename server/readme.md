## Getting Started
Please follow this through before you start and use the server.
1. Run this script in the terminal to install all dependencies
```
npm install
```
2. Create .env file. You could copy paste value in .env, from .env-template.
- JWT_TOKEN is used for package
- CLIENT_ID is used for google oAuth. You could get it here https://developers.google.com/identity/sign-in/web/sign-in
- CLOUD_BUCKET your bucket name in GCS (google cloud service)
- GCLOUD_PROJECT your project name in GCS (google cloud service)
- KEYFILE_PATH your credential path file, get it from GCS (google cloud service)

3. Run this in your terminal to start the server
```
npm run
```

# Route
## User
### Register Customer
Register new customer as default login path, not using third party oAuth.
URL : /users/register
Method : Post
Request Header : NONE
Request Body : 
```
{
  full_name: Robby Caesar Putra,
  username: robbycp,
  password; robbycp,
  email: robby@mail.com,
}
```
Success Status Code : 201
Success Response : No Response
Error Status Code : 400, 500
Error Response :
```
{
  message: 'User validation failed: username: robbycp is already in our database. Please use other username. email: robby@mail.com is already in our database. Please use other email'
}
```
### Login Customer
Login for both default login or oAuth google login. The difference is in the request body.
URL : /users/login
Method : Post
Request Header : NONE
#### Defaul Login
Request Body : 
```
{
  username: robbycp,
  password; robbycp,
  login_type: 'default'
}
```
Success Status Code : 200
Success Response : 
```
{ 
  token: 'jsfiowjoefi29sd9d8fsa0aef890ewf8s9a',
}
```
#### Google Login
Full_name, email, and username user data is get from the client. Through npm https://www.npmjs.com/package/vue-google-signin-button
Request Body : 
```
{
  full_name: 'Robby Caesar Putra',
  email: 'robby@gmail.com',
  username: 'robby',
  login_type: 'google'
}
```
Success Status Code : 200
Success Response : 
```
{ 
  token: 'jsfiowjoefi29sd9d8fsa0aef890ewf8s9a',
}
```

Error Status Code : 400, 500
Error Response :
```
{
  message: 'Username / password Invalid'
}
```
### Logout Customer
Logout for both default login user and google login user
URL : /users/register
Method : Post
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 201
Success Response : 
```
{
  message: 'Successfully log out'
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### MyProfile Customer
Get login user basic profile data : full name, username, and email
URL : /users/myprofile
Method : Post
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 201
Success Response : 
```
{ 
  full_name: 'robby caesar putra',
  username: 'robbycp',
  email: 'robby@gmail.com' 
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```

##Article
### Get All Articles
Get all articles on the database.
URL : /articles
Method : Get
Request Header : NONE
Request Body : NONE
Success Status Code : 200
Success Response : 
```
[
  {
    "_id": "5cfa8fd3b7b5be464a89ee2e",
    "title": "Judul dari Post",
    "content": "<h1>Mencoba Heading<h1>",
    "user_id": {
        "_id": "5cf8cfaa9b511e62c8d71349",
        "username": "robbycp",
        "full_name": "Robby Caesar Putra",
        "email": "robbycaesar@gmail.com"
    },
    "createdAt": "2019-06-07T16:24:51.838Z",
    "updatedAt": "2019-06-19T08:29:26.436Z",
    "__v": 0,
    "published": true,
    "contentNonHtml": "Mencoba Heading"
  },
  {...} 
]
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Get One Article
Get one article on the database by article id.
URL : /articles/:id
Method : Get
Request Header : NONE
Request Body : NONE
Success Status Code : 200
Success Response : 
```
[
  {
    "_id": "5cfa8fd3b7b5be464a89ee2e",
    "title": "Judul dari Post",
    "content": "<h1>Mencoba Heading<h1>",
    "user_id": {
        "_id": "5cf8cfaa9b511e62c8d71349",
        "username": "robbycp",
        "full_name": "Robby Caesar Putra",
        "email": "robbycaesar@gmail.com"
    },
    "createdAt": "2019-06-07T16:24:51.838Z",
    "updatedAt": "2019-06-19T08:29:26.436Z",
    "__v": 0,
    "published": true,
    "contentNonHtml": "Mencoba Heading"
  }
]
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Create New Article
Create one article and upload the image provided.
URL : /articles
Method : Post
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : 
```
{
  title: 'Judul article'
  published: false, // Boolean false or true 
  content: '<h1>Ini judul dari articlenya<h1>', // string that also capture html format
  featured_image: this.inputVal.featured_image // selected file
}

```
Success Status Code : 200
Success Response : 
```
[
  {
    "_id": "5d0f89b21eba444a52e0eb29",
    "title": "testing2",
    "content": "testing2",
    "published": false,
    "user_id": "5cf8cfaa9b511e62c8d71349",
    "featured_image": "",
    "createdAt": "2019-06-23T14:16:18.086Z",
    "updatedAt": "2019-06-23T14:16:18.086Z",
    "__v": 0
  }
]
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Update Article
Update value for one article.
URL : /articles/:id
Method : Patch
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : 
```
{
  title: 'Judul article'
  published: false, // Boolean false or true 
  content: '<h1>Ini judul dari articlenya<h1>', // string that also capture html format
  featured_image: this.inputVal.featured_image // selected file
}

```
Success Status Code : 200
Success Response : 
```
[
  {
    "_id": "5d0f89b21eba444a52e0eb29",
    "title": "testing2",
    "content": "testing2",
    "published": false,
    "user_id": "5cf8cfaa9b511e62c8d71349",
    "featured_image": "",
    "createdAt": "2019-06-23T14:16:18.086Z",
    "updatedAt": "2019-06-23T14:16:18.086Z",
    "__v": 0
  }
]
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
###Delete Article
Update value for one article.
URL : /articles/:id
Method : Delete
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 200
Success Response : 
```
{
  message: 'successfully deleted article'
}
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```