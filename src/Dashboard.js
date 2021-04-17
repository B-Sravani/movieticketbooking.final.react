import React, { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import hist from 'Home/components/Theatre/hist.js';

function Dashboard() {
  var user = useAuth().currentUser;
  useEffect(() => {
    if (user.displayName === 'CUSTOMER') {
      hist.push('/customer');
    }
    hist.push('/admin');
  }, [user]);
  return (
    <div>
      <h3>Redirecting...</h3>
    </div>
  );
}

export default Dashboard;
