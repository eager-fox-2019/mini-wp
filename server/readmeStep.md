1. Install : npm install --save 
  - bcryptjs
  - cors
  - dotenv
  - express
  - jsonwebtoken
  - mongoose
2. Make folder: controllers, helpers, middlewares, models, routes
3. Make file
  - .gitignore node_modules && .env
  - app.js
    - change database name
  - routes: index.js model.js
  - models: model.js modelUser.js modelBlacklistToken.js
  - middlewares: author_authen.js errorHandlers.js
  - helpers: hashHelpers.js jwtHelper.js
  - controller: controllerUser.js controllerModel.js
  - .env :
    - JWT_TOKEN=


bikin read filter
tambah permissions field "edit delete" di setiap post dari API
read filter by userId di client