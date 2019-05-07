import React, { Component }from "react"
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


class ModalInstructions extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState ({open: true})
    }

    handleClose = () => {
        this.setState ({open:false});
    }
    render() {
        return(
            <div>
            <Button 
                onClick={handleOpen}
            >
            HOW-TO-PLAY
            </Button>

            <Modal>
                <Typography variant="h3" component="h3">
                    CLICKY GAME
                </Typography>
                <Typography component="p">
                    Click an image below to earn points. Don't click duplicates!
                    Earn more than 5 points to increase your stat!
                </Typography>
            </Modal>
            </div>
        )
    }
}

export default ModalInstructions;