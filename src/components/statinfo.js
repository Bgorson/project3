import React, { Component } from 'react';
import axios from 'axios';
class StatInfo extends Component {
    constructor() {
        super()
        this.state = {
            stat: [],
            userId: null,
          }

    this.getStats = this.getStats.bind(this)
    }

    componentDidMount() {
        this.getStats()
     }

getStats(){
        axios.get("/stats/test").then(response =>{
          console.log(response.data,"new response")
          this.setState({
              stat:response.data.stat
          })
        })
      }

    render() { 
        console.log(this.props)
        return ( 
        <React.Fragment>
        <h1>Stats will go here</h1>
        <div>HP: {this.state.stat.hp}</div>
        <div>Strength: {this.state.stat.strength}</div>
        <div>Magic: {this.state.stat.magic}</div>
        </React.Fragment>
         );
    }
}
 
export default StatInfo;