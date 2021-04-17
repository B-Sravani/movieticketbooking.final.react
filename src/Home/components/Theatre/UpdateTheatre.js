import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { detailTheatre } from '../Actions/TheatreActions';
import { useParams } from 'react-router-dom';
import { updateTheatre } from '../Actions/TheatreActions';
import hist from './hist';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '15px',
    border: '1px solid',
    borderRadius: '20px',

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputFields: {
    width: '50%',
    display: 'block',
    margin: '20px',
    left: '20%',
  },
  submit: {
    left: '25%',
  },
  container: {
    margin: '20px',
    padding: '10px',
  },
}));

function UpdateTheatre() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [theatreName, setTheatreName] = useState('');
  const [theatreCity, setTheatreCity] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerContact, setManagerContact] = useState('');

  let id = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const theatre = {
      theatreId: Number(id.id),
      theatreName: theatreName,
      theatreCity: theatreCity,
      managerName: managerName,
      managerContact: managerContact,
    };

    dispatch(updateTheatre(theatre));
    detailRedirect();
  };
  const getTheatre = useSelector((state) => state.theatre.theatre);
  const detailRedirect = () => {
    if (getTheatre.theatreId !== undefined) {
      hist.push('/admin/theatre/detail/' + getTheatre.theatreId);
    }
  };
  useEffect(() => {
    dispatch(detailTheatre(id.id));
  }, [dispatch, id.id]);

  const theatre = useSelector((state) => state.theatre.theatre);

  return (
    <div className={classes.container}>
      <h3>Fill Details:[Theatre ID:{theatre.theatreId}]</h3>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Typography variant='h6'>Theatre Details:</Typography>
        <TextField
          label='Theatre Name'
          variant='standard'
          required
          autoFocus={true}
          type='medium'
          className={classes.inputFields}
          focused={true}
          onChange={(e) => {
            setTheatreName(e.target.value);
          }}
          onMouseOver={(e) => {
            if (!e.target.value) {
              e.target.value = theatre.theatreName;
              setTheatreName(e.target.value);
            }
          }}
        />
        <TextField
          label='Theatre City'
          variant='outlined'
          required
          type='small'
          className={classes.inputFields}
          focused={true}
          onMouseOver={(e) => {
            if (!e.target.value) {
              e.target.value = theatre.theatreCity;
              setTheatreCity(e.target.value);
            }
          }}
          onChange={(e) => {
            setTheatreCity(e.target.value);
          }}
        />
        <TextField
          label='Manager Name'
          variant='outlined'
          required
          type='small'
          className={classes.inputFields}
          onMouseOver={(e) => {
            if (!e.target.value) {
              e.target.value = theatre.managerName;
              setManagerName(e.target.value);
            }
          }}
          focused={true}
          onChange={(e) => {
            setManagerName(e.target.value);
          }}
        />
        <TextField
          label='Manager Contact'
          variant='outlined'
          required
          type='small'
          focused={true}
          className={classes.inputFields}
          onMouseOver={(e) => {
            if (!e.target.value) {
              e.target.value = theatre.managerContact;
              setManagerContact(e.target.value);
            }
          }}
          onChange={(e) => {
            setManagerContact(e.target.value);
          }}
        />

        <Button
          type='Submit'
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdateTheatre;
