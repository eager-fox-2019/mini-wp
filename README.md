# mini-wp
mini-wp

## List of User Routes
|Routes|HTTP|Header(s)|Body|Success Response|Error Response|Description|
| :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: |
|/users/signup|POST|none|userName: String (required)|Status(201) Created Data|Status(500) Internal Server Error|Create new user|
||||email: String (required)||||
||||password: String (required)||||
|/users/signin|POST|none|email: String (required)|Status(200) Token|Status(500) Internal Server Error|Login to create token|
||||password: String (required)||||
|/users/googlesignin|POST|none|none|Status(200) Token|Status(500) Internal Server Error|Login via Google and create token|

## List of Article Routes
|Routes|HTTP|Header(s)|Body|Success Response|Error Response|Description|
| :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: |
|/articles|GET|token|none|Status(200) Array of article list|Status(500) Internal Server Error|Get article list|
|/articles/users|GET|token|none|Status(200) Array of article list created by user|Status(500) Internal Server Error|Get article list created by user|
|/articles/tags/:tag|GET|token|none|Status(200) Array of article list filtered by tag|Status(500) Internal Server Error|Get article list filtered by tag|
|/articles/:id|GET|token|none|Status(200) Article Detail|Status(500) Internal Server Error|Get an article detail|
|/articles/search/:input|GET|token|none|Status(200) Array of article list filtered by input|Status(500) Internal Server Error|Get article list filtered by input|
|/articles|POST|token|title: String (required)|Status(201) Created Article|Status(500) Internal Server Error|Create an article|
||||description: String (required)||||
||||tags: String||||
||||img: String||||
|/articles/:id|PATCH|token|title: String (required)|Status(200)Updated Article|Status(500) Internal Server Error|Update an article list|
||||description: String (required)||||
||||tags: String||||
||||img: String||||
|/articles/:id|DELETE|token|none|Status(200)Deleted Article Id|Status(500) Internal Server Error|Delete an article list|

## Usage

```javascript
$ npm install
$ node app.js
```

Access server via `http://localhost:3000`<br>
Access client via `http://localhost:8080`