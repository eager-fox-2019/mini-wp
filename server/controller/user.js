const User = require('../models/User')
const jwt = require('../helpers/jwt.js')
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(`${process.env.GOOGLESIGNINID}`)

class UserController {
    static register(req, res, next) {
                console.log(req.body);
                
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            avatar : "https://image.flaticon.com/icons/png/512/78/78373.png"
        }
        User.create(newUser)
            .then((gotData) => {
                res.json(gotData)
            })
            .catch(next)

    }

    static findByemail(req,res,next){
        User.findOne({email : req.params.email})
        .then((gotData)=>{
            if(gotData){
                res.json(gotData)
            } else {
                throw {code : 404, message: "not found"}
            }
        })
        .catch(next)
    }
    static login(req, res, next) {
        console.log("masuk login");
        
        User.findOne({
                email: req.body.email
            })
            .then((gotData) => {
                if (!gotData) {
                    throw ({
                        code: 404,
                        message: " Email Not Found"
                    })
                } else {
                    if (bcrypt.compareSync(req.body.password, gotData.password)) {
                        let userData = {
                            id: gotData.id,
                            email: gotData.email
                        }
                        let userToken = jwt.sign(userData)
                        res.status(200).json({
                            token : userToken,
                            email : gotData.email,
                            id : gotData.id
                        })

                    } else {
                        res.status(400).json({
                            message: "Email / Password Not Match"
                        })
                    }
                }
            })
            .catch(next)
    }

    static googlelogin(req,res,next){
        console.log("masuk google login");
        console.log(req.body);
        
        
        let userEmail = ""
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLESIGNINID
        })
        .then((gotData)=>{
            const { email, name, picture } = gotData.getPayload();
            let fullName = name.split(" ")
            let firstName = fullName[0]
            let lastName = fullName[1]
            User.findOne({email: email})
            .then((gotData)=>{
                if(gotData){
                    let userData = {
                        id : gotData.id,
                        email : gotData.email
                    }
                    let userToken = jwt.sign(userData)
                    res.status(200).json({
                        token : userToken,
                        email : gotData.email,
                        id : gotData.id
                    })
                } else {
                    let newUser = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: "defaultPassword",
                        avatar : picture
                    }
                    User.create(newUser)
                    .then((gotData)=>{
                        let userData = {
                            id: gotData.id,
                            email: gotData.email
                        }
                        let userToken = jwt.sign(userData)
                        res.status(200).json({
                            token : userToken,
                            userProfile : gotData
                        })
                    })
                    .catch(next)
                }
            })
            .catch(next)
        })
    }

    static edit(req,res,next){
        User.findOne({_id:req.params.id})
        .then((gotData)=>{
            gotData.first_name = req.body.first_name,
            gotData.last_name = req.body.last_name,
            gotData.email = req.body.email,
            gotData.username = req.body.username,
            gotData.password = req.body.password
            return gotData.save()
        })
        .then((sucsess)=>{
            if(sucsess){
                res.json(sucsess)
            } else {
                throw {code : 500, message : "internal server error"}
            }
        })
        .catch(next)
    }

}

module.exports = UserController