# mini-wp
mini-wp

## Building the JS file for the client

Make sure you have [webpack CLI](https://www.npmjs.com/package/webpack-cli) installed. Then run the commands:

```bash
  cd client/
  npm install
  webpack
```

The output file will be at `./dist/bundle.js`.

## Running the server

Run the following commands:

```bash
  cd server/
  npm install
  npm start
```

## API Documentation (server)
| Route          | HTTP Method | Header(s)                | Body                            | Description                                                                                                                |
|----------------|-------------|--------------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| /users/register    | POST        | `none`                   | `email:String`<br>(required)<br>`password:String`<br>(required)   | Register with new user info.                                                              |
| /users/login    | POST        | `none`                   | `email:String`<br>(required)<br>`password:String`<br>(required)   | Sign in and get an access token based on credentials.                                    |
| /users/google     | POST         | `none`   | `idtoken`<br>(required)                            | Sign in through Google oAuth.                                                                                   |
| /users/check | POST         | `Authorization: token`   | `none`                            | Check if token is valid, and user can automatically sign in.                                                                                          |
| /articles     | POST        | `Authorization: token`   | `title:String`<br>(required)<br>`content:String`<br>(required)<br>`created_at:Date`<br>(required)<br>`tags:String`<br>`file:Image`<br> | Save a new article and upload cover image to Goole Cloud Storage.                                                      |
| /articles | GET      | `Authorization: token`   | `none`                            | Get all articles.                                                      |
| /articles/user  | GET         | `Authorization: token`   | `none` | Get all articles by current user.            |
| /articles/:id | DELETE       | `Authorization: token`   | `none` | Delete a single article (owner only).    |
| /articles/:id | PATCH       | `Authorization: token`   | `title:String`<br>(optional)<br>`content:String`<br>(optional)<br>`tags:String`<br>(optional)<br>` | Update a single article (owner only).   |