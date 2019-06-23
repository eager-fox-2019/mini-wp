const User = require('../models/user')
const Article = require('../models/article')
const Helper = require('../helpers/helper')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static signup(req, res) {        
        const {email, password, name} = req.body

        User.create({
            name, email, password
        })
        .then(user=> {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(400).json({msg: err})
        })
    }

    static list(req, res) {
        User.find({})
        .then(user=> {
            if(user) {
                res.status(200).json(user)
            }else{
                res.status(400).json('User not found')
            }
        })
        .catch(err => {
            res.status(400).json({msg:err})
        })
    }

    static signin(req, res) {
        const {email, password} = req.body

        User.findOne({
            email
        })
        .then(user => {
            if(!user) {
                console.log('1');
                res.status(400).json({err: 'Username/password wrong'})
            } else {
                if( Helper.comparePassword(password, user.password) ) {
                    let token = Helper.generateJWT({
                        email: user.email,
                        name: user.name,
                        id: user._id
                    });

                    let finalToken = {
                        token,
                        id: user._id,
                        name: user.name,
                        email: user.email
                    };

                    res.status(200).json(finalToken)
                }else{
                console.log('2');

                    res.status(400).json({err: 'Username/password wrong'})
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({msg: err})
        })
    }

    static signInGoogle(req, res) {
        let newEmail = ''
        let newName = ''

        client.verifyIdToken({
                idToken: req.headers.token,
                audience: process.env.CLIENT_ID
            })
            .then(function(ticket) {
                newEmail = ticket.getPayload().email
                newName = ticket.getPayload().name
                return User.findOne({
                    email: newEmail
                })
            })
            .then(function(userLogin) {
                if (!userLogin) {
                    return User.create({
                        name: newName,
                        email: newEmail,
                        password: 'password'
                    })
                } else {
                    return userLogin
                }
            })
            .then(function(newUser) {
                let token = Helper.generateJWT({
                    email: newUser.email,
                    name: newUser.name,
                    id: newUser._id
                });

                let obj = {
                    token,
                    id: newUser._id,
                    name: newUser.name
                }
                res.status(200).json(obj)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static createArticle(req, res) {
        const {name, content} = req.body

        Article.create( {
            name,
            content,
        } )
        .then(article => {
            res.status(201).json(article)
        })
        .catch(err => {
            res.status(500).json({msg: err})
        })
    }

    static findUserArticle(req, res) {
        const id=req.params.id

        Article.find({userId:id})
        .then(todos=> {
            res.status(201).json(todos)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController
