import React, {PureComponent} from 'react';
// import MiniGame2 from "./components/MiniGame2";
import Header from './components/header/Header'
import Card from './components/card/card'
import GameOver from './components/card/GameOver'
import "../css/stylesheet.css";


class App extends PureComponent {

  state = {
    isFlipped: Array(16).fill(false),
    shuffleCard: App.duplicateCard.sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardID: -1
  };

  return <MiniGame2/>
}
   
export default App;
