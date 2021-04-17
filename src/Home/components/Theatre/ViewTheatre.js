import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTheatre } from '../Actions/TheatreActions';
import { CustomLocaleTextGrid } from './PrintTheatres';
import { Container, Row, Col } from 'react-bootstrap';

function ViewTheatre() {
  const theatres = useSelector((state) => state.theatre.theatres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTheatre());
  }, [dispatch]);

  return (
    <Container>
      <Row style={{ textAlign: 'center' }}>
        <Col>
          <h1>THEATRE</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <div>{theatres && CustomLocaleTextGrid()}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewTheatre;
