const passport = require('../passport/index');
const User = require('../database/models/user')

module.exports = function (app) {
//Route to restrive all information on a username
    app.get('/stats/:id', (req,res)=>{
	username= req.params.id
	console.log(username)
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

//Route to get pet info into database
app.post("/pets/:id",(req,res)=>{
    passport.authenticate('local')
	let username = req.params.id
    console.log("posting pet info", req.body)
    const { petname, petType, petColor, petAccess } = req.body
    User.findOneAndUpdate({ username:username}, 
        {$set:{
                petname:petname,
                petType:petType,
                petColor:petColor,
                petAccess:petAccess
        }},        
        (err,data)=> {
		if (err) {
			console.log("Some kind of err",err)
		}
	})
})

//Route to signal a win in the Tower
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
//Route to signal a lose in the Tower
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
//Route to level up strength
app.post('/levelUp/:id/strength', (req, res)=>{
	let user = req.params.id 
	let stat= req.params.stat
	console.log(stat)
	User.findOneAndUpdate({username:user}, { $inc: { "stat.strength" : 10 } }, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
	})
//Route to level up magic
app.post('/levelUp/:id/magic', (req, res)=>{
	let user = req.params.id 
	let stat= req.params.stat
	console.log(stat)
	User.findOneAndUpdate({username:user}, { $inc: { "stat.magic" : 10 } }, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
    })

//Route to level up hp
app.post('/levelUp/:id/hp', (req, res)=>{
	let user = req.params.id 
	let stat= req.params.stat
	console.log(stat)
	User.findOneAndUpdate({username:user}, { $inc: { "stat.hp" : 10 } }, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
    })
//Route to level up agility
app.post('/levelUp/:id/agility', (req, res)=>{
	let user = req.params.id 
	let stat= req.params.stat
	console.log(stat)
	User.findOneAndUpdate({username:user}, { $inc: { "stat.agility" : 10 } }, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
    })
    
}