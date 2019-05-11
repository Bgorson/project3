import React from "react"
import "./style.css";
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'


class NavbarInfo extends React.Component {
    render(){
        return (
            <Navbar sticky="top">
            <Col>
            Clicky Game
            </Col>

            <Col className="heading">
            {this.props.text}
            </Col>
        
            <Col>
            Score: {this.props.score} | Top Score:{this.props.topScore}
            </Col>
            </Navbar>     
        )
    }
}

export default NavbarInfo;