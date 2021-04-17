import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactCardFlip from 'react-card-flip';
import { makeStyles } from '@material-ui/core/styles';
import 'react-multi-carousel/lib/styles.css';
import Card from '@material-ui/core/Card';
import { Form } from 'react-bootstrap';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import { red } from '@material-ui/core/colors';
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
function MovieCard1(theatres) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    var showList = [];

    theatres &&
      theatres.map((theatre) => {
        theatre.listOfScreens.map((screen) => {
          screen.showList.map((show) => {
            return showList.push(show);
          });
          return ' ';
        });
        return ' ';
      });

    setShows(showList);
  }, [theatres]);

  const handleClick = (e) => {
    setIsFlipped(!isFlipped);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
  const classes = useStyles();
  return (
    <div>
      <h4>Some Recommended Shows...</h4>
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
        {shows.map((show) => {
          return (
            <div key={show.showId}>
              <ReactCardFlip
                isFlipped={isFlipped}
                flipDirection='vertical'
                key={show.showId}
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
                      background: 'url(' + show.movie.imageUrl + ')',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      height: '380px',
                      width: '250px',
                      padding: '3px',
                      borderStyle: 'solid',
                    }}
                  ></Card>

                  <h6 className='card-footer'>{show.movie.movieName}</h6>
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
                      image={show.movie.imageUrl}
                      title='Movie'
                    />
                    <CardContent>
                      <Form>
                        <Form.Group id='name'>
                          <Form.Label>Starts At:</Form.Label>
                          <Form.Control
                            type='datetime-local'
                            disabled={true}
                            value={show.showStartTime}
                          />
                          <Form.Label>Ends At:</Form.Label>
                          <Form.Control
                            type='datetime-local'
                            disabled={true}
                            value={show.showEndTime}
                          />
                          <Form.Control
                            type='text'
                            disabled={true}
                            value={'Language: ' + show.movie.language}
                            style={{ marginTop: '10px' }}
                          />
                          <Link to={'/customer/bookShow/' + show.showId}>
                            <Button color='secondary'>Book</Button>
                          </Link>
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
  );
}

export default MovieCard1;
