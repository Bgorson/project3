import React from "react"
import Jumbotron from 'react-bootstrap/Jumbotron'

function JumbotronComponent() {
    return(
        <Jumbotron fluid>
        <h1>Clicky Game!</h1>
        <p>Click an image below to earn points. Don't click duplicates! </p>
</Jumbotron>
    )
}
export default JumbotronComponent;