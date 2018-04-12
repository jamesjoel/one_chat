var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

var arr = {};
var user = "";
var x = "";
app.set('view engine', 'ejs');

app.use(bodyParser());

app.get('/', function(req, res){
	res.render(__dirname+"/index");
});

app.post('/', function(req, res){
	

	user = req.body.name;
	res.redirect('/chat');
});

app.get('/chat', function(req, res){
	res.render(__dirname+"/chat");
});

io.on('connection', function(socket){
	// console.log(socket.id);
	arr[user]=socket.id;
	socket.emit("sendername", { name : user});
	io.emit("online", { arr : arr, loggeinuser : user });

	socket.on('msg', function(data){
		console.log(data);

		io.to(arr[data.recname]).emit('message', { sender : data.sendername, msg : data.msg });
		
	});

});


http.listen(3000, function(){
	console.log("Running");
});



