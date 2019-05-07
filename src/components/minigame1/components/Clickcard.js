import React from "react"

// material-ui
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 200,
  } ,
  media: {
    height: 200,
  }
};

function Clickcard (props) {
  const { classes } = props;
    return (
      props.shuffle(props.cards).map(characters => (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia key = {characters.id}>   
              <img 
                  onClick= {props.handleClick} 
                  className={classes.media}
                  alt={characters.name} 
                  src={characters.image} 
                />
            </CardMedia>
          </CardActionArea>
        </Card>
      ))
    )
}

Clickcard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Clickcard);