import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom'

import One from '../images/icon01.png'
import Two from '../images/icon02.png'
import Three from '../images/icon03.png'
import Four from '../images/icon04.png'
import Cs from '../images/cs01.png'


const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 300,
  }
};

const images = [
  {
    title: "minigame1",
    img: One,
    link: "/miniGame1"
  }, {
    title: "minigame2",
    img: Two,
    link: "/miniGame2"
  }, {
    title: "minigame3",
    img: Three,
    link: "/miniGame3"
  }, {
    title: "minigame4",
    img: Four,
    link: "/miniGame4"
  }, {
    title: "coming",
      img: Cs,
      link: "/main"
  }, {
    title: "coming",
      img: Cs,
      link: "/main"
  }, {
    title: "coming",
      img: Cs,
      link: "/main"
  }, {
    title: "coming",
      img: Cs,
      link: "/main"
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