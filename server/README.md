# mini-wp
mini-wp

### Link
https://travelwp.melinadewi.club/

### API Route

Route | HTTP | Header | Body | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/user/create` | POST | - | {username, email, password} | {_id, username, email, password} | Create a user | email must be valid, password minimum 6 characters
`/user/login` | POST | - | {email, password} | {access_token} | Login | -
`/article` | GET | - | - | [{ _id, title, content, imgUrl, author }] | get all articles | -
`/article/read/:articleId` | GET | - | - | { _id, title, content, imgUrl, author } | read an articles | -
`/article/create` | POST | token | { title, content, imgUrl } | { _id, title, content, imgUrl, author } | create a new article | -
`/article/:articleId` | PATCH | token | { title, content } | { _id, title, content, imgUrl, author } | edit an article | -
`/article/:articleId` | DELETE | token | - | - | delete an article | -