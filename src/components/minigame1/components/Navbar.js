import React, {Component} from "react";
import "./style.css";


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class NavbarInfo extends Component {
    render(){
        return (
            <Card>
                <CardContent>
                    <Typography>
                        {this.props.text}
                    </Typography>
                
                    <Typography>
                        Score: {this.props.score} | Top Score:{this.props.topScore}
                    </Typography>
                </CardContent>
            </Card>   
        )
    }
}

export default NavbarInfo;