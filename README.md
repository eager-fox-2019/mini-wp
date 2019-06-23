# MiniWP-v2

### http://miniwp2.sukmaranggapradeta.com/

### Register :

```sh
URL: http://miniwp2-server.sukmaranggapradeta.com/register
METHOD : POST
AUTHENTICATE: NO
AUTHORIZE: NO
REQUEST Data Input / req.body:
    {
        name: logan
        email: logan@gmail.com
        password: logan
    }
Response Status : 201 Created
    {
        "_id": "5d0f3091b5145c6b00d4fe6a",
        "name": "logan",
        "email": "logan@gmail.com",
        "password": "$2a$10$uY/uxro4JVd9i9FD/EP4buwHDl7WHYsrA7oqFE75UVQ8Xs0WnjGuu",
        "__v": 0
    }
-----------------------------------------------------------------
IF Error
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
---------------------------------------------------------------
If email format wrong
Response Status : 400 Bad Request
    {
        "message": "User validation failed: email: Invalid format email"
    }
---------------------------------------------------------------
If email duplikat
Response Status : 400 Bad Request
    {
        "message": "User validation failed: email: Email is already registered"
    }
--------------------------------------------------------------
If name, email or password empty
Response Status : 400 Bad Request
{
    "message": "User validation failed: name: Name is required, email: Email is required, password: Password is required"
}
```


### Login :

```sh
URL: http://miniwp2-server.sukmaranggapradeta.com/login
METHOD : POST
AUTHENTICATE: NO
AUTHORIZE: NO
REQUEST Data Input / req.body:
    {
        email: logan@mail.com
        password: logan
    }
Response Status : 200 OK
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGYzMDkxYjUxNDVjNmIwMGQ0ZmU2YSIsImVtYWlsIjoibG9nYW5AZ21haWwuY29tIiwiaWF0IjoxNTYxMjc2NjczLCJleHAiOjE1NjEzNjMwNzN9.dgbIMc1G95KZ-EI01tXk_X-7uOfY1yB5GIafmLx2mC8",
        "id": "5d0f3091b5145c6b00d4fe6a",
        "name": "logan",
        "email": "logan@gmail.com"
    }
----------------------------------------------------------------
If Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
---------------------------------------------------------------
If email or password wrong:
Response Status : 400 Bad Request
   {
        "message": "email/password wrong!"
    }
```

### Get Users :

```sh
URL: http://miniwp2-server.sukmaranggapradeta.com/users
METHOD : GET
AUTHENTICATE: NO
AUTHORIZE: NO

Response Status : 200 OK
    [
        {
            "_id": "5d0f3091b5145c6b00d4fe6a",
            "name": "logan",
            "email": "logan@gmail.com",
            "password": "$2a$10$uY/uxro4JVd9i9FD/EP4buwHDl7WHYsrA7oqFE75UVQ8Xs0WnjGuu",
            "__v": 0
        }
    ]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
```

### Create Article :

```sh
URL: http://miniwp2-server.sukmaranggapradeta.com/articles
METHOD : POST
AUTHENTICATE: YES
AUTHORIZE: NO
REQUEST: 
    DATA: 
    {
        title: <title>
        content: <content>
        featured_image: <image>
        tags: <tag>
        tags: <tag>
        author: <userId>
    }
    HEADERS: 
    {
        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGYzMDkxYjUxNDVjNmIwMGQ0ZmU2YSIsImVtYWlsIjoibG9nYW5AZ21haWwuY29tIiwiaWF0IjoxNTYxMjc2NjczLCJleHAiOjE1NjEzNjMwNzN9.dgbIMc1G95KZ-EI01tXk_X-7uOfY1yB5GIafmLx2mC8   
    }
-----------------------------------------------------------------
Response Status : 201 Created
    {
        "tags": [
            "wolverine",
            "logan",
            "x-man"
        ],
        "_id": "5d0f3375b5145c6b00d4fe6d",
        "title": "LOGAN",
        "content": "In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life. But when Laura, a mutant child pursued by scientists, comes to him for help, he must get her to safety.",
        "author": {
            "_id": "5d0f3091b5145c6b00d4fe6a",
            "name": "logan",
            "email": "logan@gmail.com",
            "password": "$2a$10$uY/uxro4JVd9i9FD/EP4buwHDl7WHYsrA7oqFE75UVQ8Xs0WnjGuu",
            "__v": 0
        },
        "featured_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJcmFJ_c2lNWb0g9-ZH0v4a6Eve5_Kajm6DkfWn1B5ZlnwZ9YFjg",
        "createdAt": "2019-06-23T08:08:21.210Z",
        "updatedAt": "2019-06-23T08:08:21.210Z",
        "__v": 0
    }
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```

### Get Articles :

```sh
URL: http://miniwp2-server.sukmaranggapradeta.com/articles
METHOD : GET
AUTHENTICATE: YES
AUTHORIZE: NO
HEADERS: 
{
    token: <token from login>  
}

Response Status : 200 OK
[
    {
        "tags": [
            "wolverine",
            "logan",
            "x-man"
        ],
        "_id": "5d0f3375b5145c6b00d4fe6d",
        "title": "LOGAN",
        "content": "In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life. But when Laura, a mutant child pursued by scientists, comes to him for help, he must get her to safety.",
        "author": {
            "_id": "5d0f3091b5145c6b00d4fe6a",
            "name": "logan",
            "email": "logan@gmail.com",
            "password": "$2a$10$uY/uxro4JVd9i9FD/EP4buwHDl7WHYsrA7oqFE75UVQ8Xs0WnjGuu",
            "__v": 0
        },
        "featured_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJcmFJ_c2lNWb0g9-ZH0v4a6Eve5_Kajm6DkfWn1B5ZlnwZ9YFjg",
        "createdAt": "2019-06-23T08:08:21.210Z",
        "updatedAt": "2019-06-23T08:08:21.210Z",
        "__v": 0
    }
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```

