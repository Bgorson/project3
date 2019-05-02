import React, { Component } from 'react';
import io from 'socket.io-client'

class Tower extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],
            hp:''
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
        this.socket.emit('turn', name.target.id);
    }
    const damageCounter= (damage)=>{
        this.setState({hp: (this.state.hp-damage) })
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
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className= "hp">
                                {this.state.hp} HP
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
                </div>
            </div>
        );
    }
}

 
export default Tower;