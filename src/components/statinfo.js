import React, { Component } from 'react';
class StatInfo extends Component {
    constructor() {
        super()
        this.state = {
            stat: [],
            userId: null,
          }
    }

    componentDidMount() {
        this.props.getStats()
     }



    render() { 
        return ( 
        <React.Fragment>
        <h1>Stats will go here</h1>
        <div>HP: {this.props.hp}</div>
        <div>Strength: {this.props.strength}</div>
        <div>Magic: {this.props.magic}</div>
        <div>Agility: {this.props.agility}</div>
        <div>Wins: {this.props.win} Loses: {this.props.lose}</div>
        </React.Fragment>
         );
    }
}
 
export default StatInfo;