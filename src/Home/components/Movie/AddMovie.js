import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { addMovie } from '../Actions/MovieActions';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';

import hist from '../Theatre/hist';

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

function AddMovie() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [movieName, setMovieName] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  const [movieHours, setMovieHours] = useState('');
  const [movieLanguage, setMovieLanguage] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieUrl, setMovieUrl] = useState('');

  const fetchMovie = useSelector((state) => state.movie.movie);
  useEffect(() => {
    console.log(fetchMovie);
  }, [fetchMovie]);

  useEffect(() => {
    console.log(movieUrl);
  }, [movieUrl]);
  const movieNameRef = React.useRef();
  const movieGenreRef = React.useRef();
  const movieHoursRef = React.useRef();
  const movieLanguageRef = React.useRef();
  const movieDescriptionRef = React.useRef();
  const movieUrlRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieUrl);

    try {
      if (movieName === '') {
        movieNameRef.current.focus();
        throw new Error('Fill Movie Name');
      }
      if (movieGenre === '') {
        movieGenreRef.current.focus();
        throw new Error('Fill Movie Genre');
      }
      if (movieHours === '') {
        movieHoursRef.current.focus();
        throw new Error('Fill Movie Hours');
      }
      if (movieLanguage === '') {
        movieLanguageRef.current.focus();
        throw new Error('Fill Movie Language');
      }
      if (movieDescription === '') {
        movieDescriptionRef.current.focus();
        throw new Error('Fill Movie Description');
      }

      if (movieUrl === '') {
        movieUrlRef.current.focus();
        throw new Error('Fill Movie Url');
      }

      const movie = {
        movieName: movieName,
        movieGenre: movieGenre,
        movieHours: movieHours,
        movieLanguage: movieLanguage,
        movieDescription: movieDescription,
        movieUrl: movieUrl,
      };

      dispatch(addMovie(movie));

      hist.push('/admin/movies');
    } catch (Exception) {
      console.log(Exception.message);
    }
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
        <Typography variant='h6'>Movie Details:</Typography>
        <TextField
          label='Movie Name'
          variant='outlined'
          required
          autoFocus={true}
          type='small'
          style={{ width: 155 }}
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
          inputRef={movieNameRef}
        />
        <TextField
          label='Movie Genre'
          variant='outlined'
          required
          type='small'
          style={{ width: 155 }}
          inputRef={movieGenreRef}
          onChange={(e) => {
            setMovieGenre(e.target.value);
          }}
        />
        <TextField
          label='Movie Hours'
          variant='outlined'
          required
          type='small'
          style={{ width: 155 }}
          inputRef={movieHoursRef}
          onChange={(e) => {
            setMovieHours(e.target.value);
          }}
        />
        <TextField
          label='Movie Language'
          variant='outlined'
          required
          type='small'
          style={{ width: 155 }}
          inputRef={movieLanguageRef}
          onChange={(e) => {
            setMovieLanguage(e.target.value);
          }}
        />

        <TextField
          label='Movie Description'
          variant='outlined'
          required
          type='small'
          style={{ width: '*' }}
          inputRef={movieDescriptionRef}
          onChange={(e) => {
            setMovieDescription(e.target.value);
          }}
        />
        <TextField
          label='Movie Url'
          variant='outlined'
          required
          type='small'
          style={{ width: '*' }}
          onChange={(e) => {
            setMovieUrl(e.target.value);
          }}
          inputRef={movieUrlRef}
        />
        <br />
        <Button type='Submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddMovie;
