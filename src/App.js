import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import Navbar from './components/navbar'
import Login from './components/login'
import Main from './components/mainHub'
import Minigame1 from "./components/minigame1/components/Clickygame"
import StatInfo from './components/statinfo'
import Tower from "./components/tower/tower"

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      stat: [],
      userId: null,
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.getStats = this.getStats.bind(this)
    
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  //WHY IS THIS NOT GETTING STATS FROM AXIOS CALL?!
  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response)
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          // stat: response.data.user.stat,
          userId: response.data.user._id
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  getStats(){
    console.log("Should be looking for this",this.state.username)
    axios.get("/stats/"+ this.state.username).then(response =>{
      console.log(response.data,"new response")
      this.setState({
          stat:response.data.stat
      })
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
        exact path="/tower"
        render={()=>
       <Tower
       userName = {this.state.username}
       />}
        />

      </div>
    );
  }
}

export default App;
