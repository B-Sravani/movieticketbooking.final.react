import React, { useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '@material-ui/core/Card';
import { Form, InputGroup } from 'react-bootstrap';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function MovieCard(movies) {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const [isFlipped, setIsFlipped] = React.useState(false);
  const handleClick = (e) => {
    setIsFlipped(!isFlipped);
  };
  useEffect(() => {
    console.log(movies);
  }, [movies]);
  return (
    <div>
      <h4>Some Recommended Movies...</h4>
      <div className='card-deck' style={{ margin: '10px' }}>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition='all .5'
          transitionDuration={500}
          containerClass='carousel-container'
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'
        >
          {movies.map((m) => {
            return (
              <div>
                <ReactCardFlip
                  isFlipped={isFlipped}
                  flipDirection='vertical'
                  key={m.movieId}
                  className='card'
                >
                  <div
                    onClick={handleClick}
                    style={{
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      height: '410px',
                      width: '250px',
                      margin: '10px',
                      border: '5px red',
                      textAlign: 'center',
                    }}
                  >
                    <Card
                      className='card-body'
                      style={{
                        background: 'url(' + m.imageUrl + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        height: '380px',
                        width: '250px',
                        padding: '3px',
                        borderStyle: 'solid',
                      }}
                    ></Card>

                    <h6 className='card-footer'>{m.movieName}</h6>
                  </div>
                  <div
                    onClick={handleClick}
                    style={{
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      height: '410px',
                      width: '250px',
                      margin: '10px',
                      padding: '3px',
                      textAlign: 'center',
                    }}
                  >
                    <Card
                      className={classes.root}
                      style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        height: '380px',
                        width: '250px',
                        padding: '3px',
                        borderStyle: 'solid',
                      }}
                    >
                      <CardMedia
                        className={classes.media}
                        image={m.imageUrl}
                        title='Paella dish'
                      />
                      <CardContent>
                        <Form>
                          <Form.Group id='name'>
                            <Form.Label>{m.movieName}</Form.Label>
                            <Form.Control
                              type='text'
                              disabled={true}
                              autoFocus={true}
                              value={'Genre: ' + m.movieGenre}
                            />
                            <Form.Control
                              type='text'
                              disabled={true}
                              autoFocus={true}
                              value={'Hours: ' + m.movieHours}
                            />
                            <Form.Control
                              type='text'
                              disabled={true}
                              autoFocus={true}
                              value={'Language: ' + m.language}
                            />
                            <Form.Control
                              type='text'
                              disabled={true}
                              autoFocus={true}
                              value={'Description: ' + m.description}
                            />
                            <Button color='secondary'>Book</Button>
                          </Form.Group>
                        </Form>
                      </CardContent>
                    </Card>
                  </div>
                </ReactCardFlip>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default MovieCard;
