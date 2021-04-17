import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import GridContainer from '../../Grid/GridContainer.js';
import GridItem from '../../Grid/GridItem.js';

import Card from '../../Card/Card';
import CardBody from '../../Card/CardBody.js';

import styles from '../../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js';

import team1 from '../../../../assets/img/faces/sravani.jpg';
import team2 from '../../../../assets/img/faces/archana.jpg';
import team3 from '../../../../assets/img/faces/bhargavi1.jpg';
import team4 from '../../../../assets/img/faces/arjun.jpg';
import team5 from '../../../../assets/img/faces/abhiram.jpg';
import team6 from '../../../../assets/img/faces/puneet.jpg';

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Sravani B
                <br />
              </h4>
              <CardBody>
                <p className={classes.description}>
                  201710100281@presidencyuniversity.in
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Archana M P
                <br />
              </h4>
              <CardBody>
                <p className={classes.description}>
                  201710100255@presidencyuniversity.in
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Bhargavi R
                <br />
              </h4>
              <CardBody>
                <p className={classes.description}>
                  201710101100@presidencyuniversity.in
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team4} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Arjun Singh Kushwah
                <br />
              </h4>
              <CardBody>
                <p className={classes.description}>
                  201710100990@presidencyuniversity.in
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team5} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Abhiram PK
                <br />
              </h4>
              <CardBody>
                <p className={classes.description}>
                  201710100188@presidencyuniversity.in
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team6} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Puneet Sir
                <br />
                <small className={classes.smallTitle}>Mentor</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
