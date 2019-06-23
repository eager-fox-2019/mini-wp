# HACKPOST
## This App Built With Express and Mongoose
## how to run this APP


1. Make sure you installed

    * git
    * nodeJs
    * npm
    * mongodb

2. Create .env file containing your database credentials , you can check env template 

3. setup commands
    * git clone git@github.com:dedysimamora/mini-wp.git
    * cd mini-wp
    * npm install

4. running the app

    * Run `npm run start` to start the server.

    * Run `live-server --host=localhost` to start the client


### Routes List


| Route | HTTP | Headers(s) | Body | Description | Response Success | Response Error |
| ----- | ---- | ---------- | ---- | ----------- | ---------------- | -------------- |
| `/users/login/` | **POST** | none       | email: String (**required**),  password: String (**required**) | Log in as registered user | Show response  in `object` : { token: String, email:String} with status code 200 | Status code 500 |
| `/users/register` | **POST** | none | first_name:string(**required**), last_name:string(**required**),email: String (**required**),  password: String (**required**) | Register as new user | Response an`object` {_id, email} | Status code 500 |
| `/users/googlelogin` | **POST** | none       | tokenId | Log in with google account | Show response  in `object` : { token: String, email:String} with status code 200 | Status code 500 |
| `/article` | **GET** | Token | none | Find All article | Response an`array of objects` {article} | Status code 500 |
| `/article/[id]` | **GET** | Token | none | Find one article | Response an `objects` {artile} | Status code 500 |
| `/article/create` | **POST** | Token | title:string(**required**), image:string(**required**),category: String (**required**), content:string, | Add todo  | Response an `object` {article} | Status code 500 |
| `/article/[id]` | **DELETE** | Token | none | Delete article  | Response status 200 | Status code 500 |
| `/article/[id]` | **PUT** | Token | title:string(**required**), image:string(**required**),category: String (**required**), content:string, | Add todo  | Response an `object` {article} | Status code 500 | code 500 |

