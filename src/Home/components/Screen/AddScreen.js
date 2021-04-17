import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { addScreen, fetchScreens } from 'Home/components/Actions/ScreenActions';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import hist from '../Theatre/hist';
import { fetchTheatre } from '../Actions/TheatreActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  screen: {
    margin: theme.spacing(1),
  },
}));

function AddScreen() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [screenName, setScreenName] = useState('');
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [theatreArr, setTheatreArr] = React.useState([]);
  const fetchTheatres = useSelector((state) => state.theatre.theatres);
  const screenNameRef = React.useRef();
  const rowsRef = React.useRef();
  const columnsRef = React.useRef();
  const selectRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (screenName === '') {
        screenNameRef.current.focus();
        throw new Error('Fill Screen Name');
      }
      if (rows === 0) {
        rowsRef.current.focus();
        throw new Error('Fill rows ');
      }
      if (columns === 0) {
        columnsRef.current.focus();
        throw new Error('Fill columns ');
      }
      if (selectRef.current.innerText === '') {
        console.log('error');
        selectRef.current.focus();
        throw new Error('Select Theatre ');
      }

      const screen = {
        theatreId: theatreArr,
        screenName: screenName,
        rows: rows,
        columns: columns,
      };

      dispatch(addScreen(screen));
      hist.push('/admin/screen/');
    } catch (Exception) {
      console.log(Exception.message);
    }
  };

  //Fetch Theatres for Drop Down
  useEffect(() => {
    dispatch(fetchTheatre());
    dispatch(fetchScreens());
  }, [dispatch]);

  const handleChangeT = (event) => {
    setTheatreArr(event.target.value);
  };

  return (
    <div>
      <h3>Fill Details:</h3>
      <form
        className={classes.root}
        noValidate
        autoComplete='on'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Typography variant='h6'>Screen Details:</Typography>
        <TextField
          label='Screen Name'
          variant='outlined'
          required
          autoFocus={true}
          type='small'
          style={{ width: 155 }}
          onChange={(e) => {
            setScreenName(e.target.value);
          }}
          inputRef={screenNameRef}
        />

        <TextField
          name='rows'
          label='rows'
          variant='outlined'
          size='small'
          type='number'
          onChange={(e) => {
            setRows(e.target.value);
          }}
          className={classes.screen}
          inputRef={rowsRef}
        />

        <TextField
          name='columns'
          label='columns'
          variant='outlined'
          size='small'
          type='number'
          onChange={(e) => {
            setColumns(e.target.value);
          }}
          className={classes.screen}
          inputRef={columnsRef}
        />

        <InputLabel id='mutiple-checkbox-label'>Theatre ID:</InputLabel>
        <Select
          labelId='mutiple-checkbox-label'
          id='demo-mutiple-checkbox'
          value={theatreArr[0]}
          onChange={handleChangeT}
          input={<Input />}
          renderValue={(selected) => selected}
          fullWidth={true}
          variant='outlined'
          innerRef={selectRef}
          defaultValue='1'
        >
          {fetchTheatres.map((theatre) => (
            <MenuItem
              key={theatre.theatreId}
              value={theatre.theatreId}
              style={{ overflowX: 'auto' }}
            >
              <ListItemText primary={theatre.theatreId} />
            </MenuItem>
          ))}
        </Select>
        <br />
        <Button type='Submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddScreen;
