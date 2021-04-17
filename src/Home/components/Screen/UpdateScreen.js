import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { detailScreen } from '../Actions/ScreenActions';
import { useParams } from 'react-router-dom';
import { updateScreen } from '../Actions/ScreenActions';
import hist from '../Theatre/hist';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function UpdateScreen() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [screenName, setScreenName] = useState('');
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  let id = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const screen = {
      screenId: Number(id.id),
      screenName: screenName,
      rows: rows,
      columns: columns,
    };

    dispatch(updateScreen(screen));
    detailRedirect();
  };
  const getScreen = useSelector((state) => state.screen.screen);
  const detailRedirect = () => {
    if (getScreen.screenId !== undefined) {
      hist.push('/screen/detail/' + getScreen.screenId);
    }
  };
  useEffect(() => {
    dispatch(detailScreen(id.id));
  }, [dispatch, id.id]);

  const screen = useSelector((state) => state.screen.screen);

  return (
    <div>
      <h3>Fill Details:[Screen ID:{screen.screenId}]</h3>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Typography variant='h6'>Screen Details:</Typography>
        <TextField
          label='Screen Name'
          variant='standard'
          required
          autoFocus={true}
          type='medium'
          style={{ width: 155 }}
          focused={true}
          onChange={(e) => {
            setScreenName(e.target.value);
          }}
          onMouseOver={(e) => {
            if (!e.target.value) {
              e.target.value = screen.screenName;
              setScreenName(e.target.value);
            }
          }}
        />
        <TextField
          label='Rows'
          variant='outlined'
          required
          type='small'
          style={{ width: 155 }}
          focused={true}
          onMouseOver={(e) => {
            if (!e.target.value) {
              e.target.value = screen.rows;
              setRows(e.target.value);
            }
          }}
          onChange={(e) => {
            setRows(e.target.value);
          }}
        />
        <TextField
          label='Columns'
          variant='outlined'
          required
          type='small'
          style={{ width: 155 }}
          onMouseOver={(e) => {
            if (!e.target.value) {
              e.target.value = screen.columns;
              setColumns(e.target.value);
            }
          }}
          focused={true}
          onChange={(e) => {
            setColumns(e.target.value);
          }}
        />

        <Button type='Submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdateScreen;
