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
                    You had a great day at school and you’re in a rush to return home to hang out 
                    with your faithful companion {this.props.petname}. To save on time, you decide to take a shortcut 
                    through Kingsthon Hallow, even though it’s against your parents’ wishes. How hard could 
                    it be? It wasn’t long before you got lost. You look around but all you could see were 
                    trees. Nervously, you felt into your bag for {this.props.petname}'s favorite toy , but {this.props.petname} 
                    was nowhere to be found! You begin to panic. You are sure you packed {this.props.petname}. 
                    To make matters worse, you begin hear the growls of a wild animal nearby. You begin 
                    to run through Kingthon Hallow looking for any sanctuary you can find! Luckily, you 
                    stumble upon a cave in the forest. This is where your journey begins . . .  
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