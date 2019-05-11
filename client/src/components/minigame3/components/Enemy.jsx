//Dimensions. Speed. How often.
import React, {Component, PropTypes} from 'react';
import { Player } from 'components';

class Enemy extends Component {
    componentDidUpdate() {
        const { size, playerPosition, info: { top, left }} = this.props;

        if ( playerPosition.left < (left + size) &&
            playerPosition.top < (top + size) &&
            (playerPosition.left + size) > left && 
            (playerPosition.top + size) > top) {
                
                this.props.onCollide()
            }
    }

    render() { 
        const { size, info: {top, left }} = this.props;
        
        return (
            <Player 
                size={size}
                position={{ top, left}}
                color='firebrick' />
        );
    }
}

Enemy.PropTypes = {
    size: PropTypes.number.isRequired,
    info: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        dir: PropTypes.string.isRequired
    }),
    playerPosition: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired
    }),
    onCollide: PropTypes.func.isRequired
};

export default Enemy;