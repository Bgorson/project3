const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('./client/src/server/passport');
// const socketio = require ('socket.io');
const BattleLogic = require( "./client/src/server/battle")
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./client/src/server/database') 
// Route requires
const user = require('./client/src/server/routes/user')
const db = require('./client/src/server/database//models/user')
const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();


// const server = app.listen(port, () => {
//     console.log("Listening on port: " + port);
// });
const server = require('http').createServer(app);	
 // io.set('transports', ['websocket']);



// Serve static files from the React app
if (process.env.NODE_ENV == 'production'){
	app.use(express.static(path.join(__dirname, 'client/build')));
	
}


// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false, //required
	})
)

app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser
// app.use('/user', user.router)
require("./client/src/server/routes/apiRoute")(app);
require("./client/src/server/routes/userRoute")(app);



// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (process.env.NODE_ENV == 'production'){
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
});
}
else {
	app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
	})
}


// const server= app.listen(port, () => {
// 	console.log(`App listening on PORT: ${port}`)
// })


// const app = require('express')();

const io = require('socket.io')(server);


//=============================================
// SocketIO 
let waitingPlayer = null;
let roomKey= null;
let rooms={}
// const server = http.createServer(app);
// const io = socketio(server);
var username;
var username1;
var petNumber;
var petNumber1;

let petNumberFun= function(type,color,access){
	if (type=== 'cat'){
		if(color === 'white'){
			if(access === 'bell'){

				return 2
				
			}
			else if (access === 'bandana'){
				return 3
			}

		}
		else if(color === 'orange'){
			if(access === 'bell'){
				return 5
				
			}
			else if (access === 'bandana'){
				return 4
				
			}
		}
	}
	else if (type ==='dog'){
		if(color === 'white'){
			if(access === 'bell'){
				return 1
				
			}
			else if (access === 'bandana'){
				return 0
			}
			
		}
		else if(color === 'orange'){
			if(access === 'bell'){
				return 5
			}
			else if (access === 'bandana'){
				return 6
			}
		}
	}
	else {
		return 0
	}
}


io.on('connection',onConnection);
function onConnection(socket) {
	console.log('New client connected', socket.id)
	socket.on('name',function(data){
		username= data.name
		petNumber = petNumberFun(data.petType,data.petColor,data.petAccess)
		console.log("the image index is " + petNumber)
		console.log("the user is", username)
	if (waitingPlayer) {
		socket.emit('room',roomKey)
		socket.join(roomKey)
		io.to(roomKey).emit('msg', {message: "***The match of " + username1 +' VS ' + username+ " is starting NOW! Choose your move on each turn***"});
		io.to(roomKey).emit('msg', {message: "FIGHT!"});
		io.to(roomKey).emit('enemy', {
			playerOne:username1,
			petOne:petNumber1,
			playerTwo:username,
			petTwo:petNumber
		});
		
		rooms[roomKey] = new BattleLogic(waitingPlayer,username1,socket,username,roomKey)
		waitingPlayer = null;
		roomKey = null
	} else {
		petNumber1 = petNumber
		roomKey = username
		rooms[roomKey] = {}
		socket.join(roomKey)
		username1 = username
		waitingPlayer = socket;
		socket.emit('msg', {message:'You are waiting for an opponent to join, '+username1+'...'});
		socket.emit('room',roomKey)
	  }
	})
	socket.on('SEND_MESSAGE_CHAT', function(data){
		let roomId = data.roomKey
		io.in(rooms[roomId].roomKey).emit('RECEIVE_MESSAGE', data)
		console.log((rooms[roomId].roomKey))

	})
	socket.on('SEND_MESSAGE', function(data){
		let roomId = data.roomKey
		io.in(rooms[roomId].roomKey).emit('RECEIVE_LOG', data)
		console.log((rooms[roomId].roomKey))

	})
	socket.on("gameover", function(data){
		let roomId = data.roomKey
		console.log("game is over")
		socket.to(rooms[roomId].roomKey).emit("winner", data)
	})
	socket.on("hp-client", function(data){
		console.log("sending hp from server")
		let roomId = data.roomKey
		io.to(rooms[roomId].roomKey).emit("hp",data)
	})
	socket.on("damage", function(data){
		console.log("sending damage from server")
		let roomId = data.roomKey
		io.to(rooms[roomId].roomKey).emit("damage",data)
	})

	socket.on('disconnect', function(){
		console.log(socket.id, "Disconnected")
	})
	socket.on('end', function(){
		console.log("disconnecting socket")
		socket.disconnect();
	})
	}

	
	server.listen(port);