import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
// components
import Login from './components/login'
import Navbar from './components/navbar'

import Signup from './components/sign-up'
import PetChoice from "./components/PetChoice"
import Story from './components/Story'

import Main from './components/mainHub'
import StatInfo from './components/statinfo'

//mini games + tower imports
import Minigame1 from "./components/minigame1/components/Clickygame"
import Minigame2 from "./components/minigame2/CardFlip.js"
import Minigame4 from "./components/minigame4/components/MiniGame4"
import Tower from "./components/tower/tower"
import Minigame3 from "./components/minigame3/components/MiniGame3"


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      stat: {},
      userId: null,
      win:null,
      lose:null,
      petname:'',
      topPlayerName:'',
      petType:'',
      petColor:'',
      petAccess:''
    }

    this.getUser = this.getUser.bind(this)
    // this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.getStats = this.getStats.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.topPlayer= this.topPlayer.bind(this)
  }

  // componentDidMount() {
  //   this.getUser()
  // }

  updateUser (userObject) {
    console.log("firing off updateUser ")
    this.setState(userObject)
    this.getUser()
  }
  signupUser (userObject) {
      console.log("firing off updateUser ")
      this.setState(userObject)
  }

  topPlayer(){
    console.log('delete e')
  }

  //WHY IS THIS NOT GETTING STATS FROM AXIOS CALL?!
  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
    
      if (response.data.user) {
        console.log(response.data.user._id)
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          // stat: response.data.user.stat,
          userId: response.data.user._id
        })
      } else {
        console.log("no user")
        this.setState({
          loggedIn: false,
          username: null,
          userId: null
        })
      }
    })
  }

  getStats(){
    console.log("Should be looking for this",this.state.username)
    if (this.state.username){
    axios.get("/stats/"+ this.state.username).then(response =>{
      this.setState({
          stat:response.data.stat,
          win:response.data.ratio.win,
          lose:response.data.ratio.lose,
          petname:response.data.petname,
          petType:response.data.petType,
          petColor:response.data.petColor,
          petAccess:response.data.petAccess,
      })
    })
  }
  else {
    return null
  }
}

  updatedStats(){
    axios.get("/stats/")
  }


  //function for leveling up
  //pass the USERNAME and the stat you want increased
  levelUp(username,stat){
    axios.post("/levelUp/"+username+"/"+stat, {stat}).then(function(error){
      if (error){
        console.log(error)
      }
      console.log("leveling up", stat)
    })
  }

  render() {
    return (
      <div className="App">
                 <Navbar
            updateUser={this.updateUser}
            loggedIn={this.state.loggedIn}
            />
    {this.state.loggedIn &&
      <p>Join the party, {this.state.username}!</p>
    }

{/* ===================================== */}
        {/* Routes to different components */}
        <Route
          exact path="/"
          render= { () =>
            <React.Fragment>
              <Login
                updateUser={this.updateUser}
              />
            </React.Fragment>}
        />
{/* ===================================== */}
        <Route
          path="/signup"

          render={() =>
            <Signup
            signUp={this.signupUser}
            />
          }

        />

{/* ===================================== */}

        <Route
          path="/petChoice"

          render={() =>
            <PetChoice
            userName = {this.state.username}
            />}

        />
{/* ===================================== */}
        <Route
          path="/story"

          render={() =>
            <Story
            getStats= {this.getStats}
            petname= {this.state.petname}/>
          }

        />
{/* ===================================== */}

        <Route

        path="/main"
        render={()=>
          <React.Fragment>
        <StatInfo
        // Send the current state of stats to be read by the block
        userId= {this.state.userId}
        getStats= {this.getStats}
        hp= {this.state.stat.hp}
        strength= {this.state.stat.strength}
        magic= {this.state.stat.magic}
        agility= {this.state.stat.agility}
        win= {this.state.win}
        lose= {this.state.lose}
        getUser= {this.getUser}
        petname= {this.state.petname}


        />
        <Main
       petname= {this.state.petname}
       petType= {this.state.petType}
       petColor= {this.state.petColor}
       petAccess= {this.state.petAccess}
                />
</React.Fragment>
        }
/>

{/* ===================================== */}
        <Route
          exact path="/miniGame1"
          render= { () =>
            <Minigame1
            userId= {this.state.userId}
            userName= {this.state.username}
            levelUp= {this.levelUp}
            strength= {this.state.stat.strength}
            />
        }
        />

{/* ===================================== */}

<Route
          exact path="/miniGame2"
          render= { () =>
            <Minigame2
            userId= {this.state.userId}
            userName= {this.state.username}
            levelUp= {this.levelUp}
            magic= {this.state.stat.magic}
            />
        }
        />


{/* ===================================== */}
{/* ===================================== */}
        <Route
          exact path="/miniGame3"
          render= { () =>
            <Minigame3
            userId= {this.state.userId}
            userName= {this.state.username}
            levelUp= {this.levelUp}
            agility= {this.state.stat.agility}
            />
        }
        />


{/* ===================================== */}
        <Route
          exact path="/minigame4"
          render= { () =>
            <Minigame4 
              userId= {this.state.userId}
              userName= {this.state.username}
              levelUp= {this.levelUp}
              strength= {this.state.stat.strength}
            />
          }
        />
        
{/* ===================================== */}
        <Route
          exact path="/tower"
          render= { () =>
            <Tower
            userId= {this.state.userId}
            userName = {this.state.username}
            hp= {this.state.stat.hp}
            strength= {this.state.stat.strength}
            magic= {this.state.stat.magic}
            />
          }
        />
{/* ===================================== */}

     </div>
    )};
  
}

export default App;
