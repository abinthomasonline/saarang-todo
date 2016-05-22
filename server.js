//------------server.js------------------------------


//------------imports--------------------------------

var express = require('express');                  	// node framework
var app = express();
var mongoose = require('mongoose');					// mondodb orm
var morgan = require('morgan');						// realtime request logs into console
var bodyParser = require('body-parser');			// json parser
var methodOverride = require('method-override');	// DELETE and PUT

//----------------------------------------------------





//-------------configuration--------------------------

mongoose.connect('mongodb://localhost/stdapp');		// Connect to db

app.use(express.static(__dirname + '/public'));		// static files folder
app.use(morgan('dev'));								// log requests to console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//----------------------------------------------------





//------------mongoose model--------------------------

var Todo = mongoose.model('Todo', {
	text : String
});

//----------------------------------------------------





//------------front-end route-------------------------

app.get('/', function(req, res) {
	res.sendfile('./public/index.html');
});

//----------------------------------------------------





//-------------get all todos route--------------------

app.get('/api/todos', function(req, res) {

	Todo.find(function(err, todos) {

		if(err)
			res.send(err);

		res.json(todos);
	});
});

//---------------------------------------------------





//---------------create new todo---------------------

app.post('/api/todos', function(req, res) {

	var temptodo = new Todo({
		text : req.body.text
	});

	temptodo.save(function(err) {

		if(err)
			res.send(err);

		Todo.find(function(err, todos) {

			if(err)
				res.send(err);

			res.json(todos);
		});
	});
});

//--------------------------------------------------





//-----------remove todo route----------------------

app.delete('/api/todos/:todoid', function(req, res) {

	Todo.remove({
		_id : req.params.todoid
	}, function(err, todo) {
		if(err)
			res.send(err);

		Todo.find(function(err, todos) {

			if(err)
				res.send(err);

			res.json(todos);
		});
	});
});

//--------------------------------------------------





//-----------edit todo------------------------------

app.put('/api/todos/:todoid/:todotext', function(req, res) {

	Todo.findByIdAndUpdate(req.params.todoid, {text : req.params.todotext}, 
		function(err, todo) {
			if(err)
				res.send(err);

			Todo.find(function(err, todos) {

				if(err)
					res.send(err);

				res.json(todos);
			});
		});
});

//--------------------------------------------------





//-----------listening to port 3000-----------------

app.listen(3000);
console.log("okke ready");

//---------------------------------------------------