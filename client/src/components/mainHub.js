import React, { Component } from 'react';
import MainButtons from './mainButtons'
import TowerBtn from './TowerBtn'
import axios from 'axios'
import './main.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import pet from "../components/pets.json"

class Main extends Component {  
    constructor(props) {
        super(props);
        this.state={
            topPlayerName:''
        }
        this.displayPet= (type,color,access) => {
            if (type=== 'cat'){
                if(color === 'white'){
                    if(access === 'bell'){
                        console.log("White cat with a bell")
                        return <img alt="whitecatBell" src={pet[2].image} />
                        
                    }
                    else if (access === 'bandana'){
                        console.log("White cat with a bandana")
                        return <img alt="whitecatBandana" src={pet[3].image} />
                    }

                }
                else if(color === 'orange'){
                    if(access === 'bell'){
                        console.log("Orange cat with a bell")
                        return <img  alt="orangecatBell" src={pet[5].image} />
                        
                    }
                    else if (access === 'bandana'){
                        console.log("Orange cat with a bandana")
                        return <img  alt="orangecatbandana"src={pet[4].image} />
                        
                    }
                }
            }

            else if (type ==='dog'){
                if(color === 'white'){
                    if(access === 'bell'){
                        console.log("White dog with a bell")
                        return <img  alt="whitedogBell" src={pet[1].image} />
                        
                    }
                    else if (access === 'bandana'){
                        console.log("White dog with a bandana")
                        return <img alt="whitedogBandana"src={pet[0].image} />
                    }
                    
                }
                else if(color === 'orange'){
                    if(access === 'bell'){
                        console.log("Orange dog with a bell")
                        return <img alt="orangedogBell"src={pet[5].image} />
                    }
                    else if (access === 'bandana'){
                        console.log("Orange dog with a bandana")
                        return <img  alt="orangedogBell" src={pet[6].image} />
                    }
                }
            }
            else {
                return null
            }
            }
            props.getStats()

    }

    componentDidMount(){
     
        console.log("checking for top player")
        axios.get('/leaderboard').then(response=>{
          console.log(response.data.username)
         this.setState({
           topPlayerName:response.data.username
         })
        })
    }
    render() { 
        return (
            <React.Fragment>
                
<div className="stat-box"> 
            <Card className="stat-content">
                <CardContent>
                    <Typography variant="h3" component="h3">
                        STATS
                    </Typography>

                    <Typography component="p">
                        HP: {this.props.hp}
                    </Typography>

                    <Typography component="p">
                        Strength: {this.props.strength}
                    </Typography>

                    <Typography component="p">
                        Magic: {this.props.magic}
                    </Typography>

                    <Typography component="p">
                        Agility: {this.props.agility}
                    </Typography>

                    <Typography component="p">
                        Wins: {this.props.win}
                        <br/>
                        Loses: {this.props.lose}
                    </Typography>
          
                    <Typography component="p">
                        Companion: {this.props.petname}           
                    </Typography>
          
                </CardContent>
            </Card>
          </div> 

            <h4>Choose a mini game here</h4>
            <div>
                <h1>Currently at the top of the Tower: {this.state.topPlayerName}
                    </h1></div>
            <div>
                {/* Your pet info:
                <br></br> */}
                
                <div className="pet-img">{this.displayPet(this.props.petType,this.props.petColor,this.props.petAccess)}</div>
                {/* Type: {this.props.petType}
                Color:{this.props.petColor}
                Accessory:{this.props.petAccess} */}
            </div>
            <div className = "row">        
                <MainButtons />
                <TowerBtn />
            </div>
            </React.Fragment>
          );
    }
}
 
export default Main;