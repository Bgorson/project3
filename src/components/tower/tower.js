import React, { Component } from 'react';
import io from 'socket.io-client'

class Tower extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
        };
        this.socket = io('localhost:9090');

        this.socket.on("RECEIVE_MESSAGE", function(data){
            addMessage(data);
        })
        this.socket.on("msg", function(data){
            console.log(data)
            addMessage(data);
        })

        const addMessage = data => {
            console.log("this is data "+ data);
            this.setState({messages: [...this.state.messages,data]})
            console.log(this.state.messages)
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
        console.log(name.target.id)
        this.socket.emit('turn', name.target.id);
    }
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
          <button onClick= {this.buttonListener} id="rock" className="turn">Rock</button>
          <button onClick= {this.buttonListener} id="paper" className="turn">Paper</button>
          <button onClick = {this.buttonListener} id="scissors" className="turn">Scissors</button>
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