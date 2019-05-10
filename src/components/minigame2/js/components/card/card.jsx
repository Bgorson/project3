import React from 'react';
import ReactCardFlip from 'react-card-flip';

const Card ({ id, isFlipped, handleClick, cardNumber }) => (
    <ReactCardFlip is Flipped = {isFlipped={isFlipped} flipSpeedBackToFront={2} flilpSpeedFrontToBack{2}>
    <button id={id} className={`card card-front ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key ="front"> 
    </button>

    
    </ReactCardFlip>}
)