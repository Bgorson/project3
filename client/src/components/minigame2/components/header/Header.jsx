import React from 'react';

const Header = ({ restartGame }) => (
    <div className="grid-header-container">
    <div ClassName="justify-left timer"></div>
    <div ClassName="justify-center game-status-text"></div>
    <div ClassName="justify-end">
    <button onClick={restartGame} className = "restart-button">RESTART GAME</button>
    
    </div>
    </div>
);

export default Header;