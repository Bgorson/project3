const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
const PORT = 8080
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
			io.to(roomKey).emit('enemy',[username,username1])
			new BattleLogic(waitingPlayer,username1,socket,username,roomKey)
			waitingPlayer = null;
			roomKey = null
		  } else {
			roomKey = username
			socket.join(roomKey)
			username1 = username
			waitingPlayer = socket;
			socket.emit('msg', {message:'Waiting for an opponent'+username1});
			socket.emit('room',roomKey)
		  }
	})
	
	socket.on('SEND_MESSAGE', function(data){
		io.emit('RECEIVE_MESSAGE', data)
	})
	socket.on("gameover", function(data){
		console.log("game is over")
		console.log(data,"winner")
		io.emit("win", data)
	})
	socket.on("hp", function(data){
		io.emit("hp",data)
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

