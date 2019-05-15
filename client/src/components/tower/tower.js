import React, { Component } from 'react';
import io from 'socket.io-client'
import "./tower.css"
import axios from 'axios'
import Sound from 'react-sound';
import pet from "../pets.json"
const apiEndpoint = '/tower';
class Tower extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],
            battleLog: '',
            battleLogs: [],
            hp:'',
            mp:5,
            enemyHp:200,
            visible:'',
            roomKey:'',
            opponent:'',
            victory:false,
            specialClick:false,
            healClick:false,
            damage:0,
            enemyMaxHp:200,
            enemyDamageReceived:0,
            opponentPet:8,
        };
        let self=this
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
        this.socket.on("RECEIVE_LOG", function(data){
            addLog(data);
        })
        this.socket.on("msgLog", function(data){
            console.log(data)
            if(data.heal === false){
                enableButtons();
            }
            addLog(data);
        })
        this.socket.on("msg", function(data){
            console.log(data)
            if(data.heal === false){
                enableButtons();
            }
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
            else {
                console.log('not new')
            }
            }
            catch(error){
                console.log(error)
            }
        })
        

        this.socket.on("winner", function(data){
            console.log("receiving win socket")
            console.log(data)
                toggleButton();
                handleWinState(props.userName)
        })
    
        const addMessage = data => {
            this.setState({messages: [...this.state.messages,data]})
        }

        const addLog = data => {
            this.setState({battleLogs: [...this.state.battleLogs,data]})
        }

        this.sendMessage= event => {
            event.preventDefault();
            this.socket.emit('SEND_MESSAGE_CHAT', {
                author: this.props.userName,
                message: this.state.message,
                roomKey:this.state.roomKey,
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
            else if(name.target.id === "heal" && this.state.mp >0) {
                heal()
                this.socket.emit('turn', name.target.id);
            }
            else if (name.target.id === "heal" && this.state.mp <=0){
                return null
            }
            else {
        this.socket.emit('turn', name.target.id);

            }
    }
    const damageCounter= (damage)=>{
        this.setState({
            hp: (this.state.hp-damage),
            specialClick:false,
            damage:this.state.damage+damage
         })
        //if player's HP gets to zero or lower, send out an emit saying you lost
        if (this.state.hp <=0) {
            addMessage({message: this.state.opponent+ " is the winner!"})
            this.socket.emit("gameover", {
                winner:this.state.opponent,
                roomKey:this.state.roomKey
            })
                handleLose(props.userName)
            // handleLoseEmit(this.props.userName)
        }
        else {this.socket.emit('hp-client',{
            username:this.props.userName,
            hp:this.state.hp,
            roomKey:this.state.roomKey,
            maxhp:this.props.hp
        })
    }
    }
    const handleLose = (username)=>{
        console.log('handling lose', username)
        this.handleLoseAxios();
        self.socket.emit('end')
        self.socket.close()
        toggleButton();
    }
    const enableButtons = () => {
        this.setState({
            healClick:false
        })
    }

    const handleWinState = ()=>{
        this.handleWinAxios();
        addMessage({message: "You are the winner!"})
        this.setState({
            victory:true,
            enemyHp: 0,
        })
        self.socket.close()
        self.socket.emit('end')
        toggleButton();
    }
    const updateEnemyHp= (eHp)=>{
        console.log("Receiving",eHp)
        this.setState({
            enemyHp: eHp.hp,
            enemyMaxHp:eHp.maxhp
        })
    }
    const specialMove = ()=>{
        this.setState({
            mp: this.state.mp-1,
            specialClick:true
        })
    }
    const heal = ()=>{
        this.setState({
            mp: this.state.mp-1,
            hp: this.state.hp+10,
            damage:this.state.damage-10,
            healClick:true
        })
    }
 

    const toggleButton=()=>{
        this.setState({visible: "disable"})
     
    }
    const setRoomKey=(key)=>{
        console.log("settingroom key", key)
        this.setState({roomKey:key})
    }

    const addOpponent=(opp)=>{
        console.log("adding opponent")
        console.log(opp)
        if (opp.playerOne===props.userName){
            this.setState({
                opponent:opp.playerTwo,
                opponentPet:opp.petTwo
            })
        }
        else {
            this.setState({
                opponent:opp.playerOne,
                opponentPet:opp.petOne
            })
        }
       
    }
    
    this.displayPet= (type,color,access) => {
        if (type=== 'cat'){
            if(color === 'white'){
                if(access === 'bell'){

                    return <img className="pet" alt="whitecatBell" src={pet[2].image} />
                    
                }
                else if (access === 'bandana'){
                    return <img className="pet" alt="whitecatbanda" src={pet[3].image} />
                }

            }
            else if(color === 'orange'){
                if(access === 'bell'){
                    return <img className="pet" alt="orangecatbell" src={pet[5].image} />
                    
                }
                else if (access === 'bandana'){
                    return <img className="pet" alt="orangecatbandana" src={pet[4].image} />
                    
                }
            }
        }

        else if (type ==='dog'){
            if(color === 'white'){
                if(access === 'bell'){
                    return <img className="pet" alt="whitedogBell" src={pet[1].image} />
                    
                }
                else if (access === 'bandana'){
                    return <img className="pet" alt="whitedogbandan" src={pet[0].image} />
                }
                
            }
            else if(color === 'orange'){
                if(access === 'bell'){
                    return <img className="pet" alt="orangedogbell" src={pet[5].image} />
                }
                else if (access === 'bandana'){
                    return <img className="pet" alt="orangedogbanda" src={pet[6].image} />
                }
            }
        }
        else {
            return null
        }
        }

        this.enemyPet= () => {
            return <img className="pet" alt="pet" src={pet[this.state.opponentPet].image} />
        }
        this.handleSongFinishedPlaying= () => {
            this.setState({
                victory:false
            })  
        }
    }


    componentDidMount(){
        this.socket.emit('name',{
            name:this.props.userName,
            petType:this.props.petType,
            petColor:this.props.petColor,
            petAccess:this.props.petAccess
        })
        console.log("emiting name")
        this.setState({
            hp:this.props.hp
        })  
    }
    componentWillUnmount(){
        console.log("unmounting")
        this.socket.destroy();
        this.socket.close()
        this.socket.off('room')
        this.socket.off('enemy')
        this.socket.off('RECEIVE_MESSAGE')
        this.socket.off('RECEIVE_LOG')
        this.socket.off('msgLog')
        this.socket.off('msg')
        this.socket.off('damage')
        this.socket.off('hp')
        this.socket.off('winner')
    }

    handleWinAxios =  () => {
        axios({
            method: "put",
            url: apiEndpoint + '/win/' + this.props.userName,
            timeout: 1000 * 5, // Wait for 5 seconds
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              console.log("done")
            })
            .catch(error => {
              console.log(error);
          });
        // axios.put(apiEndpoint + '/win/' + this.props.userName);
 
    };
    handleLoseAxios =  () => {
        axios({
            method: "put",
            url: apiEndpoint + '/lose/' + this.props.userName,
            timeout: 1000 * 5, // Wait for 5 seconds
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              console.log("done")
            })
            .catch(error => {
              console.log(error);
          });
    //    axios.put(apiEndpoint + '/lose/' + this.props.userName);
       
    };


    render() { 

        return (
            <div className="tower-container">

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

                    <div className="playerInfo">
                    <div className="myPet">
                        {this.displayPet(this.props.petType,this.props.petColor,this.props.petAccess)}
                        <br/>
                        {this.props.petname}
                    </div>
                            <div className="playerStatus">

                                <div className= "hp">
                                {this.state.hp} HP
                                Health
                                </div>
                             
                                <div className='HpBar'>
                                    <div 
                                        className='balanceSection currentHealth' 
                                        style={{'width':
                                        Math.max((this.state.hp/this.props.hp)*100,0)+'%'
                                     }}></div>
                                    <div 
                                        className='balanceSection damage' 
                                        style={{'width': 
                                        Math.min((this.state.damage/this.props.hp)*100,100)+'%'
                                    }}></div>
                                </div>
                               
                               
                                <div className="mp">
                                {this.state.mp} Magic
                                </div>
                             

                                <div className='MpBar'>
                                    <div 
                                        className='balanceSection currentMp' 
                                        style={{'width':
                                        (this.state.mp/5)*100+'%'
                                     }}></div>

                                    <div 
                                        className='balanceSection damage' 
                                        style={{'width': 
                                        ((5-this.state.mp)/5)*100+'%'
                                    }}></div>
                                </div>
                            
                                <div className= {this.state.visible}>
                                <div className="button-wrapper">
                                    <button onClick= {this.buttonListener} id="attack" disabled = {this.state.healClick}  className="turn">ATTACK</button>
                                    <button onClick= {this.buttonListener} id="defend" disabled = {this.state.healClick}  className="turn">DEFEND</button>
                                    <button onClick = {this.buttonListener} id="special" disabled = {this.state.mp <= 0 || this.state.specialClick|| this.state.healClick} className="turn">SPECIAL</button>
                                    <button onClick = {this.buttonListener} id="heal" disabled = {this.state.mp <= 0 || this.state.specialClick || this.state.healClick} className="turn">HEAL</button>
                                    </div>
                                    </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div className="ePet">
                                    
                                    <div>{this.enemyPet()}</div> 
                                    <div>{this.state.opponent}</div>
                                    
                                    </div>
                                    <div className="eHp">Enemy Health</div>
                               
                                    <div className= "enemyHp">
                                    {/* {this.state.enemyHp} */}
                                        <div className='HpBar'>
                                            <div className='balanceSection currentHealth' 
                                                style={{'width':
                                                Math.max((this.state.enemyHp/this.state.enemyMaxHp)*100,0)+'%'
                                            }}></div>
                                            <div className='balanceSection damage' 
                                                style={{'width': 
                                                Math.min(((this.state.enemyMaxHp-this.state.enemyHp)/this.state.enemyMaxHp)*100,100)+'%'
                                            }}></div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                                   
                            {/* <div className="playerStatus">Enemy HP</div>
                                <div className= "enemyHp">
                                {this.enemyHp}
                                </div> */}
                            </div>
                        
                <div className="message-container">
                <div className="footer">
                        <br/>
                        <input type="text" placeholder="Chat with your opponent" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                        
                        <button onClick={this.sendMessage}>Send</button>
                    </div>
                    <div className="message-area">
                        {this.state.messages.slice().reverse().map(message => {
                            return (
                                <div key = {message.id} >{message.author} {message.message}</div>
                            )
                        })}
                    </div>
                </div>
            
                    <div className="battleLog-area">Battle Log<div>
                        {this.state.battleLogs.slice(Math.max(this.state.battleLogs.length-11,0)).reverse().map(message => {
                            return (
                                <div key = {message.id}>{message.message}</div>
                            )
                        })}
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
