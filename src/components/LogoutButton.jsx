// Logout.js

import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-custom-customer btn-logout-customer">
      Logout
    </button>
  );
};

export default Logout;
