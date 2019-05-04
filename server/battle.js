axios = require('axios')
const User = require('./database/models/user')
class Battle {
  constructor(p1,p1Name,p2,p2Name) {
    this._players= [p1,p2];
    this._turns= [null, null];
    this._sendToPlayers('Starting Battle'+ p1Name + p2Name);
    this._sendToPlayers(p1Name +" VS "+ p2Name);
    this._players.forEach((player, idx)=> {
      player.on('turn', (turn)=> {
        this._onTurn(idx,turn)
      })
    })
    this.playerOneDefense=0;
    this.playerTwoDefense=0;
    this.player1Name= p1Name;
    this.player2Name= p2Name;
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
  //activate shield
  
  shield(player){
    let self = this;
    if (player===0){
      User.findOne({username:this.player1Name}, (err, data)=>{
        if (err){
          console.log("an err here",err)
        }
        if (data){
          console.log("data here", data.stat.agility)
          return data.stat.agility
        }
      }).then(function(data){
        console.log("data on this line",data.stat.agility)
        console.log(self)
        self.playerOneDefense= data.stat.agility
        console.log("This is te players defense",self.playerOneDefense)
      })
      .catch((err) => {
        console.log(err);
      })
      
    }
    else {
      this.playerTwoDefense=5
    }
  }
  // _getStats(userName){
  //   User.findOne({username:userName}, (err, data)=>{
  //     if (err){
  //       console.log("an err here",err)
  //     }
  //     if (data){
  //       console.log("data here", data.stat.agility)
  //       return data.stat.agility
  //     }
  //   }).then(function(agility){
  //     this.playerOneDefense= agility
  //   })
  // }
  

    // on a player's turn, they select the move they want to make and check if the other player
    // has made a turn yet
    //turn = what you are doing
_onTurn(playerIndex, turn){
  this._turns[playerIndex] = turn;
  this._sendToPlayer(playerIndex, `you are going to use ${turn}`)
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
  let p0 = this._decodeTurn(this._turns[0])
  let p1 = this._decodeTurn(this._turns[1])
  //check for shield
  if(p0.name=='defend'){
    this.shield(0)
    console.log(this.playerOneDefense)
  }
  if (p1.name=='defend'){
    this.shield(1)
  }
    this.playerOneDefense= (this.playerOneDefense-1)
    this.playerTwoDefense= (this.playerTwoDefense-1)

    if(this.playerOneDefense >0){
      p1.damage= (p1.damage/2)
    }
    if(this.playerTwoDefense >0){
      p0.damage= (p0.damage/2)
    }
    this._damagePlayer(0,p1.damage)
    this._damagePlayer(1,p0.damage)

    this._sendToPlayers("Player 1 uses "+ p0.name + " Player 2 uses " + p1.name)

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
      return {
        name:'attack',
        damage:20}
        ;
    case 'defend':
      return {
        name:"defend",
        damage:0};
    case 'special':
      return {
        name:"special",
        damage:50};
        
    default:
    throw new Error (' Could not decode' + turn)
  }
}

}

module.exports = Battle
