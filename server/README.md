# mini-wp
# SayWords

## Geting Started
- npm init
- npm install
- Run `nodemon app.js or npm run dev` to start the server.
- Run `live-server --host=localhost` to start the client

## Feature
- Register
- Login/Login with google
- Create article and save article as draft
- Create and publish article
- Edit draft article and publish
- Edit publish article
- Delete published/draft article
- Preview draft article

## Routes
### User Route
| Route             | HTTP       | Description                              | Success Res        | Error Res  |
|-------------------|:-----------|:-----------------------------------------| :------------------| :----------|
| /users/register     | POST       | Register new user                        | 201: object user created | 500: internal server error
| /users/login        | POST       | Login                                    | 200: token containing id, firstName, lastName, email | 404: user not found, 400: wrong username/password, 500: internal server error
| /users/loginGoogle        | POST       | Login                                    | 200: token containing id, username | 404: user not found, 400: wrong username/password, 500: internal server error


### Article Route
| Route             | HTTP       | Description                              | Success Res        | Error Res  |
|-------------------|:-----------|:-----------------------------------------| :------------------| :----------|