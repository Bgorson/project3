import React from "react"
import Image from 'react-bootstrap/Image'
import "./hover.css"
import Col from 'react-bootstrap/Col'


function Clickcard(props) {
    return(
          props.shuffle(props.cards).map(characters =>(
            <Col xs={6} md={4} lg= {3}>
          <div key = {characters.id} className=" hvr-grow card">
          
          <Image onClick= {props.handleClick} className= "cardImage" alt={characters.name} src={characters.image} responsive/>
        </div>
        </Col>
        ))
    )
}
export default Clickcard;