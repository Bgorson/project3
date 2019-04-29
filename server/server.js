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
io.on('connection',onConnection);

function onConnection(socket) {
	console.log('New client connected', socket.id)
	socket.on('SEND_MESSAGE', function(data){
		io.emit('RECEIVE_MESSAGE', data)
	})

	if (waitingPlayer) {
		socket.emit("msg", "match starts")
		waitingPlayer = null;
	  } else {
		  console.log("not ready")
		waitingPlayer = socket;
		socket.emit('msg', 'Waiting for an opponent');
	  }


}




//=============================================

// Routes
app.get('/stats/:id', (req,res)=>{
	const id = req.params.id
	console.log("This is the username we are searching",id)
	User.findOne({ username:id}, (err,data)=> {
		if (err) {
			console.log("Some kind of err",err)
		}
		else {
			res.json(data)
		}
	})
})
app.use('/user', user)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
server.listen(SOCKETPORT, () => {
	console.log(`Socket listening on PORT: ${SOCKETPORT}`)
})

