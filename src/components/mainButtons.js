import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Route, Link } from 'react-router-dom'

import Water from '../images/underwater.png'
import Hills from '../images/hills.png'
import Mtn from '../images/mtn.png'
import Trees from '../images/trees.png'
import Tower from '../images/tower.png'

const styles = {
  card: {
    maxWidth: 450,
  },
  media: {
    height: 500,
  }
};

const images = [
  {
    title: "minigame1",
    img: Hills,
    link: "/miniGame1"
  }, {
    title: "minigame2",
    img: Trees,
    link: "/miniGame2"
  }, {
    title: "minigame3",
    img: Mtn,
    link: "/miniGame3"
  }, {
    title: "minigame4",
    img: Water,
    link: "/miniGame4"
  }, {
    title: "tower",
      img: Tower,
      link: "/tower"
  }

];

function MediaCard(props) {
  const { classes } = props;
  return (
    <div className="cards-cards">
    {images.map(image => (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          key={image.title}
          component={Link} to={image.link}
          className={classes.media}
          image={image.img}
        />
      </CardActionArea>
    </Card>
    ))}  
    </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);