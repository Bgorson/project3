import React, { Component }from "react"
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'

function ModalInstructions(props) {
    return(
        <Card className="instructions">       
            <Typography variant="h3" component="h3">
                CLICKY GAME
            </Typography>
            <Typography component="p">
                Click an image below to earn points. Don't click duplicates!
                Earn more than 5 points to increase your stat!
            </Typography>
        </Card>
    )
}

export default ModalInstructions;