import React from 'react';
import './StylesSheet.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Register from './Register';

const useStyles = makeStyles({
  root: {
    // align: 'center',
    alignItems: 'center',

    position: 'absolute',
    top: '0%',
    margin: '0 auto',
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

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className='home'>
      <Card className={classes.root}>
        <CardContent>
          <Register />
          <CardActions className={classes.media}></CardActions>
        </CardContent>
      </Card>
    </div>
  );
}
