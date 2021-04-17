import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function FetchApplication() {
  const applications = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  useEffect(() => {
    console.log(applications);
  }, []);
  return (
    <div>
      {applications &&
        applications.map((application) => {
          return <div>{application.applcationId}</div>;
        })}
    </div>
  );
}

export default UpdateApplication;
