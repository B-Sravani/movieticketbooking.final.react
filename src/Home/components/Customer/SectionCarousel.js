import React from 'react';
// react component for creating beautiful carousel
import Carousel from 'react-slick';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons

import GridContainer from '../../../assets/Grid/GridContainer.js';
import GridItem from '../../../assets/Grid/GridItem.js';
import Card from '../../../assets/Card/Card.js';
import offerImage1 from '../../../assets/img/Offer1.jpg';
import offerImage2 from '../../../assets/img/Offer2.jpeg';
import image3 from '../../../assets/img/bg.jpg';
import image2 from '../../../assets/img/bg2.jpg';
import image1 from '../../../assets/img/bg3.jpg';
import image4 from '../../../assets/img/bg4.jpg';
import styles from '../../../assets/jss/material-kit-react/views/componentsSections/carouselStyle.js';

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div>
      <div>
        <GridContainer>
          <GridItem className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div>
                  <img src={image1} alt='First slide' className='slick-image' />
                  <div className='slick-caption'></div>
                </div>

                <div>
                  <div
                    style={{
                      background: 'url(' + offerImage1 + ')',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                    }}
                  >
                    <img
                      src={image1}
                      alt='First slide'
                      className='slick-image'
                      style={{ visibility: 'hidden' }}
                    />
                    <div className='slick-caption'></div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      background: 'url(' + offerImage2 + ')',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                    }}
                  >
                    <img
                      src={image1}
                      alt='First slide'
                      className='slick-image'
                      style={{ visibility: 'hidden' }}
                    />
                    <div className='slick-caption'></div>
                  </div>
                </div>
                <div>
                  <img
                    src={image2}
                    alt='Second slide'
                    className='slick-image'
                  />
                  <div className='slick-caption'></div>
                </div>
                <div>
                  <img src={image3} alt='Third slide' className='slick-image' />
                  <div className='slick-caption'></div>
                </div>
                <div>
                  <img
                    src={image4}
                    alt='Fourth slide'
                    className='slick-image'
                  />
                  <div className='slick-caption'>
                    <h4>Avengers</h4>
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
