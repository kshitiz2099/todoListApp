//Helper code for accessing the database

var db=require('../models');

//Get all the data
exports.getTodos=function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
}

//Create a new item in db
exports.createTodo=function(req, res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err)
    })
}

//Update an item in db
exports.updateTodo=function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}

//Find a particular item in db
exports.getTodo=function(req,res){
    db.Todo.findById(req.params.todoId)
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}

//Delete an item
exports.deleteTodo=function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: "Deleted"});
    })
    .catch(function(err){
        res.send(err);
    });
}

module.exports=exports;