import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailScreen } from '../Actions/ScreenActions';
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

function DetailScreen() {
  let id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailScreen(id.id));
  }, [dispatch, id.id]);

  const [sopen, setSopen] = useState(false);
  const [sopenState, setSopenState] = React.useState(true);
  const screen = useSelector((state) => state.screen.screen);
  const error = useSelector((state) => state.screen.error);
  const loading = useSelector((state) => state.screen.loading);
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
        <Link to={'/admin/screen/update/' + id.id} style={{ float: 'right' }}>
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
          )) ||
          (screen && (
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
                    label='Screen ID'
                    value={screen.screenId}
                    disabled={true}
                  />
                  <TextField
                    id='standard-basic'
                    label='Theatre ID'
                    value={screen.theatreId}
                    disabled={true}
                  />
                  <TextField
                    id='outlined-basic'
                    label='Screen Name'
                    variant='outlined'
                    value={screen.screenName}
                    disabled={true}
                  />
                  <TextField
                    id='outlined-basic'
                    label='Rows'
                    variant='outlined'
                    value={screen.rows}
                    disabled={true}
                  />
                  <TextField
                    id='outlined-basic'
                    label='Columns'
                    variant='outlined'
                    value={screen.columns}
                    disabled={true}
                  />
                </form>
                <Row>
                  <Typography variant='h5' component='h6'>
                    Show List:
                  </Typography>
                </Row>
                {screen.showList &&
                  screen.showList.map((show) => {
                    return (
                      <div key={show.showId}>
                        <Row>
                          <form
                            className={classes.root1}
                            noValidate
                            autoComplete='off'
                          >
                            <TextField
                              id='standard-basic'
                              label='Show Name'
                              value={show.showName}
                              disabled={true}
                            />
                            <TextField
                              id='datetime-local'
                              label='Show Start Time'
                              value={show.showStartTime}
                              type='datetime-local'
                              disabled={true}
                              style={{ width: '12rem' }}
                            />
                            <TextField
                              id='datetime-local'
                              label='Show End Time'
                              type='datetime-local'
                              value={show.showEndTime}
                              disabled={true}
                              style={{ width: '12rem' }}
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
          ))}
      </Row>
    </Container>
  );
}

export default DetailScreen;
