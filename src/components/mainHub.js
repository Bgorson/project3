import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import MainButtons from './mainButtons'

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
                <MainButtons />
            </div>
            </React.Fragment>
          );
    }
}
 
export default Main;