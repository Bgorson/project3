import React, {Component} from "react";
import "./style.css";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class NavbarInfo extends Component {
    render(){
        return (
            <Card className="score">
                <CardContent>
                    <Typography variant="h4" component="h4">
                        Score: {this.props.score}
                    </Typography>
                    <br/>
                    <Typography variant="h4" component="h4">
                        Top Score:{this.props.topScore}
                    </Typography>
                </CardContent>
            </Card>   
        )
    }
}

export default NavbarInfo;