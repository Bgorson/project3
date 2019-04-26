import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

class Main extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
            <h1>
                You're logged in!
            </h1>
            <h4>Choose a mini game here</h4>
            <Link to = "/miniGame1">
            <button>MiniGame 1</button>
            </Link>
            <Link to = "/miniGame2">
            <button>MiniGame 2</button>
            </Link>
            <Link to = "/miniGame3">
            <button>MiniGame 3</button>
            </Link>
            <Link to = "/miniGame4">
            <button>MiniGame 4</button>
            </Link>
            <Link to = "/tower">
            <button>The Tower</button>
            </Link>
            </React.Fragment>
          );
    }
}
 
export default Main;