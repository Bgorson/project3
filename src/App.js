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



  render() {
    return (
      <div className="App">
    {this.state.loggedIn &&
    <p>Join the party, {this.state.username}!</p>
    }
{/* ===================================== */}
        {/* Routes to different components */}
        <Route
          exact path="/"
          render={() =>
            <React.Fragment>
            <Navbar
            updateUser={this.updateUser}
            loggedIn={this.state.loggedIn}
            />
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
        getStats= {this.getStats}
        stat = {this.state.stat}
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

      </div>
    );
  }
}

export default App;
