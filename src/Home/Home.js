import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core Home/components

import Parallax from 'Home/components/Parallax/Parallax.js';

import { Link } from 'react-router-dom';
const Cards = (prop) => {
  const { name, imageUrl } = prop;
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: '10%',
      border: '2px solid #73AD21',
      borderRadius: '10 px',
      transition: 'transform .3s',
      '&:hover': {
        transform: 'scale(1.15)',
      },
    },
    media: {
      height: 200,
    },
    content: {
      background: '#111',
      color: '#fff',
      margin: 'auto',
      textAlign: 'center',
    },
  });
  const classes = useStyles();
  return (
    <Link to={'/admin/' + name}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageUrl} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant='h5' component='h4'>
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default function Body() {
  return (
    <div>
      <Parallax image={require('assets/img/bg5.jpg')}>
        <Container>
          <Row>
            <Col>
              {Cards({
                name: 'theatre',
                imageUrl:
                  'https://media.istockphoto.com/photos/black-cinema-white-wide-screen-and-auditorium-seats-picture-id1181539359?k=6&m=1181539359&s=612x612&w=0&h=6d8bEmzMFBHsUN1hynuFkfhP7pL5Ny7fuaDMBwkFROc=',
              })}
            </Col>
            <Col>
              {Cards({
                name: 'screen',
                imageUrl: 'https://wallpaperaccess.com/full/1562219.jpg',
              })}
            </Col>
            <Col>
              {Cards({
                name: 'movies',
                imageUrl:
                  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/9a389aa9-00e7-41a2-8a57-4c72c8715b39/d1k82q5-ea9cda39-fd24-49fb-ac93-26a4ec500af4.jpg',
              })}
            </Col>
          </Row>
        </Container>
      </Parallax>
    </div>
  );
}
