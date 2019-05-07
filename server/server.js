const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
const PORT = process.env.PORT || 8080
const SOCKETPORT = 9090
const socketio = require ('socket.io');
const http = require('http');
const RpsGame = require("./towerLogic")
const BattleLogic = require( "./battle")

// Route requires
const user = require('./routes/user')



// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(express.static("public"));
// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false, //required
		cookie: {
			secure: false,
			maxAge: 3600000 //1 hour
		}
	})
)

// Passport,
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser
//=============================================
// SocketIO 
let waitingPlayer = null;
let roomKey= null;
let rooms={}
const server = http.createServer(app);
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
			io.to(roomKey).emit('msg', {message:'Waiting?!?'});
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
			socket.emit('msg', {message:'Waiting for an opponent'+username1});
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

//=============================================
// Routes

require("./routes/apiRoute")(app);
app.use('/user', user.router)

//=============================================
// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
server.listen(SOCKETPORT, () => {
	console.log(`Socket listening on PORT: ${SOCKETPORT}`)
})

