axios = require('axios')
class Battle {
  constructor(p1,p2) {
    this._players= [p1,p2];
    this._turns= [null, null];
    this._sendToPlayers('Starting Battle');
    this._players.forEach((player, idx)=> {
      player.on('turn', (turn)=> {
        this._onTurn(idx,turn)
      })
    })
  }
  //sending a message to one player.
    _sendToPlayer(playerIndex, msg) {
      this._players[playerIndex].emit("msg",{message:msg})
    }
    //damage player
    _damagePlayer(playerIndex,damage){
        this._players[playerIndex].emit("damage",{damage})
    }

      //function to send a message to each player.
  _sendToPlayers(msg){
    this._players.forEach((player) => {player.emit("msg",{message: msg})
  })
}

    // on a player's turn, they select the move they want to make and check if the other player
    // has made a turn yet
_onTurn(playerIndex, turn){
  this._turns[playerIndex] = turn;
  this._sendToPlayer(playerIndex, `you selected ${turn}`)
  this._checkGameOver();
}

    //Once both players made a turn, reset game and display results
_checkGameOver(){
  const turns = this._turns

  if (turns[0] && turns[1]){
    // this._sendToPlayers('Game Over ' + turns.join(' : '))
    this._getGameResult();
    this._turns = [null, null]
    this._sendToPlayers('New Turn!')
  }
}
    //game logic for moves
_getGameResult(){
  const p0 = this._decodeTurn(this._turns[0])
  const p1 = this._decodeTurn(this._turns[1])
    this._damagePlayer(0,p1)
    this._damagePlayer(1,p0)
    this._sendToPlayers("Player 1: "+ p0 + " Player 2: " + p1)
    //Reduce hitpoints based on damage
    //Check if anyone is at 0 and end game, assign win, assign lose

}
    //identify who wins and who lises
_sendWinMessage(winner, loser) {
  winner.emit('msg', {message:'you won'})
  loser.emit('msg', {message: 'you lost'})
}

    //turn selections into numbers
_decodeTurn(turn){
  switch(turn) {
    case 'attack':
      return 20;
    case 'defend':
      return "Defend";
    case 'special':
      return 50;
    default:
    throw new Error (' Could not decode' + turn)
  }
}

}

module.exports = Battle
