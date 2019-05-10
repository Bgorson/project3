import React from 'react';
import ReactCardFlip from 'react-card-flip';

const Card = ({ id, isFlipped, handleClick, cardNumber }) => (
    <ReactCardFlip is Flipped = {isFlipped} flipSpeedBackToFront={2} flipSpeedFrontToBack={2}>
    <button id={id} className={`card card-front ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key ="front"> 
    </button>

    <button id={id} className={`card card-back ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key ="back"> 
    </button>
    </ReactCardFlip>
);

export default Card;