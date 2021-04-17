import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailTheatre } from '../Actions/TheatreActions';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  root1: {
    '& > *': {
      margin: theme.spacing(1),
      width: '11ch',
    },
  },
  snack: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  load: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function DetailTheatre() {
  let id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailTheatre(id.id));
  }, [dispatch, id.id]);

  const [sopen, setSopen] = useState(false);
  const [sopenState, setSopenState] = React.useState(true);
  const theatres = useSelector((state) => state.theatre.theatre);
  const error = useSelector((state) => state.theatre.error);
  const loading = useSelector((state) => state.theatre.loading);
  const classes = useStyles();

  const handleClickS = () => {
    setSopen(true);
  };
  const handleCloseS = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSopen(false);
  };

  return (
    <Container>
      <center>
        <h2>INFO</h2>
        <Link to={'/admin/theatre/update/' + id.id} style={{ float: 'right' }}>
          <Button variant='contained' size='medium' color='primary'>
            Edit
          </Button>
        </Link>
      </center>

      <Row>
        {(loading && (
          <Col>
            <center>
              <CircularProgress />
            </center>
          </Col>
        )) ||
          (error && (
            <Col>
              <Alert severity='error'>{error}</Alert>
            </Col>
          )) || (
            <Col
              onMouseOver={(e) => {
                sopenState && handleClickS();
                setSopenState(false);
              }}
            >
              <center>
                <form className={classes.root} noValidate autoComplete='off'>
                  <TextField
                    id='standard-basic'
                    label='Theatre ID'
                    value={theatres.theatreId}
                    disabled={true}
                  />
                  <TextField
                    id='outlined-basic'
                    label='Theatre Name'
                    variant='outlined'
                    value={theatres.theatreName}
                    disabled={true}
                  />
                  <TextField
                    id='outlined-basic'
                    label='Theatre City'
                    variant='outlined'
                    value={theatres.theatreCity}
                    disabled={true}
                  />
                  <TextField
                    id='outlined-basic'
                    label='Manager Name'
                    variant='outlined'
                    value={theatres.managerName}
                    disabled={true}
                  />
                  <TextField
                    id='outlined-basic'
                    label='Manager Contact'
                    variant='outlined'
                    value={theatres.managerContact}
                    disabled={true}
                  />
                </form>
                <Row>
                  <Typography variant='h5' component='h6'>
                    Movie List:
                  </Typography>
                </Row>
                {theatres.listOfMovies &&
                  theatres.listOfMovies.map((movie) => {
                    return (
                      <div key={movie.movieId}>
                        <Row>
                          <form
                            className={classes.root1}
                            noValidate
                            autoComplete='off'
                          >
                            <TextField
                              id='standard-basic'
                              label='Movie Name'
                              value={movie.movieName}
                              disabled={true}
                            />
                            <TextField
                              id='standard-basic'
                              label='Genre'
                              value={movie.movieGenre}
                              disabled={true}
                            />
                            <TextField
                              id='standard-basic'
                              label='Movie Hours'
                              value={movie.movieHours}
                              disabled={true}
                            />
                            <TextField
                              id='standard-basic'
                              label='Language'
                              value={movie.language}
                              disabled={true}
                            />
                            <TextField
                              id='standard-basic'
                              label='Desc'
                              value={movie.description}
                              disabled={true}
                            />
                          </form>
                        </Row>
                      </div>
                    );
                  })}
                <Row>
                  <Typography variant='h5' component='h6'>
                    Screen List:
                  </Typography>
                </Row>
                {theatres.listOfScreens &&
                  theatres.listOfScreens.map((screen) => {
                    return (
                      <div key={screen.screenId}>
                        <Row>
                          <form
                            className={classes.root1}
                            noValidate
                            autoComplete='off'
                          >
                            <TextField
                              id='outlined-size-small'
                              label='Screen Name'
                              value={screen.screenName}
                              disabled={true}
                              size='small'
                            />
                            <TextField
                              id='outlined-size-small'
                              label='Rows'
                              value={screen.rows}
                              disabled={true}
                              size='small'
                            />
                            <TextField
                              id='outlined-size-small'
                              label='Columns'
                              value={screen.columns}
                              disabled={true}
                              size='small'
                            />
                          </form>
                        </Row>
                      </div>
                    );
                  })}
              </center>

              <Snackbar
                open={sopen}
                autoHideDuration={6000}
                onClose={handleCloseS}
              >
                <Alert onClose={handleCloseS} severity='success'>
                  Success
                </Alert>
              </Snackbar>
            </Col>
          )}
      </Row>
    </Container>
  );
}

export default DetailTheatre;
