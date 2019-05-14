import React, { Component } from 'react'


const GameOver = ({ restartGame,levelUp,userName }) => (

    <div className="justify-center">
    {console.log("this ran?")}
     {levelUp(userName, "agility")}
    <h1> You Win!</h1>
    <h2>Your agility has increased by 10!</h2>
    <h3>  Play again? click the button below!</h3>
    <button className="restart-button" onClick={restartGame}>Rematch!</button>
    </div>
);

export default GameOver;