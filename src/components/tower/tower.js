import React, { Component } from 'react';
import io from 'socket.io-client'
import "./tower.css"
import axios from 'axios'

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
        };
        this.socket = io('localhost:9090/');
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
            if (data.username != props.userName){
            console.log("new data")
            updateEnemyHp(data)
            }
            }
            catch(error){
                error
            }
        })

        this.socket.on('hp',function(data){
            console.log(data)
            io.to(this.state.roomKey).emit('hp',data)
        })

        this.socket.on("win", function(data){
            console.log(data)
            if(data == props.userName){
                toggleButton();
            }
                
        })
    
        const addMessage = data => {
            this.setState({messages: [...this.state.messages,data]})
        }

        this.sendMessage= event => {
            event.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.userName,
                message: this.state.message
            })
            this.setState({message:''})
        }

        this.buttonListener = (name) => {
            if(name.target.id == "special" && this.state.mp >0) {
                specialMove()
                this.socket.emit('turn', name.target.id);
            }
            else if (name.target.id == "special" && this.state.mp <=0){
                return null
            }
            else {
        this.socket.emit('turn', name.target.id);

            }
    }
    const damageCounter= (damage)=>{
        this.setState({hp: (this.state.hp-damage) })
        if (this.state.hp <=0) {
            handleLoseEmit(this.state.opponent)
            handleLose(this.props.userName)
            handleWin(this.state.opponent)

        }
        else {this.socket.emit('hp',{
            username:this.props.userName,
            hp:this.state.hp
        })
    }
        }
    const handleLoseEmit =(opponent)=> {
        console.log('hitting emit route')
        this.socket.emit('SEND_MESSAGE', {
            author: '',
            message: "Game Over " +opponent+ " won!"
        })
        this.socket.emit("gameover", opponent)
    }
    const handleLose = (username)=>{
        axios.post("/tower/lose/"+ username)
        toggleButton();
    }

    const handleWin = (username)=>{
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
    const toggleButton=()=>{
        this.setState({visible: "disable"})
    }
    const setRoomKey=(key)=>{
        this.setState({roomKey:key})
    }

    const addOpponent=(opp)=>{
        console.log(opp)
        if (opp[0]==props.userName){
            this.setState({opponent:opp[1]})
        }
        else {
            this.setState({opponent:opp[0]})
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <div className>
                            <div className="">

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
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                        <div className="col-sm-6">
                            <div className="">
                                <div className="">
                                    <div className="">Enemy HP</div>
                                    <hr/>
                                    <div className= "enemyHp">
                                    {this.state.enemyHp}
                                    
                                    </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className = "row justify-content-center">
                            <div className="">Global Chat
                            <div className="messages col-12">
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
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </div>
                                </div>
                                </div>
                </div>
                
        );
    }
}

 
export default Tower;