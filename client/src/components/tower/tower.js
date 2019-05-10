import React, { Component } from 'react';
import io from 'socket.io-client'
import "./tower.css"
import axios from 'axios'
import Sound from 'react-sound';

class Tower extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],
            hp:'',
            mp:5,
            enemyHp:'',
            visible:'',
            roomKey:'',
            opponent:'',
            victory:false
        };
        this.socket = io();
        this.socket.on('room', function(data){
            setRoomKey(data)
        })
        this.socket.on('enemy',function(data){
            addOpponent(data)
        })
        this.socket.on("RECEIVE_MESSAGE", function(data){
            addMessage(data);
        })
        this.socket.on("msg", function(data){
            addMessage(data);
        })
        this.socket.on("damage", function(data){
            damageCounter(data.damage)
        })

        this.socket.on('hp', function(data){
            console.log(data.username)
            console.log(data.hp)
            try {
            if (data.username !== props.userName){
            console.log("new data")
            updateEnemyHp(data)
            }
            }
            catch(error){
                console.log(error)
            }
        })

       	//     this.socket.on("win", function(data){
        //     console.log(data)
        //     if(data == props.userName){
        //     toggleButton();
        //     }
        // })
  
        this.socket.on("gameover", function(data){
            console.log(data)
                toggleButton();
            if (data.winner === props.userName){
                handleWin(props.userName)
            }
            else {
                handleLose(props.userName)
            }
                   
        })
    
        const addMessage = data => {
            this.setState({messages: [...this.state.messages,data]})
        }

        this.sendMessage= event => {
            event.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.userName,
                message: this.state.message,
                roomKey:this.state.roomKey
            })
            this.setState({message:''})
        }

        this.buttonListener = (name) => {
            if(name.target.id === "special" && this.state.mp >0) {
                specialMove()
                this.socket.emit('turn', name.target.id);
            }
            else if (name.target.id === "special" && this.state.mp <=0){
                return null
            }
            else {
        this.socket.emit('turn', name.target.id);
        console.log(name.target.id)

            }
    }
    const damageCounter= (damage)=>{
        this.setState({hp: (this.state.hp-damage) })
        //if player's HP gets to zero or lower, send out an emit saying you lost
        if (this.state.hp <=0) {
            handleLoseEmit(this.props.userName)

        }
        else {this.socket.emit('hp',{
            username:this.props.userName,
            hp:this.state.hp,
            roomKey:this.state.roomKey
        })
    }
    }

    const handleLoseEmit =(user)=> {
           console.log('hitting emit route')
             this.socket.emit('SEND_MESSAGE', {
             author: '',
             message: "Game Over " +this.state.opponent+ " won!",
             roomKey:this.state.roomKey
             })
            this.socket.emit("gameover", {
                loser:user,
                winner:this.state.opponent,
                roomKey:this.state.roomKey
            })
    }

    const handleLose = (username)=>{
        console.log('handling lose', username)
        axios.post("/tower/lose/"+ username)
        toggleButton();
    }

    const handleWin = (username)=>{
        this.setState({victory:true})
        console.log('handling win', username)
        axios.post("/tower/win/"+ username)
        toggleButton();
    }
    const updateEnemyHp= (eHp)=>{
        console.log("Receiving",eHp)
        this.setState({enemyHp: eHp.hp})
    }
    const specialMove = ()=>{
        this.setState({mp: this.state.mp-1})
    }
    // const heal = ()=>{
    //     this.setState({
    //         mp: this.state.mp-1,
    //         hp: this.state.hp+10
    //     })
    
    // }

    const toggleButton=()=>{
        this.setState({visible: "disable"})
        // this.socket.emit("SEND_MESSAGE", {
        //     author: '',
        //     message: "Game Over",
        //     roomKey:this.state.roomKey
        // }
        // )
    }
    const setRoomKey=(key)=>{
        console.log("settingroom key", key)
        this.setState({roomKey:key})
    }

    const addOpponent=(opp)=>{
        console.log(opp)
        if (opp.playerOne===props.userName){
            this.setState({opponent:opp.playerTwo})
        }
        else {
            this.setState({opponent:opp.playerOne})
        }
       
    }

    }
    
    componentDidMount(){
        this.socket.emit('name',this.props.userName)
        this.setState({
            hp:this.props.hp
        })
    }

    render() { 
        return (
            <div>

            {this.state.victory === true &&
            <Sound
            url="./victory.mp3"
            playStatus={Sound.status.PLAYING}
            playFromPosition={300 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            />
            }

                <div>
                    <div>
                        <div>
                            <div>

                                <hr/>
                                <div className= "hp">
                                {this.state.hp} HP
                                </div>
                                <div className="mp">
                                {this.state.mp} MP
                                </div>
                                <div className= {this.state.visible}>
                                <div className="button-wrapper">
                                    <button onClick= {this.buttonListener} id="attack" className="turn">Attack</button>
                                    <button onClick= {this.buttonListener} id="defend" className="turn">Defend</button>
                                    <button onClick = {this.buttonListener} id="special" disabled = {this.state.mp <= 0}className="turn">Special</button>
                                    {/* <button onClick = {this.buttonListener} id="heal" disabled = {this.state.mp <= 0}className="turn">Heal</button> */}
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                        <div>
                            <div>
                                <div>
                                    <div>Enemy HP</div>
                               
                                    <div className= "enemyHp">
                                    {this.state.enemyHp}
                                    
                                    </div>
                                    <hr/>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div>
                            <div>Chat with your opponent
                            <div>
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author} {message.message}</div>
                                        )
                                    })}
                                </div>
                                <div className="footer">
                                    <br/>
                                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                    <br/>
                                    <button onClick={this.sendMessage}>Send</button>
                                </div>
                                </div>
                                </div>
                </div>
                
        );
    }
}

 
export default Tower;

//REMAINING ISSUES:
// MULTIPLE MESSAGES OF GAME OVER
//server crashes
//Third person issues. 
//Need seperate rooms
