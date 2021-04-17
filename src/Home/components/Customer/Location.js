import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTheatreByCity } from '../Actions/BookingActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemText from '@material-ui/core/ListItemText';
import hist from '../Theatre/hist';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
function Location() {
  const dispatch = useDispatch();
  const [openL, setOpenL] = useState(false);
  const [city, setCity] = useState('');
  const location = useSelector((state) => state.booking.location);
  const handleClickOpenL = () => {
    setOpenL(true);
  };

  const handleCloseL = () => {
    setOpenL(false);
  };

  useEffect(() => {
    dispatch(fetchTheatreByCity());
  }, [dispatch]);

  useEffect(() => {
    if (city === '') {
      handleClickOpenL();
    }
    console.clear();
  }, [city]);

  const handleChangeT = (event) => {
    if (event.target.value !== undefined) {
      setCity(event.target.value);
      hist.push('/customer/city/' + event.target.value);
    }
    handleCloseL();
  };

  return (
    <div>
      Hello
      <Dialog
        open={openL}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseL}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <form>
          <DialogTitle id='alert-dialog-slide-title'>
            {'Please Select City'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Select City
            </DialogContentText>
            {location && (
              <Select
                labelId='mutiple-checkbox-label'
                id='demo-mutiple-checkbox'
                onChange={handleChangeT}
                renderValue={(selected) => selected}
                fullWidth={true}
                variant='outlined'
              >
                {location.map((loc) => (
                  <MenuItem key={loc} value={loc} style={{ overflowX: 'auto' }}>
                    <ListItemText primary={loc} />
                  </MenuItem>
                ))}
              </Select>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default Location;
