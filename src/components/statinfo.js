import React, { Component } from 'react';

class StatInfo extends Component {
    render() { 
        return ( 
        <React.Fragment>
        <h1>Stats will go here</h1>
        <div>HP: {this.props.stats.hp}</div>
        <div>Strength: {this.props.stats.strength}</div>
        <div>Magic: {this.props.stats.magic}</div>
        </React.Fragment>
         );
    }
}
 
export default StatInfo;