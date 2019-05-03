import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import './main.css';
import logo from '../logo.svg';

class Main extends Component {
    state = { 

     }
    render() { 
        return (
            <React.Fragment>
            <h4>Choose a mini game here</h4>
            <div className = "row">
                <div className = "colm">
                
                    <Link to = "/miniGame1">
                    <img src={logo} className="wildlyfe-logo" alt="logo" />
                    </Link>
               </div>

               <div className = "colm">
                    <Link to = "/miniGame2">
                    <img src={logo} className="wildlyfe-logo" alt="logo" />
                    </Link>
                </div>

                <div className = "colm">
                    <Link to = "/miniGame3">
                    <img src={logo} className="wildlyfe-logo" alt="logo" />
                    </Link>
                </div>

                <div className = "colm">
                    <Link to = "/miniGame4">
                    <img src={logo} className="wildlyfe-logo" alt="logo" />
                    </Link>
                </div>

                <div className = "colm">
                    <Link to = "/tower">
                    <button>The Tower</button>
                    </Link>
                </div>
            </div>
            </React.Fragment>
          );
    }
}
 
export default Main;