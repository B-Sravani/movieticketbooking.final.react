import React from 'react';
import './StylesSheet.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Login from './Login';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    // align: 'center',
    alignItems: 'center',
    maxWidth: 350,
    width: '100%',
    position: 'absolute',
    top: '20%',

    overflow: 'auto',
    // backgroundColor:'white',
    opacity: 1,
  },
  media: {
    alignSelf: 'center',
  },
  text: {
    color: 'white',
  },
});

export default function SimplePaper2() {
  const classes = useStyles();

  return (
    <div className='home'>
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <Login />

          <CardActions className={classes.media}></CardActions>
        </CardContent>
      </Card>
    </div>
  );
}
