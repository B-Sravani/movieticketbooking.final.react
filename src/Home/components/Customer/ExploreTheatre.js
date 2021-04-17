import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { detailTheatre } from '../Actions/TheatreActions';
import { useDispatch, useSelector } from 'react-redux';

import MovieCard from './Cards/TheatreMovieCard';

function Explore() {
  const dispatch = useDispatch();
  const theatreId = useParams();

  const theatre = useSelector((state) => state.theatre.theatre);

  useEffect(() => {
    dispatch(detailTheatre(theatreId.theatreId));
  }, [dispatch, theatreId.theatreId]);

  useEffect(() => {
    theatre && console.log(theatre);
  }, [theatre]);

  return (
    <div>
      <div style={{ borderBottom: '5px solid' }}>
        {theatre && MovieCard(theatre)}
      </div>
    </div>
  );
}

export default Explore;
