import React, { PropTypes } from 'react'

const style = () => {
    return {
        container: {
            textAlign: 'center'
        },
        info:{
            display: 'flex',
            flexFlow: 'row nowrap', 
            justifyContent: 'space-around'
        }
    };
};

const GamePlay = ({
    timeElapsed,
    playerScore,
    highScore
}) => {
    const { container, info } = style();
    return (
        <div style={container}>
            <h3>Use arrows to move.</h3>
            <div style={info}>
                <p> Time: {timeElapsed}</p>
                <p> Score: {playerScore}</p>
                <p> High Score: {highScore}</p>
            </div>
        </div>
    )
}

GamePlay.PropTypes = {
    timeElapsed: PropTypes.number.isRequired,
    playerScore: PropTypes.number.isRequired,
    highScore: PropTypes.number.isRequired,
};

export default GamePlay;