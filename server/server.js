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


const server = http.createServer(app);
const io = socketio(server);
var username;
var username1;
io.on('connection',onConnection);

//Dealing with more than 2 connections
//Use a Math.random to create a key. 
// join the key, after wiating player = true
// join and empty the key
//socket.join(math.random)
function onConnection(socket) {
let localBattle;

	console.log('New client connected', socket.id)
	socket.on('name',function(data){
		username= data
		console.log(username)
		if (waitingPlayer) {
			localBattle= new BattleLogic(waitingPlayer,username1,socket,username)
			waitingPlayer = null;
		  } else {
			//connect socket to player ID
			username1 = username
			waitingPlayer = socket;
			socket.emit('msg', {message:'Waiting for an opponent'+username1});
		  }
	})

	socket.on('SEND_MESSAGE', function(data){
		io.emit('RECEIVE_MESSAGE', data)
	})
	socket.on('hp',function(data){
		console.log(data)
		io.emit('hp',data)
	})
	socket.on("lost", function(data){
		io.emit("msg", {message: data.username+ " has lost!"} )
		User.findOneAndUpdate({username:data.username}, { $inc: {"ratio.lose" : 1}}, {new:true}, function(err,response){
			if (err) {
				(err);
			} else {
				(response)
			}
		})
		io.emit("lost")
		console.log("loser detected",data.username)
		if (data.username != username1){
			io.emit("winner", {username:username1})
			console.log(username1 + " won")
			User.findOneAndUpdate({username:username1}, { $inc: {"ratio.win" : 1}}, {new:true}, function(err,response){
				if (err) {
					(err);
				} else {
					(response)
				}
			})
		}
		else{
			io.emit("winner", {username:username})
			console.log(username + " won")
			User.findOneAndUpdate({username:username}, { $inc: {"ratio.win" : 1}}, {new:true}, function(err,response){
				if (err) {
					(err);
				} else {
					(response)
				}
			})
		}
	})

	socket.on("winner",function(data){
		console.log("active")

	})




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
app.use('/user', user.router)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
server.listen(SOCKETPORT, () => {
	console.log(`Socket listening on PORT: ${SOCKETPORT}`)
})

