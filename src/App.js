import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import Navbar from './components/navbar'
import Login from './components/login'
import Main from './components/mainHub'
import Minigame1 from "./components/minigame1/components/Clickygame"
import Minigame4 from "./components/minigame4/components/MiniGame4"
import StatInfo from './components/statinfo'
import Tower from "./components/tower/tower"



class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      stat: {},
      userId: null,
      win:null,
      lose:null
    }

    this.getUser = this.getUser.bind(this)
    // this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.getStats = this.getStats.bind(this)
    
  }

  // componentDidMount() {
  //   this.getUser()
  // }

  updateUser (userObject) {
    this.setState(userObject)
    this.getUser()
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
          lose:response.data.ratio.lose
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
          render={() =>
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
            <Signup/>}
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
        />
        <Main/>
        </React.Fragment>}
        />
{/* ===================================== */}
        <Route
        exact path="/minigame1"
        render={()=>
       <Minigame1/>}
        />

{/* ===================================== */}
        <Route
        exact path="/minigame4"
        render={()=>
       <Minigame4 />}
        />
        
{/* ===================================== */}
        <Route
        exact path="/tower"
        render={()=>
       <Tower
       userId= {this.state.userId}
       userName = {this.state.username}
       hp= {this.state.stat.hp}
       strength= {this.state.stat.strength}
       magic= {this.state.stat.magic}
       />}
        />

      </div>
    );
  }
}

export default App;
