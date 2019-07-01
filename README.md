# __Mini Wordpress__
---
## __A. Installation__
1. clone this repository
2. open the `/server` folder of this repo on the terminal and then run `npm install` on the terminal to install all of the dependencies
3. `npm run start` on the terminal
4. open the `/client` folder of this repo on the terminal and then run `npm install` on the terminal to install all of the dependencies
5. run the `parcel index.html` or `npm run start` on the terminal to run the client on localhost port 1234
---
## __B. API Documentation__

### How to use the REST API
 
If you are running the server on localhost port 3000, then the base url is = __http://localhost:3000__

Example :
If you want to register new user, the URL should be : `http://localhost:3000/users/register`

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
                }
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server error from google sign in or database
        ```
        {
          message : String
        }
        ```
    
### B.4. Update Your Account (User can change profile picture, name and pasword)
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

### B.5. POST NEW ARTICLE
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
          tags: [ String ]
        }
        ```
    - ON ERROR : HTTP RESPONSE `500` if server database error or update picture failed or `401` if token is invalid
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
          likedby : [ ObjectId ]
          tags: [ String ]
        }
        ```
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        {
          author : ObjectId
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
          author : ObjectId
          title: String,
          picture: String,
          content: String,
          rawHTML: String,
          likedby: [ ObjectId ],
          tags: [ String ]
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
    - QUERY = `sort=asc` or `sort=desc`
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
    - QUERY = `sort=asc` or `sort=desc`
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


### B.11. UPLOAD PICT TO GOOGLE CLOUD BUCKET
- Method & Route
	  - `POST` /uploadimg
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
        file : FormData
      }
      ```
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
        String
        ```
    - ON ERROR : HTTP RESPONSE `500` if upload process error or `401` if user is unauthenticated/unauthorized
        ```
        {
          message : String
        }
        ```

