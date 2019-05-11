const passport = require('../passport/index');
const User = require('../database/models/user')

module.exports = function (app) {
    app.post('/user', (req, res) => {
        console.log('user signup');
        const { username, password, stat, ratio } = req.body
       
        // ADD VALIDATION
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                })
            }
            else {
                const newUser = new User({
                    username: username,
                    password: password,
                    stat: stat,
                    ratio:ratio,
                    petname:'',
                    petType:'',
                    petColor:'',
                    petAcces:''
                })
                newUser.save((err, savedUser) => {
                    if (err) return res.json(err)
                    console.log("ssaved User",savedUser)
                    res.json(savedUser)
                })
            }
        })
    })
    
    app.post(
        '/user/login',
        function (req, res, next) {
            console.log('routes/user.js, login, req.body: ');
            console.log(req.body)
            next()
        },
        passport.authenticate('local'),
        (req, res) => {
            console.log('logged in', req.user);
            var userInfo = {
                username: req.user.username,
                stat: req.user.stat,
                ratio: req.user.ratio
            };
            res.send(userInfo);
        }
    )
    
    app.get('/user', (req, res, next) => {
        console.log('===== user!!======')
        console.log(req.user)
        console.log("above")
        console.log(req.body)
        if (req.user) {
            res.json({ user: req.user })
        } else {
            res.json({ user: null })
        }  
    })
    
    app.post('/user/logout', (req, res) => {
        if (req.user) {
            req.logout()
            res.send({ msg: 'logging out' })
        } else {
            res.send({ msg: 'no user to log out' })
        }
    })
    
    
}