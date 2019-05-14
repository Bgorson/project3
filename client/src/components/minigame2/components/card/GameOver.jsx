import React, { Component } from 'react'


const GameOver = ({ restartGame,levelUp,userName }) => (

    <div className="justify-center">
    {console.log("this ran?")}
     {levelUp(userName, "magic")}
    <h1> You Win!</h1>
    <br/>
    <h3>Your magic has increased by 10!</h3>
    <br/>
    <p> If you enjoyed playing this game and wish to increase you magic again, click restart!</p>
    </div>
);

export default GameOver;