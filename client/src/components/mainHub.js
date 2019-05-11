import React, { Component } from 'react';
import MainButtons from './mainButtons'
import TowerBtn from './TowerBtn'

import './main.css';


class Main extends Component {  
         
    
    render() { 
        return (
            <React.Fragment>
            <h4>Choose a mini game here</h4>
            <div className = "row">        
                <MainButtons />
                <TowerBtn />
            </div>
            </React.Fragment>
          );
    }
}
 
export default Main;