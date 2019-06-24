# mini-wp
```
Additional Feature: 
1.Auto tagging article based on image content on upload
2.Tag Recommendation while user try to post new article based on available tags on all articles
```

## List of User Routes
|     Routes      | HTTP | Header(s) |                             Body                             |                           Response                           |        Description         |
| :-------------: | :--: | :-------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------------------------: |
| /register | POST |   none    | first_name:String(**required**),last_name:String(**required**),email: String (**required**),  password: String (**required**), image: String (**required**) | **Success**: Status(201) Register a user, **Error**: Status(500) Internal server error (Validation) |  Registered as a new user  |
|  /login   | POST |   none    | email: String (**required**), password: String (**required**) | **Success**: Status(200) Login as a user, **Error**: Status(500) Internal server error (Validation) |      Login as a user       |
|  /google  | POST |   none    | email: String (**required**), password: String (**required**) | **Success**: Status(200) Login as a user via Google, **Error**: Status(500) Internal server error (Validation) | Login as a user via Google |



## List of Article Routes

|     Routes      |  HTTP  | Header(s) |                             Body                             |                           Response                           |                Description                 |
| :-------------: | :----: | :-------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------: |
|    /articles    |  GET   |   token   |                             none                             | **Success**: Status(200) Get all posted articles, **Error**: Status(500) Internal server error (Validation) |       Get all user's posted articles       |
|    /articles?tags={tagName}    |  GET   |   token   |                             none                             | **Success**: Status(200) Get all posted articles, **Error**: Status(500) Internal server error (Validation) |  Get all user's posted articles that contatined spesific Tagname |
|    /articles    |  POST  |   token   | title: String (**required**), description: String (**required**),content: String (**required**), image: File (**optional**), userId: ObjectId (**required**), tags: (**optional**)| **Success**: Status(201) Create an article, **Error**: Status(500) Internal server error (Validation) |            Create a new article            |
| /articles /:id  |  GET   |   token   |                             none                             | **Success**: Status(200) Get details posted articles, **Error**: Status(500) Internal server error | Show details of spesific  posted articles  |
| /articles/user  |  GET   |   token   |                             none                             | **Success**: Status (200) show details of article, **Error**: Status(500) Internal server error | Show posted articles by authenticated user |
|  /articles/:Id  |  PUT   |   token   | title: String (**required**), description: String (**required**),content: String (**required**), image: File (**optional**), userId: ObjectId (**required**), tags: (**optional**) | **Success**: Status(200) Update an article, **Error**: Status(500) Internal server error (Validation) |              Updated  article              |
|  /articles/:Id  | DELETE |   token   |                             none                             | **Success**: Status(200) Delete an article, **Error**: Status(500) Internal server error (Validation) |             Delete an article              |
| /articles/tags  |  GET   |   token   |                             none                             | **Success**: Status (200) show list of tag, **Error**: Status(500) Internal server error | Show all unique tag available to authenticated user |
## Usage

```javascript
$ npm install
$ node app.js or $ npm run dev
```

Access server via `http://localhost:3000`<br>
Access client via `http://localhost:1234`