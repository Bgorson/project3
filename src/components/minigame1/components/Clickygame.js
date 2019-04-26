import React, {Component} from "react";
import Clickcard from "./Clickcard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Jumbotron from "./Jumbotron"
import cards from "../cards.json"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import "./style.css"

class Clickygame extends Component {
    state= {
        score: 0,
        topScore: 0,
        clicked: [],
        headerText: "Click an Image to Begin"
    }



handleClick = event =>{
    console.log("clicked")
    let localScore = this.state.score
    console.log(this.state.topScore)
    //check if its in the array
    //make this ternerary operator?
    if (this.state.clicked.indexOf(event.target.alt) === -1){
        localScore = localScore +1
        this.state.clicked.push(event.target.alt)
        this.setState({
            score: localScore,
            headerText:"That is correct!",
            topScore: Math.max(this.state.topScore, localScore)
        })


    } 

    else {
        this.setState({
            score:0,
            clicked:[],
            headerText:"That is incorrect"
            })
    }
    console.log(event.target.alt)
}
//Pulled function from StackOverFlow: https://stackoverflow.com/questions/38101522/how-to-render-random-objects-from-an-array-in-react
shuffleCards = array =>{
    let i = array.length-1;
    for(; i > 0;i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i]= array[j];
        array[j]= temp;
    }
    return array;
}

render(){
    return (
        <div>
            <Navbar
            score = {this.state.score}
            topScore= {this.state.topScore}
            text= {this.state.headerText}
            />
        
            <Jumbotron/>
        <Container className= "collection">
           <Row>
        <Clickcard 
            shuffle = {this.shuffleCards}
            cards = {cards}
            handleClick= {this.handleClick}
            />
            </Row>


        </Container>
            <Footer/>
        </div>
    )
}
}
export default Clickygame;