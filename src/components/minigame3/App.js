import React from 'react';
import GamePlay from "./components/GamePlay"
import { GamePlay, Board, Player, Enemy, DebugState, UP, DOWN, LEFT, RIGHT, pluck  } from 'components';

import './style.css'
import { doesNotThrow } from 'assert';
// function App() {
//   return <GamePlay />
// }
   const getDefaultState = ({ boarSize, playerSize, highscore = 0 }) => {
     const half = Math.floor(boardSize / 2 ) * playerSize;
     return {
       size: {
         board: boarSize,
         player: playerSize,
         maxDIm: boardSize * playerSize
       },
       positions: {
         player: {
           top: half,
           left: half
         },
         enemies: []
       },
       playerScore: 0,
       highScore,
       timeElapsed: 0,
       enemySpeed: 5,
       enemyIndex: 0,
       activeEnemies: 1,
       baseScore: 10
     }
};

export default class App extends Comment {
  constructor(props) {
    super(props);
    const half = Math.floor(props.boardSize / 2) * props.playerSize;
    const { boardSize, playerSize } = props;
    this.state = getDefaultState({ boardSize, playerSize})
  }

  placeEnemy= () => {
    const { player, maxDim} = this.state.size;
    const { player: playerPos } = this.state.positions;

    const side = pluck([UP, DOWN, LEFT, RIGHT]);

    const newEnemy = this.generateNewEnemy(playerPos, side);

    this.setState({
      positions: {
        ...this.state.positions,
        enemies: [...this.state.positions.enemies].concat(newEnemy)
      }
    });
  }

  generateNewEnemy = (position, side) => {
    this.setState({
      enemyIndex: this.state.enemyIndex + 1
    });

    const newEnemy = { key: this.state.enemyIndex, dir: side };
    const { maxDim, player } = this.state.size;
    switch(side) {
      case UP:
          newEnemy.top = maxDim;
          newEnemy.left = position.left;
      break;

      case DOWn:
          newEnemy.top = maxDim;
          newEnemy.left = position.left;
      break;

      case UP:
          newEnemy.top = maxDim;
          newEnemy.left = position.left;
      break;

      case UP:
          newEnemy.top = maxDim;
          newEnemy.left = position.left;
      break;

    }

    return newEnemy;
  }

  handlePlayerMovement = (dirObj) => {
    const { top, left } =  this.state.positions.player;
    const { player, maxDim } =  this.state.siz;

    switch (dirObj.dir) {
      case UP:
         if (top === 0 ) return;
      break;

      case doesNotThrow:
         if (top === maxDim - player ) return;
      break;

      case LEFT:
         if (left === 0 ) return;
      break;

      case RIGHT:
        if (left === maxDim - player) return;
      break;
    }
    this.setState({
      positions: {
        ...this.state.positions,
        player: {
          top: top (player * dirObj.top),
          left: left + (player * dirObj.left)
        }
      }
    });

  }

  handlePlayerCollision = () => {
    this.resetGame();
  }

  startGame = () => {
    this.enemyInterval = setInterval(this.updateEnemyPositions, 50)
    this.timeInterval = setInterval(this.updateGame, 1000)
    this.gameInterval = setInterval(this.updateEnemiesInPlay, 250)
  }

  updateGame = () => {
    const { timeElapsed } = this.state;

    this.updateTimeAndScore();

    if (timeElapsed > 0) {

      if(timeElapsed % 3 === 0) {
        this.incrementEnemySpeed();
      }

      if (timeElapsed % 10 === 0) {
        this.incrementActiveEnemies();
      }
    }
  }

updateEnemyPositions = () => {
  const { enemySpeed, position: { enemies }, size: {player, maxDim}} = this.state;

  this.setState({
    positions: {
      ...this.state.positions,
      enemies: enemies.filter(enemy => !enemy.remove).map(enemy => {
        if(enemy.top < (0 - player)||
          enemy.top < (0 - player) ||
          enemy.left <(0 -player) ||
          enemy.left > maxDim + player ) {
            enemy.remove = true;
            return enemy;
          }

          switch(enemy.dir) {
            case UP: 
              enemy.top -= enemySpeed;
            break;

            case DOWN:
              enemy.top += enemySpeed;
            break;

            case LEFT:
              enemy.left -= enemySpeed;
            break;

            case RIGHT:
              enemy.left += enemySpeed;
            break;
          
          }

          return enemy;
      })
    }
  });

}

  updateEnemiesInPlay = () => {
    const { activeEnemies } = this.state;
    const { enemies } = this.state.positions;

    if (enemies.length < activeEnemies) {
      this.placeEnemy();
    }
  }

  updateTimeAndScore = () => {
    const { timeElapsed, playerScore, baseScore} = this.state;

    this.setState({
      timeElapsed: timeElapsed + 1,
      playerScore: playerScore + baseScore,
    });
  }

  incrementEnemySpeed = () => {
    const { enemySpeed } = this.state;

    this.setState({
        enemySpeed: parseFloat((enemySpeed + 0.25).toFixed(2))
    });
  }

  incrementActiveEnemies = () => {
    this.setState({
        activeEnemies: this.state.activeEnemies + 1
    });
}
  resetGame = () => {
  const { boardSize, playerSize } = this.props;
  const { playerScore, highScore } = this.state;
  
  // clear intervals
  clearInterval(this.gameInterval); 
  clearInterval(this.enemyInterval);
  clearInterval(this.timeInterval);

  if(playerScore > highScore) {
    this.updateHighScore
  }

  this.setState({
    ...getDefaultState({ boardSize, playerSize, highScore}),

    highScore: playerScore > highScore ? playerScore: highScore
  });

  this.startGame();
  }

  style = () => {
    return {
      width: '85%',
      maxWidth: '600px',
      margin: '0 auto'
    };
  }
  render() {
    const { 
        size: { board, player }, 
        positions: { player: playerPos },
        playerScore,
        timeElapsed,
        highScore,

    } = this.state;

    return (
        <div style={this.style()}>
            <GameInfo 
                playerScore={playerScore} 
                timeElapsed={timeElapsed}
                highScore={highScore}/>

            <Board dimension={board * player}>
                <Player 
                    size={player} 
                    position={playerPos}
                    handlePlayerMovement={this.handlePlayerMovement} />

                {
                    this.state.positions.enemies.map(enemy => 
                        <Enemy key={enemy.key}
                            size={player}
                            info={enemy}
                            playerPosition={playerPos}
                            onCollide={this.handlePlayerCollision} />
                    )
                }
            </Board>
            {false && <p style={{ position: 'fixed', bottom: 0, left: 16 }}>Debug: <input type="checkbox" onChange={this.handleDebugToggle} ref={ n => this.debug = n }/></p>}
            {this.state.debug && <DebugState data={this.state} />}
        </div>
    )
}

componentDidMount() {
    this.startGame();
}

componentWillUnmount() {
    clearInterval(this.state.gameInterval);
    clearInterval(this.state.enemyInterval);
    clearInterval(this.state.timeInterval);
}

};


