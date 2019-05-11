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

  static duplicateCard =  () => {
    return [0,1,2,3,4,5,6,7].reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
      // console.log(current)
    },[])
    };
    
    handleClick = event => {
      event.preventDefault();
      const cardID = event.target.id;
      const newFlipps = this.state.isFlipped.slice();
      this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardID: cardId
      });

    }
    
    )
  }
}
   
export default App;
