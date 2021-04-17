import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useAuth } from '../../../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerByEmail } from '../../Actions/UserActions';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import hist from 'Home/components/Theatre/hist';
import { addFeedback } from '../../Actions/BookingActions';

const StyledRating = withStyles({
  iconFilled: {
    color: '#32CD32',
  },
  iconHover: {
    color: '#006400',
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Feedback() {
  const [rating, setRating] = useState(0);
  var user = useAuth().currentUser;
  const customer = useSelector((state) => state.user.customer);
  const dispatch = useDispatch();
  const feedbackRef = useRef();

  useEffect(() => {
    dispatch(fetchCustomerByEmail(user.email));
  }, [dispatch, user.email]);

  const handleFeedback = (e) => {
    e.preventDefault();

    const feedbackObj = {
      custId: customer.customerId,
      rating: rating,
      feedback: feedbackRef.current.value,
    };
    console.log(feedbackObj);
    dispatch(addFeedback(feedbackObj));
    hist.push('/customer/tickets');
  };

  return (
    <div style={{ paddingTop: '25px', paddingBottom: '25px' }}>
      <div
        style={{
          maxHeight: '90%',
          maxWidth: '90%',
          margin: '0 auto',
        }}
      >
        <Typography
          style={{
            margin: '0 auto',
            fontFamily: 'Times New Roman',
            fontSize: '25px',
          }}
        >
          Woo hoo! It looks like you're meant to get lost in the world of movies
          like us!
        </Typography>
        <br />
        <br />
        <h4>Feedback Form</h4>
        <Typography>
          We would love to hear your thoughts, suggestions, concerns or problems
          with anything so we can improve!
        </Typography>
        <br />
        <div style={{ border: '1px solid', padding: '10px' }}>
          <Typography component='legend'>Rating</Typography>
          <Box component='fieldset' mb={3}>
            <StyledRating
              name='customized-icons'
              defaultValue={2}
              getLabelText={(value) => customIcons[value].label}
              IconContainerComponent={IconContainer}
              size='large'
              onChange={(e) => {
                setRating(e.currentTarget.value);
              }}
            />
          </Box>
          <TextField
            id='outlined-multiline-static'
            label='Feedback'
            multiline
            rows={4}
            variant='outlined'
            inputRef={feedbackRef}
            fullWidth={true}
          />
          <Button
            onClick={handleFeedback}
            variant='contained'
            color='primary'
            style={{ margin: '10px' }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              hist.push('/customer/tickets');
            }}
            variant='contained'
            color='secondary'
            style={{ margin: '10px' }}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
}
