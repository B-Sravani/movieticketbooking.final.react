import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { allCustomers } from '../Actions/UserActions';

function AllCustomers() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.user.customers);

  useEffect(() => {
    dispatch(allCustomers());
  }, [dispatch]);

  useEffect(() => {
    console.log(customers);
  }, [customers]);

  const options = customers.map(function (row) {
    return {
      id: row.customerId,
      name: row.customerName,
      address: row.address,
      mobileNo: row.mobileNo,
      email: row.email,
    };
  });

  const rows: GridRowsProp = options;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Customer Name', width: 180 },
    { field: 'address', headerName: 'Customer Address', width: 180 },
    { field: 'mobileNo', headerName: 'Customer Mobile', width: 180 },
    { field: 'email', headerName: 'Customer Email', width: 230 },
  ];
  return (
    <div style={{ margin: '50px', padding: '20px', paddingBottom: '50px' }}>
      <div style={{ height: 600, width: '60%', margin: '0 auto' }}>
        <h5>All Customers:</h5>
        {(options.length === 0 && <h4>EMPTY</h4>) || (
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
            components={{
              Toolbar: GridToolbar,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AllCustomers;
