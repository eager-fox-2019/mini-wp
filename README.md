# fancy todos
# link deploy = http://wordprezz.muhamadnabila.com/
## First Initial
### URL : '/authenticate'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : { token : < jwt_token > }
* RESPONSE STATUS : 200
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```

## List of user routes
### URL : '/register'
* METHOD : POST
* BODY : 
    ```
    {
        name : ""
        email : ""
        password : ""
    }
    ```
* AUTHENTICATION : NO
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        name : ""
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```

### URL : '/login'
* METHOD : POST
* BODY : 
    ```
    {
        email : ""
        password : ""
    }
    ```
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        name : ""
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "username / password invalid"
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```
### URL : '/login/google'
* METHOD : POST
* BODY : 
    ```
    {
        idToken : ""
    }
    ```
* AUTHENTICATION : NO
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        name : ""
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 500
    ``` 
    OUTPUT {
        message : "Internal server error"
    }
    ```
## List of article routes
### URL : '/articles'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        title : "",
        content: "",
        tags : [],
        featuredImage : < url_link_GCS >
    }
    ```
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        _id : ""
        title : ""
        content : ""
        author : "",
        featuredImage : ""
        tags : []
    }
    ```
* RESPONSE STATUS : 404
    ``` 
    OUTPUT : {
        "Project validation failed: title: Title required."
    }
    ```
* RESPONSE STATUS : 404
    ``` 
    OUTPUT : {
        "Project validation failed: userId: Content required."
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT : {
        message : "Internal server error"
    }
    ```'

### URL : '/articles'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        _id : ""
        title : ""
        content : ""
        author : "",
        featuredImage : ""
        tags : []
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/articles/:id'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        _id : ""
        title : ""
        content : ""
        author : "",
        featuredImage : ""
        tags : []
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "Bad Request"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/articles/:id'
* METHOD : PUT
* AUTHENTICATION : YES
* AUTHORIZATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        _id : ""
        title : ""
        content : ""
        author : "",
        featuredImage : ""
        tags : []
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "Bad Request"
    }
    ```
* RESPONSE STATUS : 403
    ``` 
    OUTPUT : {
        message : "Forbidden"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/articles/:id'
* METHOD : DELETE
* AUTHENTICATION : YES
* AUTHORIZATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        message : "Delete successfully"
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "Bad Request"
    }
    ```
* RESPONSE STATUS : 403
    ``` 
    OUTPUT : {
        message : "Forbidden"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/articles/tag/:tag'
* METHOD : GET
* AUTHENTICATION : YES
* BODY : 
    ```
    {
        userId : ""
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        _id : ""
        title : ""
        content : ""
        author : "",
        featuredImage : ""
        tags : []
    }
    ```
* RESPONSE STATUS : 400
    ``` 
    OUTPUT : {
        message : "Bad Request"
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/conversation'
* METHOD : POST
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        text : "",
    }
    ```
* RESPONSE STATUS : 201
    ``` 
    OUTPUT : {
        _id : ""
        text : ""
        userId : {
            _id : "",
            email : "",
            name : "",
            password : < hashed >
        }
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/conversation'
* METHOD : GET
* AUTHENTICATION : YES
* HEADERS : 
    ```
    {
        token : < jwt_token >
    }
    ```
* BODY : 
    ```
    {
        title : "",
        description : "",
        due_date : "",
        projectId : ""
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
       _id : ""
        text : ""
        userId : {
            _id : "",
            email : "",
            name : "",
            password : < hashed >
        }
    }
    ```
* RESPONSE STATUS : 401
    ``` 
    OUTPUT : {
        message : "Unauthorized"
    }
    ```
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```
### URL : '/gcsUpload'
* METHOD : POST
* BODY : 
    ```
    {
        formData : < input_file >
    }
    ```
* RESPONSE STATUS : 200
    ``` 
    OUTPUT : {
        imageLink : ""
    }
    ```
* RESPONSE STATUS : 500
    ```
    OUTPUT {
        message : "internal server error"
    }
    ```