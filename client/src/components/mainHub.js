import React, { Component } from 'react';
import MainButtons from './mainButtons'

import './main.css';


class Main extends Component {
    constructor(){
        super()

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