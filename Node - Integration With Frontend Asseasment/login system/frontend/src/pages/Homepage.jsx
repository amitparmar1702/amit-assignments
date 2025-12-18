import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../../util';
import 'react-toastify/dist/ReactToastify.css';
import '../homecss.css';

function Homepage() {
  const [loggedinuser, setLoggedinuser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedinuser(localStorage.getItem('loggedInuser'));
  }, []); 

  const handlelogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInuser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div>
      <div className='main'>
        <h1>
          Welcome, <span className="user-name">{loggedinuser}</span>!
        </h1>
        <button className='signup-button-home' onClick={handlelogout}>
  Log Out
</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Homepage;
