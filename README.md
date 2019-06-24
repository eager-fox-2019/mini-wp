# **Mini WP** (Portofolio Project Week 2)
Website : http://mini-wordpress.alvinchristian7.icu/
----------------------------------------

## MongoDB Schema

### User
`data = { name: String, email: String, password: String, image_url: String }`

### Posts
`data = { user: ref('User'), title : String, content : String, created_at : Date, image_url : String, published: Boolean, starred: Boolean, tags: Array }`

## Endpoint

### *Doesn't Require Token*

#### User Routes
| Routes                | Method | Request Body                           | Response Data      | Description                                 |
| --------------------- | ------ | -------------------------------------- | ------------------ | ------------------------------------------- |
| `/users/register`     | POST   | `{ name, email, password, image_url }` | `{ access-token }` | > Register with new user info               |
| `/users/login`        | POST   | `{ email, password }`                  | `{ access-token }` | Login and get an access token and name      |
| `/users/signingoogle` | POST   | `{ id_token : String }`                         | `{ access-token }` | Sign in with Google and get an access token |

### *Require Token* (`{ headers: { access-token : String } }`)

#### User Routes
| Routes      | Method | Request Body       | Response Data      | Description                                             |
| ----------- | ------ | ------------------ | ------------------ | ------------------------------------------------------- |
| `/users/me` | GET    | -                  | `{ access-token }` | Get info of user currently logged in by access token    |
| `/users/me` | PATCH  | `data (pick each)` | `{ access-token }` | Update info of user currently logged in by access token |

#### Posts Routes
| Routes                                                                | Method | Request Body       | Response Data | Description                                                                           |
| --------------------------------------------------------------------- | ------ | ------------------ | ------------- | ------------------------------------------------------------------------------------- |
| `/posts`                                                              | POST   | `data`             | `data`        | Create a post (Authenticated user only)                                               |
| `/posts`                                                              | GET    | -                  | `[data]`      | Get all user's posts (Authenticated user only)                                        |
| `/posts?title=STRING&sortBy=STRING&starred=BOOLEAN&published=BOOLEAN` | GET    | -                  | `[data]`      | Search user's posts by title / sortBy / published / starred (Authenticated user only) |
| `/posts/:id`                                                          | GET    | -                  | `data`        | Get a post by id (Owners only)                                                        |
| `/posts/:id`                                                          | PATCH  | `data (pick each)` | `data`        | Update field(s) of a post with new data(s) by id (Owners only)                        |
| `/posts/:id`                                                          | PUT    | `data`             | `data`        | Update all fields of a post with new datas by id (Owners only)                        |
| `/posts/:id`                                                          | DELETE | -                  | `data`        | Delete a post by id (Owners only)                                                     |
