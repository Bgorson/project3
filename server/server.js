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
const User = require('./database/models/user')

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
		saveUninitialized: false //required
	})
)

// Passport
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
		console.log(data,"winner")
		io.emit("win", data)
	})
	// socket.on('hp',function(data){
	// 	console.log(data)
	// 	io.to("test").emit('hp',data)
	// })
	// socket.on("lost", function(data){
	// 	io.to("test").emit("msg", {message: data.username+ " has lost!"} )
	// 	User.findOneAndUpdate({username:data.username}, { $inc: {"ratio.lose" : 1}}, {new:true}, function(err,response){
	// 		if (err) {
	// 			(err);
	// 		} else {
	// 			(response)
	// 		}
	// 	})
	// 	io.to("test").emit(roomKey,"lost")
	// 	console.log("loser detected",data.username)
	// 	if (data.username != username1){
	// 		io.to("test").emit("winner", {username:username1})
	// 		console.log(username1 + " won")
	// 		User.findOneAndUpdate({username:username1}, { $inc: {"ratio.win" : 1}}, {new:true}, function(err,response){
	// 			if (err) {
	// 				(err);
	// 			} else {
	// 				(response)
	// 			}
	// 		})
	// 	}
	// 	else{
	// 		io.to("test").emit("winner", {username:username})
	// 		console.log(username + " won")
			// User.findOneAndUpdate({username:username}, { $inc: {"ratio.win" : 1}}, {new:true}, function(err,response){
			// 	if (err) {
			// 		(err);
			// 	} else {
			// 		(response)
			// 	}
			// })
	// 	}
	// })

	// socket.on("winner",function(data){
	// 	console.log("active")

	// })



	}
//=============================================

// Routes
app.get('/stats/:id', (req,res)=>{
	username= req.params.id
	console.log("This is the username we are searching",username)
	User.findOne({ username:username}, (err,data)=> {
		if (err) {
			console.log("Some kind of err",err)
		}
		else {
			res.json(data)
		}
	})
})

app.post('/tower/win/:id', (req,res)=>{
	username= req.params.id
	console.log("hitting win route for:" + username)
	User.findOneAndUpdate({username:username}, { $inc: {"ratio.win" : 1}}, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
})
app.post('/tower/lose/:id', (req,res)=>{
	username= req.params.id
	console.log("hitting lose route for:" + username)
	User.findOneAndUpdate({username:username}, { $inc: {"ratio.lose" : 1}}, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
})
app.use('/user', user.router)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
server.listen(SOCKETPORT, () => {
	console.log(`Socket listening on PORT: ${SOCKETPORT}`)
})

