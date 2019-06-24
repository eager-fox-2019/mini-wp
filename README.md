# mini-wp
my-ni-wp

API Documentation

#### USAGE

#### Articles Route
| ROUTES                     | METHOD    | HEADERS    | BODY  | RESPONS SUCCESS   | RESPONCE ERROR     | DESCRIPTION                          |
|----------------------------|-----------|------------|-------|-------------------|--------------------|--------------------------------------|
| /articles/allArticle       | 'GET'     | none       | none  |                   |                    | Get all article post by all users    |
| /articles/userArticle      | 'GET'     | token      | none  |                   |                    | Get all article post by loged user   | 
| /articles/article          | 'GET'     | token      | none  |                   |                    | Read a post                          | 
| /articles/article          | 'POST'    | token      | none  |                   |                    | Create a post                        | 
| /articles/article          | 'PATCH'   | token      | none  |                   |                    | Update post,by user                  | 
| /articles/article/:id      | 'DELETE'  | token      | none  |                   |                    | Delete post by user                  |



#### Users Route
| ROUTES             | METHOD    | HEADERS   | BODY               | RESPONS SUCCESS                  | RESPONCE ERROR       | DESCRIPTION    |
|--------------------|-----------|-----------|--------------------|----------------------------------|----------------------|----------------|
| users/register     | 'POST'    | none      | userName : String, | res.status(201)                  | res.status(500)      |  Add new User  |
|                    |           |           | password : String, | .json({username,password,email}) |    .json({ Internal  |                |
|                    |           |           | email : String     |                                  |        serverError}) |                |
| users/login        | 'POST'    | token     | email : String,    | res.status(20)                   | res.status(500)      |  Sign In User  |
|                    |           |           | password : String, | .json({token})                   |    .json({ Internal  |                |
|                    |           |           |                    |                                  |        serverError}) |                |
| users/login/google | 'POST'    | token     | email : String,    | res.status(201)                  | res.status(500)      |  Sign In User  |
|                    |           |           | password : String, | .json({username,password,email}) |    .json({ Internal  |  by google acc |
|                    |           |           |                    |                                  |        serverError}) |                |

