import React from "react"
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'

function ModalInstructions(props) {
    return(
        <Card className="instructions">       
            <Typography variant="h3" component="h3">
                SPIRIT MEMORY
            </Typography>
            <br/>
            <Typography component="p">
                Increase your strength on your voyage through Kingsthon Hallow! To do so,
                you must remember each spirit you come across! But be warned! If you click 
                on the same spirit twice, the spirits will not let you pass and you will 
                not acquire the strength needed to face the Tower!
            </Typography>
        </Card>
    )
}

export default ModalInstructions;