import React, {Component} from 'react';
import './game.css';
import '../index.css'

class MiniGame3 extends Component {
//Can Agility be leveled up here?
    constructor(props) {
        super(props);
        this.state= {
            winner: undefined
        };
        this.gameState = {
            turn: 'X',
            gameLocked: false,
            gameEnded: false,
            board: Array(9).fill(''),
            totalMoves: 0
        }

    }

    clicked(box) {
        
        if(this.gameState.gameEnded || this.gameState.gameLocked) 
        return;

        if (this.gameState.board[box.dataset.square] === '') {
            this.gameState.board[box.dataset.square] = this.gameState.turn;
            box.innerText = this.gameState.turn;

            this.gameState.turn = this.gameState.turn === 'X' ? 'O' : 'X',
            this.gameState.totalMoves++;
            }

            console.log(this.gameState.totalMoves)

            var result = this.checkWinner();

            if(result == 'X') {
                this.props.levelUp(this.props.userName,"agility")
                console.log("leveling up ", this.props.userName)
                this.gameState.gameEnded = true;
                this.setState({
                    winner: 'X',
                    winnerLine: <div class='won'><h1> Match won by {this.props.userName}  10XP  earned for agility</h1></div> 
                });
                
                
            } else if(result === 'O') {
                this.gameState.gameEnded = true;
                this.setState({
                    winner: 'O',
                    winnerLine: <div class='lost'> <h1> Match won by AI </h1> </div>
                });
            } else if(result === 'draw') {
                this.gameState.gameEnded = 'true';
                this.setState({
                    winner: 'draw',
                    winnerLine: <div class='draw'><h1> Match is a Draw</h1></div>
                })
            }
            if(this.gameState.turn === 'O' && !this.gameState.gameEnded) {
                this.gameState.gameLocked = true;
                setTimeout(()=> {
                  do {
                    var random = Math.floor(Math.random()*9);
                  } while(this.gameState.board[random] !== '');
                  this.gameState.gameLocked = false;
                  this.clicked(document.querySelectorAll('.square')[random]);
                }, 1000);
          
              }
          
    }

    checkWinner() {
        var moves = [[0,3,6], [1,4,7], [2,5,8],[0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
        var board = this.gameState.board;
        for(let i=0; i<moves.length; i++) {
            if(board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]])
                return board[moves[i][0]];
        }

        console.log(this.gameState.totalMoves);
        if(this.gameState.totalMoves === 9) {
            return 'draw';
        }
    }
  
    render() {
        return (
          <div id="game">
              
              <div id="head">NOUGHTS & CROSSES</div>
              <p className="instruct-2">Did you see that?! The goul of Noughts & Crosses is here 
                  and she believes that you are a worthy adversary! She is a 
                  master of her own game and you must move quickly against the her! 
                  Get three crosses in arow before she is able to get three noughts in 
                  a row! This will increase you agility and she will let you pass.</p>
              <br/>
              <div id="status">{this.state.winnerLine}</div>
              <br/>
              <div id="board" onClick={(e)=>this.clicked(e.target)}>
                  <div className="square" data-square="0"></div>
                  <div className="square" data-square="1"></div>
                  <div className="square" data-square="2"></div>
                  <div className="square" data-square="3"></div>
                  <div className="square" data-square="4"></div>
                  <div className="square" data-square="5"></div>
                  <div className="square" data-square="6"></div>
                  <div className="square" data-square="7"></div>
                  <div className="square" data-square="8"></div>
              </div>
            
          </div>    
        );
      } 
}

export default MiniGame3;