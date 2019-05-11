import React, { Component } from 'react';
import MainButtons from './mainButtons'
import TowerBtn from './TowerBtn'

import './main.css';


<<<<<<< HEAD:src/components/mainHub.js
class Main extends Component {
    constructor(){
        super()

    }
     
=======
class Main extends Component {  
         
    
>>>>>>> develop:client/src/components/mainHub.js
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