import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Col } from 'react-bootstrap';

// @material-ui/icons
// core Home/components

import Parallax from 'Home/components/Parallax/Parallax.js';

import SectionCarousel from './SectionCarousel';

export default function Body() {
  return (
    <div>
      <Parallax image={require('assets/img/832143.png')}>
        <Container>
          <Col>
            <div>
              <SectionCarousel />
            </div>
          </Col>
        </Container>
      </Parallax>
    </div>
  );
}
