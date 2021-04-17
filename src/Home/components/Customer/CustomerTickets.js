import React, { useEffect, useState } from 'react';
import { fetchCustomerByEmail } from '../Actions/UserActions';
import { useAuth } from '../../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import { fetchShowForImage } from '../Actions/ShowActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { cancelTicket } from '../Actions/BookingActions';
import firebase from 'firebase';
require('firebase/auth');

function CustomerTickets() {
  var user = useAuth().currentUser;
  const customer = useSelector((state) => state.user.customer);
  const showsImages = useSelector((state) => state.show.shows);
  const dispatch = useDispatch();
  const [showsI, setShowsI] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomerByEmail(user.email));
  }, [dispatch, user.email]);

  useEffect(() => {
    var shows = [];
    customer.ticketBooking &&
      customer.ticketBooking.map((ticket) => {
        return shows.push(ticket.showId);
      });

    setShowsI(shows);
  }, [dispatch, customer]);

  useEffect(() => {
    showsI && dispatch(fetchShowForImage(showsI));
  }, [showsI, dispatch]);

  function cancelBooking(custId, ticketId) {
    var user = firebase.auth().currentUser;
    var password = prompt('Enter Password To Confirm');
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    // Prompt the user to re-provide their sign-in credentials

    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        // User re-authenticated.
        dispatch(cancelTicket(custId, ticketId));
      })
      .catch(function (error) {
        // An error happened.
        return alert(error);
      });
  }
  return (
    <div style={{ padding: '30px' }}>
      <h6>Tickets Booked:</h6>
      {customer &&
        customer.ticketBooking &&
        customer.ticketBooking.map((ticketBooked, i) => {
          return (
            <Grid
              container
              spacing={2}
              key={ticketBooked.ticketId}
              style={{ border: '2px solid', margin: '20px', width: '80%' }}
            >
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardActionArea>
                    <Typography>Date:</Typography>
                    <TextField
                      id='date'
                      type='date'
                      value={ticketBooked.bookingDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Typography>
                      Transaction Id: {ticketBooked.transactionId}
                    </Typography>
                    <Typography>
                      Transaction Mode:{ticketBooked.transactionMode}
                    </Typography>
                    <Typography>
                      Transaction Status:{ticketBooked.transactionStatus}
                    </Typography>
                    <Typography>Total Cost:{ticketBooked.totalCost}</Typography>
                    <Typography>
                      No Of Seats:{ticketBooked.ticket.noOfSeats}
                    </Typography>
                    <Typography>
                      Seats:
                      {ticketBooked.ticket.seats.map((seat) => {
                        return ' ' + seat.seatNumber + '-' + seat.type + ' ,';
                      })}
                    </Typography>
                  </CardActionArea>
                </Card>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ margin: '20px' }}
                  onClick={(e) => {
                    cancelBooking(customer.customerId, ticketBooked.ticketId);
                  }}
                >
                  Cancel Booking
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {showsImages[i] && (
                  <div>
                    <div
                      style={{
                        width: '80%',
                        height: '100%',
                        top: '0',
                        backgroundImage:
                          'url(' + showsImages[i].movie.imageUrl + ')',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      <img
                        src={showsImages[i].movie.imageUrl}
                        style={{
                          visibility: 'hidden',
                          width: '50%',
                          height: '50%',
                        }}
                        alt='poster'
                      />
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          );
        })}
    </div>
  );
}

export default CustomerTickets;
