import React, { Component } from 'react';
import io from 'socket.io-client'

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
        };
        this.socket = io('localhost:9090');

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
            console.log(props.userName)
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
                alert("No mp left!")
                return null
            }
            else {
        this.socket.emit('turn', name.target.id);
            }
    }
    const damageCounter= (damage)=>{
        this.setState({hp: (this.state.hp-damage) })
        if (this.state.hp <=0) {
            this.socket.emit("lost",{username:this.props.userName} )
        }
        this.socket.emit('hp',{
            username:this.props.userName,
            hp:this.state.hp
        })
        }
    const updateEnemyHp= (eHp)=>{
        console.log("Receiving",eHp)
        this.setState({enemyHp: eHp.hp})
    }
    const specialMove = ()=>{
        this.setState({mp: this.state.mp-1})
    }
}


    componentDidMount(){
        this.socket.emit('name',this.props.username)
        this.setState({
            hp:this.props.hp
        })
    }


    render() { 
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className= "hp">
                                {this.state.hp} HP
                                </div>
                                <div className="mp">
                                {this.state.mp} MP
                                </div>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>
                                <div className="footer">
                                    <br/>
                                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                    <br/>
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </div>
                                <div className="button-wrapper">
                                    <button onClick= {this.buttonListener} id="attack" className="turn">Attack</button>
                                    <button onClick= {this.buttonListener} id="defend" className="turn">Defend</button>
                                    <button onClick = {this.buttonListener} id="special" className="turn">Special</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">Enemy HP</div>
                                    <hr/>
                                    <div className= "enemyHp">
                                    {this.state.enemyHp}
                                    
                                    </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                </div>
                
        );
    }
}

 
export default Tower;