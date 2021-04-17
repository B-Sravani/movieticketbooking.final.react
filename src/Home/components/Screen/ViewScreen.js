import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScreens } from '../Actions/ScreenActions';
import { CustomLocaleTextGrid } from './PrintScreens';
import { Container, Row, Col } from 'react-bootstrap';

function ViewTheatre() {
  const screens = useSelector((state) => state.screen.screens);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchScreens());
  }, [dispatch]);

  return (
    <Container>
      <Row style={{ textAlign: 'center' }}>
        <Col>
          <h1>SCREEN</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <div>{screens && CustomLocaleTextGrid()}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewTheatre;
