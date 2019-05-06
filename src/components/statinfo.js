import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class StatInfo extends Component {
    constructor() {
        super()
        this.state = {
            stat: [],
            userId: null,
          }
    }

    componentDidMount() {
        this.props.getStats()
     }

    render() { 
        return ( 
          <div className="stat-box"> 
            <Card className="stat-content">
                <CardContent>
                    <Typography variant="h5" component="h2">
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
                        Loses: {this.props.lose}
                    </Typography>
                </CardContent>
            </Card>
          </div> 
        );
    }
}
 
export default StatInfo;