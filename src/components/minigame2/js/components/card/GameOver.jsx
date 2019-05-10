import React, { Component } from 'react'

const GameOver = ({ restartGame }) => (
    <div className="justify-center">
    <h1> Game Over!</h1>
    <h3> If you enjoyed playing this game and wish to increase you magic again, click the button below!</h3>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
    </div>
);

export default GameOver;

