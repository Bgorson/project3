import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Route, Link } from 'react-router-dom'

import Tower from '../images/tower.png'


const styles = {
  card: {
    maxWidth: 310,
  },
  media: {
    height: 620,
  }
};

const images =
  {
    title: "tower",
      img: Tower,
      link: "/tower"
  };

function TowerCard(props) {
  const { classes } = props;
  return (
    <div className="tower-card"> 
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          key={images.title}
          component={Link} to={images.link}
          className={classes.media}
          image={images.img}
        />
      </CardActionArea>
    </Card>
    </div>
  );
}

TowerCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TowerCard);