var express = require('express');
var todoController = require('./controllers/todoControllers');

var app = express();




//set template engine
app.set('view engine', 'ejs');


//static file loader
app.use(express.static('./public'));

//Fire controllers
todoController(app);



//listen to port

app.listen(3000);
console.log('I am listening to port 3000');
