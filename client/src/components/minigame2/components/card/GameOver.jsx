import React, { Component } from 'react'


const GameOver = ({ restartGame,levelUp,userName }) => (

    <div className="justify-center">
    {console.log("this ran?")}
     {levelUp(userName, "magic")}
    <h1> You Win!</h1>
    <h2>Your magic has increased by 10!</h2>
    <h3> If you enjoyed playing this game and wish to increase you magic again, click the button below!</h3>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
    </div>
);

export default GameOver;