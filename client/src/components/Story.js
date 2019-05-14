import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Island from '../images/island.svg'

class Story extends Component {
    componentDidMount() {
        this.props.getStats()
     }
    render() {
        return (
            <div className="container">
                <img src={Island} className="island" alt="island"/>

                <Typography  className="story-content" component="p">
                    Welcome to Kingsthon Hallow

                    Your adventure began after a great day at school. You were in a rush to return home to hang out 
                    with your faithful companion, {this.props.petname}. To save on time, you decided to take a shortcut 
                    through the forest, even though it’s against your parents’ wishes. How bad could it be?
                    <br></br>
                    It wasn’t long before you got lost. 
                    <br></br>
                    In a panic you kept going deeper into the darker until all you could see were trees and hear faint whispers.
                    Nervously, you felt into your bag for {this.props.petname}'s favorite toy , but {this.props.petname} 
                    was nowhere to be found! You began to panic. 
                    To make matters worse, you hear the growls of a wild creatre nearby. You 
                    run through Kingthon Hallow looking for any sanctuary you can find! Luckily, you 
                    stumbled upon an opening in the forest with a tall Tower in the distance and {this.props.petname} ready to greet you!
                    
                    This is where your journey begins . . .  
                    <Button 
                        variant="contained" 
                        color="primary">    
                            <Link 
                                to="/main" 
                                className="btn btn-link">
                                CONT.
                            </Link>
                    </Button> 
                </Typography>
            </div>
        )
    }
}

export default Story;