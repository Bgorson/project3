import React, { Component } from 'react';
import axios from 'axios';
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
        <h4>Stats</h4>
        <div>
            HP: {this.props.hp}
            Strength: {this.props.strength}
            Magic: {this.props.magic}
        </div>
        </React.Fragment>
         );
    }
}
 
export default StatInfo;