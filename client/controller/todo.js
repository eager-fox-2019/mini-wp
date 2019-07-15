const Todo = require('../models/Todo')
const jwt = require('../helpers/jwt')

class TodoController {
    static findAll(req,res,next){
       let decodeToken = jwt.decode(req.headers.token)
       Todo.find({UserId :decodeToken.id })
       .then((foundTodo)=>{
           if(!foundTodo){
               throw ({status : 404, message : "Not Found"})
           } else {
                res.json(foundTodo)
           }
       })
       .catch(next)

    }

    static findByPk(req,res,next){
        Todo.findById(req.params.id)
        .then((foundTodo)=>{
            if(!foundTodo){
                throw ({code : 404, message : "Not Found"})
            } else {
                 res.json(foundTodo)
            }
        })
        .catch(next)
    }

    static create(req,res,next){
        let decodeToken = jwt.decode(req.headers.token)
        let newTodo = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
            importantStatus : req.body.importantStatus || false,
            UserId: decodeToken.id
        }
        Todo.create(newTodo)
            .then((gotData)=>{
                res.json(gotData)
            })
            .catch(next)

    }  
    static delete(req,res,next){
        Todo.findByIdAndDelete(req.params.id)
        .then((foundTodo)=>{
            if(!foundTodo){
                throw ({code : 404, message : "Not Found"})
            } else {
                 res.json(foundTodo)
            }
        })
        .catch(next)

    }
    static update(req,res,next){
        Todo.findOne({_id : req.params.id})
        .then((foundTodo)=>{
            if(!foundTodo){
                throw ({code : 404, message : "Not Found"})
            } else {
                 foundTodo.set(req.body)
                 return foundTodo.save()
            }
        })
        .then((savedTodo)=>{
            res.json(savedTodo)
        })
        .catch(next)
    }
}

module.exports = TodoController