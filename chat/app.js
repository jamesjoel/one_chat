var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');



var http = require('http').Server(app);

var io = require("socket.io")(http);

http.listen(3000, function(){
	console.log("Running");
});

app.set('view engine', 'ejs');


app.use(bodyParser());
app.use(session({secret : 'TSS'}));


app.get('/', function(req, res){
	// res.sendFile(__dirname+'/chat.html');



	console.log(req.session);
	res.render(__dirname+'/chat', { session : req.session });

	io.on("connection", function(socket){
		console.log("-------------", req.session.name);
		// socket.on('chat', function(data){
		// 	// socket.emit('chat', data);
		// 	// socket.broadcast.emit('chat', data);
		// 	io.emit('chat', data);
		// });
		socket.broadcast.emit('loggin', req.session.name);
	});

});
app.get('/user', function(req, res){
	res.sendFile(__dirname+'/user.html');

});
app.post('/user', function(req, res){
	req.session.name=req.body.name;
	res.redirect('/');
});





// var myname = io.of('myname');


// myname.on('connection', function(socket){

// });




