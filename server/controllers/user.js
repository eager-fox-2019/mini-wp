const User = require('../models/user')
const { compareSync } = require('../helpers/hashPass')
const { sign } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserCont {
  static GoogleSignIn(req, res, next) {
    let payload = null
    let newPass = null
    let code = 500
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload();
        const userid = payload['sub']
        return User.findOne({ email: payload.email })
      })
      .then((row) => {
        if (!row) {
          code = 201
          newPass = randomPass()
          return User.create({
            name: payload.name,
            email: payload.email,
            password: newPass
          })
        }
        code = 200
        return row
      })
      .then(row => {
        payload = {
          _id: row._id,
          name: row.name,
          email: row.email
        }
        let data = {
          'access-token': sign(payload, process.env.KUNCI),
          _id: row._id,
          name: row.name,
          email: row.email
        }
        if (newPass) data.newPass = newPass
        res.status(code).json(data)
      })
      .catch(next)
  }

  static register(req, res, next) {    
    let exclude = ['image_url', '__v', 'createdAt', 'updatedAt']
    let obj = {}
    if(req.file)
    obj.image_url = req.file.cloudStoragePublicUrl
    
    User.schema.eachPath(path => {
      if (!exclude.includes(path)) {
        if (req.body[path])
        obj[path] = req.body[path]
      }
    })
    
    User.create(obj)
      .then(row => {
        console.log('berhasil');
        
        res.status(201).json(row)
      })
      .catch(next)
  }

  static login(req, res, next) {
    User.findOne({
      email: req.body.email,
    })
      .then(row => {
        if (row) {
          let isSame = compareSync(req.body.password, row.password)
          if (isSame) {
            let payload = {
              _id: row._id,
              name: row.name,
              email: row.email,
              image_url: row.image_url
            }
            let token = sign(payload, process.env.KUNCI)
            console.log(token);
            
            res.status(200).json({
              'access-token': token,
            })
          }
          else next({ code: 422, message: 'Wrong email/password' })
        }
        else
          next({ code: 422, message: 'Wrong email/password' })
      })
      .catch(next)
  }

  static readOne(req,res,next) {
    User.findById(req.decoded._id)
    .then(row =>{
      let user = {
        _id: row._id,
        name: row.name,
        email: row.email,
        image_url: row.image_url,
      }
      console.log(user);
      
      res.json(user)
    })
    .catch(next)
  }

  static update(req, res, next) {
    let obj = {}
    let exclude = ['image_url', '_id', '__v', 'createdAt', 'updatedAt']

    if (req.file) {
      obj.image_url = req.file.cloudStoragePublicUrl
    }

    if (req.method === "PATCH") {
      User.schema.eachPath(path => {
        if (!exclude.includes(path)) {
          if (req.body[path])
            obj[path] = req.body[path]
        }
      })
    }
    else {
      User.schema.eachPath(path => {
        if (!exclude.includes(path)) {
          obj[path] = req.body[path]
        }
      })
    }

    User.findByIdAndUpdate(req.decoded._id, obj, { new: true })
      .then(row => {
        res.json(row)
      })
      .catch(next)
  }
}

module.exports = UserCont