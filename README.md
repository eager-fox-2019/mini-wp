# __Mini Wordpress__
---
## __A. Installation__
1. clone this repository
2. open the `/server` folder of this repo on the terminal and then run `npm install` on the terminal to install all of the dependencies
3. `npm run start` on the terminal
---
## __B. API Documentation__

### How to user the REST API
 
If you are running the client using live-server on localhost port 3000, then the base url is = __http://localhost:3000__

Then, if you want to register new user, the URL should be : `http://localhost:3000/users/register`

The formula is : `BASE_URL` + `routes` + `?` +`query`

### B.1. Register new user
- Method & Route
	  - `POST` /users/register 
- Request
    - HEADERS
    - BODY
        ```
        {
          name: String
          email: String
          password: String
        }
        ```    
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        {
          _id: ObjectId
          name: String
          email: String
          picture: String
          password: String
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server database error
        ```
        {
          message : String
        }
        ```


### B.2. Log In
- Method & Route
	  - `POST` /users/login 
- Request
    - HEADERS
    - BODY
        ```
        {
          name: String
          password: String
        }
        ```    
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        {
          token : String,
          user : {
                    _id: ObjectId
                    name: String
                    email: String
                    picture: String
                    password: String
                }
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server error on database or `400` if email/password does not match
        ```
            {
            message : String
            }
        ```

### B.3. Log In Using Google Sign In
- Method & Route
	  - `POST` /users/logingoogle
- Request
    - HEADERS
        ```
        {
          token: String // token from google
        }
        ```    
    - BODY
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        {
          token : String,
          user : {
                    _id: ObjectId
                    name: String
                    email: String
                    picture: String
                    password: String
                }
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server error from google sign in or database
        ```
        {
          message : String
        }
        ```
    
### B.4. Delete Your Account
- Method & Route
	  - `DELETE` /users
- Request
    - HEADERS
        ```
        {
          token: String
        }
        ```    
    - BODY
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
        {
          _id: ObjectId
          name: String
          email: String
          picture: String
          password: String
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server error or `401` if user unauthenticated/unauthorized
        ```
        {
          message : String
        }
        ```

### B.5. Update Your Account (User can change profile picture, name and pasword)
- Method & Route
	  - `PATCH` /users
- Request
    - HEADERS
        ```
        {
          token: String
        }
        ```    
    - BODY
      ```
        {
          name: String
          picture: String
          password: String
        }
        ```
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
        {
          _id: ObjectId
          name: String
          email: String
          picture: String
          password: String
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server error, or `401` if user is unauthenticated/unauthorized
        ```
        {
          message : String
        }
        ```

### B.6. POST NEW ARTICLE
- Method & Route
	  - `POST` /articles 
- Request
    - HEADERS
        ```
        {
          token: String
        }
        ```    
    - BODY
        ```
        {
          title: String,
          picture: String,
          content: String,
          rawHTML: String,
          tags: [ ObjectId ]
        }
        ```
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        {
          title: String,
          picture: String,
          content: String,
          rawHTML: String,
          likedby: [ ObjectId ],
          tags: [ ObjectId ]
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server database error or update picture failed
        ```
        {
          message : String
        }
        ```

### B.7. EDIT YOUR ARTICLE
- Method & Route
	  - `PATCH` /articles/:id 
- Request
    - HEADERS
        ```
        {
          token: String
        }
        ```    
    - BODY
        ```
        {
          title: String,
          picture: String,
          content: String,
          rawHTML: String,
          tags: [ ObjectId ]
        }
        ```
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        {
          title: String,
          picture: String,
          content: String,
          rawHTML: String,
          likedby: [ ObjectId ],
          tags: [ ObjectId ]
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server database error or upload picture failed, or `401` if user is unauthenticated/unauthorized
        ```
        {
          message : String
        }
        ```

### B.8. LIKE OR CANCEL LIKE AN ARTICLE
- Method & Route
	  - `PATCH` /articles/like/:id 
- Request
    - HEADERS
        ```
        {
          token: String
        }
        ```    
    - BODY
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        {
          title: String,
          picture: String,
          content: String,
          rawHTML: String,
          likedby: [ ObjectId ],
          tags: [ ObjectId ]
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server database error or `401` if user is unauthenticated
        ```
        {
          message : String
        }
        ```

### B.9. VIEW ALL ARTICLE FOR FEEDS
- Method & Route
	  - `GET` /articles 
- Request
    - HEADERS
        ```
        {
          token: String
        }
        ```    
    - BODY
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        [
          {
            title: String,
            picture: String,
            content: String,
            rawHTML: String,
            likedby: [ ObjectId ],
            tags: [ ObjectId ]
          }
        ]
        ```
    - ON ERROR : HTTP RESPONSE `500` if server database error or `401` if user is unauthenticated
        ```
        {
          message : String
        }
        ```

### B.10. VIEW YOUR ARTICLE
- Method & Route
	  - `GET` /articles/user
- Request
    - HEADERS
        ```
        {
          token: String
        }
        ```    
    - BODY
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        [
          {
            title: String,
            picture: String,
            content: String,
            rawHTML: String,
            likedby: [ ObjectId ],
            tags: [ ObjectId ]
          }
        ]
        ```
    - ON ERROR : HTTP RESPONSE `500` if server database error or `401` if user is unauthenticated/unauthorized
        ```
        {
          message : String
        }
        ```

  
### B.11. VIEW ARTICLE YOU HAVE LIKED
- Method & Route
	  - `GET` /articles/user
- Request
    - HEADERS
        ```
        {
          token: String
        }
        ```    
    - BODY
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        [
          {
            title: String,
            picture: String,
            content: String,
            rawHTML: String,
            likedby: [ ObjectId ],
            tags: [ ObjectId ]
          }
        ]
        ```
    - ON ERROR : HTTP RESPONSE `500` if server database error or `401` if user is unauthenticated/unauthorized
        ```
        {
          message : String
        }
        ```

1.  Create new tag

2.  Get all tags

3.  Delete a tag 
