# mini-wp server docs
mini-wp


### Deploy

[mini-wp.jays.best](http://mini-wp.jays.best/)

### Usage
- make file .env from .env-template
- run code :
```
  $ pm install
```
- then just run this code to enable the server :
```
  $ npm run dev
```

### REST-API Routes

**Notes** 

For `POST` and `PATCH` for Articles, you have to include `content-type` headers with value `multipart/form-data`

example :

```
axios({ 
  method: 'POST',
  url: `/articles`,
  data: body,
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': localStorage.getItem('token')
  })
  .then(result => do something)
  .catch(err)
```

Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`api/users/register` | POST | - | {first_name, last_name, email, password} | {_id, email, password} | register a user | email must be valid
`api/users/login` | POST | - | {email, password} | {access_token} | login: get token | -
`api/articles` | POST | token | {title, description, picture, content} | {title, description, picture, content, _id(user)} | create a new article | -
`api/articles` | GET | - | - | [{title, description, picture, content, _id(user)}] | get list of article | -
`api/articles/:id` | GET | - | - | {title, description, picture, content} | get single article | -
`api/articles/:id` | DELETE | token | - | - | delete an article | -
`api/articles/:id` | PATCH | token | {title, description, picture, content} | {title, description, picture, content} | update article | -
`api/articles/user/:id` | GET | token | |[{title, description, picture, content, _id(user)}] |  Get all articles with user based on params `:id`  | -