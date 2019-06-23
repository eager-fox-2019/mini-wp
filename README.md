# DOCUMENTATION

## Register 

- route:
  - `POST /register`
- request:
  - body:
    - `{ email: 'dimitri@mail.com', password: 'secret' }`
- response:
  - `201`: `{ _id: ObjectId(''), email: 'dimitri@mail.com', password: 'HashedPassword' }`
- error:
  - `Validation Error`

```
- Email is unique, so it is not allowed to have same email in database.

- Password is hashed with bcryptjs.
```

## Login

- route:
  - `POST /login`
- request:
  - body
    - `{ email: 'dimitri@mail.com', password: 'secret' }`
- response:
  - `201`: `{ token: '...' }`
- error:
  - `404 not found`

```
Token is generated from JWT package.
```

## Google Signin

- route:
  - `POST /google`
- request:
  - payload
    - `{ email: 'dimitri@mail.com' }`
- response:
  - `201`: `{ token: '...' }`
- error:
  - `500 internal server error`

```
- If Google email is present in database, user receive token that is generated from JWT package.

- If Google email is not present in database, Google email will be registered to database and password is randomly generated, then user automatically login and receive token that is generated from JWT package.
```

## Create Article

- route:
  - `POST /home`
- request
  - decoded
    - `{id: _id}`
  - body
    - `{ title, content, tags, created_at, image, UserId }`
- response
  - `201`: `{
      title
      content
      tags
      created_at
      image
      UserId
    }`
- error:
  - `Validation Error`


```
- Token is decoded via JWT to get UserId.

- Multer is used to convert form data into object, then it is uploaded to google cloud storage and use the link from google cloud storage to google vision in order to get tags automatically.
```

## Read Article

- route:
  - `GET /home`
- request
  - decoded
    - `{id: _id}`
  - query
    - `{ myArticle }`
- response
  - `200`: `{
      title
      content
      tags
      created_at
      image
      UserId
    }`
- error:
  - `500 internal server error`

```
- Token is decoded via JWT to get UserId.

- Query is used to find specific UserId.
```

## Delete Article

- route:
  - `DELETE /:id`
- request
  - headers
    - `{ token }`
- response
  - `200`: `{ _id: ObjectId('') }`
- error:
  - `401 not authorized`

```
User can not delete Article that does not belongs to his/her, it is authorized in middleware.
```

## Update Article

- route:
  - `PATCH /:id`
- request
  - headers
    - `{ token }`
  - body
    - `{ title, content, tag, image }`
- response
  - `201`: `{
      title
      content
      tags
      created_at
      image
      UserId
    }`
- error:
  - `401 not authorized`

```
- User can not update Article that does not belongs to his/her, it is authorized in middleware.

- Multer is used to convert form data into object, then it is uploaded to google cloud storage and use the link from google cloud storage to google vision in order to get tags automatically.
```