### Update Article :

```sh
URL: http://miniwp2-server.sukmaranggapradeta.com/articles/:articlesID
Example: http://miniwp2-server.sukmaranggapradeta.com/articles/5d0662198b95571482f7230a
AUTHENTICATE: YES
AUTHORIZE: YES
METHOD : PUT
HEADERS: 
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMDY1OGFhOGI5NTU3MTQ4MmY3MjMwOCIsImVtYWlsIjoiaXJvbm1hbkBnbWFpbC5jb20iLCJpYXQiOjE1NjA2OTc2NDMsImV4cCI6MTU2MDc4NDA0M30.sRL02p3M2mR_ECeI2s3jXOZ_j0ykoFWZrAbFGm8saTY    
}
DATA: 
{
    <field>: <value>
}
Response Status : 200 OK
----------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the author:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```

### Delete Article :

```sh
URL: http://miniwp2-server.sukmaranggapradeta.com/articles/:articlesID
EXAMPLE: http://miniwp2-server.sukmaranggapradeta.com/articles/5d0662198b95571482f7230a
AUTHENTICATE: YES
AUTHORIZE: YES
METHOD : DELETE
HEADERS: 
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMDY1OGFhOGI5NTU3MTQ4MmY3MjMwOCIsImVtYWlsIjoiaXJvbm1hbkBnbWFpbC5jb20iLCJpYXQiOjE1NjA2OTc2NDMsImV4cCI6MTU2MDc4NDA0M30.sRL02p3M2mR_ECeI2s3jXOZ_j0ykoFWZrAbFGm8saTY    
}

Response Status : 200 OK
{
    "owner": [
        "5d0658aa8b95571482f72308"
    ],
    "members": [],
    "_id": "5d0662198b95571482f7230a",
    "name": "Postman",
    "description": "Testing",
    "status": "todo",
    "due_date": "Wednesday Jun 26, 2019",
    "createdAt": "2019-06-16T15:36:57.097Z",
    "updatedAt": "2019-06-16T15:39:47.386Z",
    "__v": 0
}
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Token empty or wrong:
Response Status : 401 Unauthenticated
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the author:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```

### Search by Tag :

```sh
URL: http://miniwp2-server.sukmaranggapradeta.com/articles/tags/:q
EXAMPLE: http://miniwp2-server.sukmaranggapradeta.com/articles/tags/programming
AUTHENTICATE: YES
AUTHORIZE: NO
METHOD : GET
HEADERS: 
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMDY1OGFhOGI5NTU3MTQ4MmY3MjMwOCIsImVtYWlsIjoiaXJvbm1hbkBnbWFpbC5jb20iLCJpYXQiOjE1NjA2OTc2NDMsImV4cCI6MTU2MDc4NDA0M30.sRL02p3M2mR_ECeI2s3jXOZ_j0ykoFWZrAbFGm8saTY    
}

Response Status : 200 OK
[
    {
        "tags": [
            "javascript",
            "programming",
            "nodejs"
        ],
        "_id": "5d0f664fbd0c4118a03afcaa",
        "title": "How to use the JavaScript console: going beyond console.log()",
        "content": ...,
        "author": {
            "_id": "5d0f63a5bd0c4118a03afca7",
            "name": "sukma rangga",
            "email": "adit.netral@gmail.com",
            "password": "$2a$10$PNP817mZFBSQkj8zwZ7/nuaVJW0ifiZ7fzk47YUHwjBFd3MX3/FpK",
            "__v": 0
        },
        "featured_image": "https://storage.googleapis.com/image-storage.sukmaranggapradeta.com/1_98a_Z2uEDzLDmjPM4k37iQ.png.png",
        "createdAt": "2019-06-23T11:45:19.213Z",
        "updatedAt": "2019-06-23T11:45:19.213Z",
        "__v": 0
    },
    {
        "tags": [
            "programming",
            "food",
            "water",
            "vitamin"
        ],
        "_id": "5d0f6755bd0c4118a03afcab",
        "title": "BRAIN-FRIENDLY FOOD FOR PROGRAMMERS",
        "content": ...,
        "author": {
            "_id": "5d0f63a5bd0c4118a03afca7",
            "name": "sukma rangga",
            "email": "adit.netral@gmail.com",
            "password": "$2a$10$PNP817mZFBSQkj8zwZ7/nuaVJW0ifiZ7fzk47YUHwjBFd3MX3/FpK",
            "__v": 0
        },
        "featured_image": "https://storage.googleapis.com/image-storage.sukmaranggapradeta.com/1_j2ltSMeSzdEiFTyvn2p0eA.gif.gif",
        "createdAt": "2019-06-23T11:49:41.375Z",
        "updatedAt": "2019-06-23T11:49:41.375Z",
        "__v": 0
    }
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Token empty or wrong:
Response Status : 401 Unauthenticated
    {
        "message": "Unauthenticated user"
    }
```

