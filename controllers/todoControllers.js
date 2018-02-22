var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to MongoDB database
mongoose.connect('mongodb://test:Test@ds247178.mlab.com:47178/todo');


//Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);



var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){


  app.get('/todo', function(req, res){
    //Get data from mongodb then pass too the view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })

  });

  app.post('/todo', urlencodedParser, function(req, res){
    //Get data frow view and and add to MongoDB
    var newTodo = Todo(req,body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delete item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if (err)throw err;
      res.render('todo', {todos: data})
    });

  });
}
