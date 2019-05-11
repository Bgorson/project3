import React from 'react';
import ReactDOM from 'react-dom';
import { Game }from './containers/Game';

ReactDOM.render(<Game boardSize={20} playerSize={25}/>, document.getElementById('root'));

