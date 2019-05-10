const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('./client/src/server/passport');
const socketio = require ('socket.io');
const BattleLogic = require( "./client/src/server/battle")
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./client/src/server/database') 
// Route requires
const user = require('./client/src/server/routes/user')

const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
const server= app.listen(port, () => {
	console.log(`App listening on PORT: ${port}`)
})

//=============================================
// SocketIO 
let waitingPlayer = null;
let roomKey= null;
let rooms={}
// const server = http.createServer(app);
const io = socketio(server);
var username;
var username1;

io.on('connection',onConnection);
function onConnection(socket) {
	console.log('New client connected', socket.id)
	
	socket.on('name',function(data){
		username= data
		if (waitingPlayer) {
			socket.emit('room',roomKey)
			socket.join(roomKey)
			io.to(roomKey).emit('msg', {message:'Game Starting NOW! '});
			io.to(roomKey).emit('enemy', {
				playerOne:username1,
				playerTwo:username
			});
			rooms[roomKey] = new BattleLogic(waitingPlayer,username1,socket,username,roomKey)
			console.log(rooms)
			waitingPlayer = null;
			roomKey = null
		  } else {
			roomKey = username
			rooms[roomKey] = {}
			socket.join(roomKey)
			username1 = username
			waitingPlayer = socket;
			socket.emit('msg', {message:'Waiting for your opponent, '+username1+'.'});
			socket.emit('room',roomKey)
		  }
	})
	
	socket.on('SEND_MESSAGE', function(data){
		let roomId = data.roomKey
		io.in(rooms[roomId].roomKey).emit('RECEIVE_MESSAGE', data)
		console.log((rooms[roomId].roomKey))

	})
	socket.on("gameover", function(data){
		let roomId = data.roomKey
		console.log("game is over")
		io.in(rooms[roomId].roomKey).emit("gameover", data)
	})
	socket.on("hp", function(data){
		let roomId = data.roomKey
		socket.to(rooms[roomId].roomKey).emit("hp",data)
	})
	socket.on("damage", function(data){
		let roomId = data.roomKey
		socket.to(rooms[roomId].roomKey).emit("damage",data)
	})

	

	}