import React, { Component } from 'react';
import MainButtons from './mainButtons'
import TowerBtn from './TowerBtn'
import axios from 'axios'
import './main.css';

class Main extends Component {  
    constructor() {
        super();
        this.state={
            topPlayerName:''
        }

    }
    componentDidMount(){
        console.log("checking for top player")
        axios.get('/leaderboard').then(response=>{
          console.log(response.data.username)
         this.setState({
           topPlayerName:response.data.username
         })
        })
    }
    render() { 
        return (
            <React.Fragment>
            <h4>Choose a mini game here</h4>
            <div>Leader Name: {this.state.topPlayerName}</div>

            <div className = "row">        
                <MainButtons />
                <TowerBtn />
            </div>
            </React.Fragment>
          );
    }
}
 
export default Main;