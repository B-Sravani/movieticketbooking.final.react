import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { deleteTheatreByID, fetchTheatre } from '../Actions/TheatreActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from 'firebase';
require('firebase/auth');

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const CustomLocaleTextGrid = () => {
  const dispatch = useDispatch();
  const [del, setDel] = React.useState(false); //State to refresh after delete
  React.useEffect(() => {
    dispatch(fetchTheatre());
    handleClose();
  }, [del, dispatch]); //To fetch after deletion

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const theatres = useSelector((state) => state.theatre.theatres);
  const error = useSelector((state) => state.theatre.error);
  const loading = useSelector((state) => state.theatre.loading);

  const enterPassword = (theatreId) => {
    handleClickOpen();
    setId(theatreId);
  };

  async function deleteTheatre(id) {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        // User re-authenticated.
        dispatch(deleteTheatreByID(id));
        setDel(!del);

        return <div>{console.log('Deleted' + id)}</div>;
      })
      .catch(function (error) {
        // An error happened.
        return alert('Incorrect Password');
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [password, setPassword] = React.useState('');

  const options = theatres.map(function (row) {
    return {
      id: row.theatreId,
      name: row.theatreName,
      theatreCity: row.theatreCity,
      managerName: row.managerName,
      managerContact: row.managerContact,
      link: row.theatreId,
      delete: row.theatreId,
    };
  });

  const rows: GridRowsProp = options;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Theatre Name', width: 180 },
    {
      field: 'theatreCity',
      headerName: 'Theatre City',
      width: 180,
    },
    {
      field: 'managerName',
      headerName: 'Manager Name',
      width: 200,
    },
    {
      field: 'managerContact',
      headerName: 'Manager Contact',
      width: 200,
    },
    {
      field: 'link',
      headerName: 'More Details',
      width: 150,
      renderCell: (params: GridCellParams) => (
        <strong>
          <Link
            variant='contained'
            color='primary'
            size='small'
            style={{ marginLeft: 16 }}
            to={'/admin/theatre/detail/' + params.value}
          >
            View
          </Link>
        </strong>
      ),
    },
    {
      field: 'delete',
      headerName: 'DELETE',
      width: 180,
      renderCell: (params: GridCellParams) => (
        <Link to={'/admin/theatre'} style={{ marginLeft: 16, width: '1rem' }}>
          <Button
            onClick={() => enterPassword(params.value)}
            variant='contained'
            color='secondary'
            size='small'
            style={{ margin: 2 }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Link>
      ),
    },
  ];

  //Success Msg-
  const [sopen, setSopen] = React.useState(false);
  const [sopenState, setSopenState] = React.useState(true);
  const handleClickS = () => {
    setSopen(true);
  };
  const handleCloseS = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSopen(false);
  };

  return (
    <div
      style={{ height: 600, marginBottom: '50px' }}
      onMouseOver={(e) => {
        sopenState && handleClickS();
        setSopenState(false);
      }}
    >
      <Link to='/admin/theatre/addTheatre'>
        <Button
          variant='contained'
          color='primary'
          size='medium'
          style={{ margin: 3 }}
        >
          Add Theatre
        </Button>
      </Link>
      <br />
      {(loading && <CircularProgress />) ||
        (error && <Alert severity='error'>{error}</Alert>) ||
        (options.length === 0 && <h4>EMPTY</h4>) || (
          <DataGrid
            density='compact'
            disableExtendRowFullWidth='true'
            checkboxSelection={false}
            columns={columns}
            rows={rows}
            localeText={{
              toolbarDensity: 'Size',
              toolbarDensityLabel: 'Size',
              toolbarDensityCompact: 'Small',
              toolbarDensityStandard: 'Medium',
              toolbarDensityComfortable: 'Large',
            }}
            onMouseOver={(e) => {
              sopenState && handleClickS();
              setSopenState(false);
            }}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter password :</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='password'
            label='Password'
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteTheatre(id);
            }}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={sopen} autoHideDuration={6000} onClose={handleCloseS}>
        <Alert onClose={handleCloseS} severity='success'>
          Success
        </Alert>
      </Snackbar>
    </div>
  );
};
