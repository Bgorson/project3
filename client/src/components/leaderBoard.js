import React, { Component } from 'react';
class LeaderBoard extends Component {
    constructor() {
        super();
        this.state={
            topPlayerName:''
        }
    }
    componentDidMount(){
        this.props.topPlayer()
    }
    render() { 
        return ( 
            <div>
                Top Player:
                {this.state.topPlayerName}

            </div>


         );
    }
}
 
export default LeaderBoard;