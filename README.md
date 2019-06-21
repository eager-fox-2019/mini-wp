# My Mini Wordpress
**My Mini Wordpress**
----------------------------------------

## Endpoint

### *Doesn't Require Token*

#### User Routes
| Routes| Method | Request Body | Response Data| Response Error | Description |
|----------------------|--------|-----------------------------|-----------------------------------|--|---------------------------------------------------------------|
| `/user/register`| POST | `{ name, email, password }` | `{ token }` | 400 (`{email}` has been registered!) <br>400 (`{email}` is not a valid email!) <br> 400 (Password must be more or equal than 8 character!) <br> 500 (Internal Server Error) |Register with new user info|
| `/user/login` | POST | `{ email, password }`| `{ name, token }`| 400 (Wrong email/password) <br> 500 (Internal Server Error) | Login and get an access token and name |
| `/user/signingoogle` | POST | `{ id_token }` | `{ name, token }` | 500 (Internal Server Error)  | Sign in with Google and get an access token, name, new password |

### *Require Token*

#### Article Routes (`{ headers: { token } }`)
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/article/list`| GET | -| `{ data }`| 400 (Invalid Token)<br> 401 (Please login first) <br> 404 (User not found) <br> 500 (Internal Server Error) | Get all the user's articles (Authenticated user only)|
| `/article/filter/:field/:value` | GET | -| `{ data }`| 400 (Invalid Token)<br> 401 (Please login first) <br> 404 (User not found) <br> 500 (Internal Server Error) | Get all article match with filter criteria (Authenticated user only)|
| `/article/:id` | GET | -| `{ data }`| 400 (Invalid Token)<br> 401 (Please login first) <br> 404 (User not found) <br> 404 (Article with id `{id}` not found!)<br> 500 (Internal Server Error) | Get article match with id (Authenticated user only)|
| `/article/create`| POST | `{ name, description, dueDate }` | `{ data }`| 400 (Invalid Token)<br> 401 (Please login first) <br> 404 (User not found) <br> 500 (Internal Server Error) | Create article (Authenticated user only) |
| `/article/update/:id` | PATCH | - | - | 400 (Invalid Token)<br> 401 (Please login first) <br> 401 (Unauthorized) <br> 404 (User not found) <br> 404 (Article not found) <br> 404 (Article with id `{id}` not found!) <br> 500 (Internal Server Error) | Update an article (Owners only) |
| `/article/delete/:id` | DELETE | - | - | 400 (Invalid Token)<br> 401 (Please login first) <br> 401 (Unauthorized) <br> 404 (User not found) <br> 404 (Article not found) <br> 500 (Internal Server Error) | Delete an article (Owners only) |