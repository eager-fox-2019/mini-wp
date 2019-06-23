# MINI WP API
## Route List :

#### User route

Route | HTTP | Header(s) | Body | Description
----- | ---- | --------- | ---- | -----------
/user/register | POST | none | name: String, email: string (**required**), password: string | Register new user
/user/login | POST | none | email: string (**required**), password: string (**required**) | Login / acquire new token
/glogin | POST | none | none | Login / acquire new token via google sign in


#### article route

Route | HTTP | Header(s) | Body | Params | Description
----- | ---- | --------- | ---- | ------- | ----
/article | GET | token: string (**required**)  | none | none | return all post
/article | POST | token: string (**required**)  | title: String, content: String | none | Add new article
/article/:id | PUT | token: string (**required**) | title: String, content: String | none | update an article
/article/:id | DELETE | token: string (**required**) | none | none | Delete article

## Usage
Make sure you have node.js and  npm installed on your computer, and then run these commands:

> $ npm install

> $ npm run dev 

> $ npm start