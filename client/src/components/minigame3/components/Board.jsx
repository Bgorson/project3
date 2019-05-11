// Board to have a width of 50px????
// First, determine the margin of the board
//We need a component for Player, Board, Enemy, Object, Game Play/INFO

import React from 'react';

const style = (dimension) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        border: '2px solid black',
        position: 'relative',
        margin: '25px auto',
        overflow: 'hidden'
    };
};

export default ({ dimension, children}) => {
    <div style={style(dimension)}>
            {children}
    </div>
}