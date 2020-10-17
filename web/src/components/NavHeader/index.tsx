import React, { Fragment } from 'react';
import { useStateValue, logout } from '../../state';
import { authenticatedApi, baseApi } from '../../utils/httpUtils';

const Header: React.FC = () => {
  const [{ user }, dispatch] = useStateValue();

  const handleLogout = async () => {
    if (Object.keys(user).length > 0) {
      try {
        authenticatedApi();
        await baseApi.post('/user/logout');
        dispatch(logout());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Fragment>
      {Object.keys(user).length > 0 ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </Fragment>
  );
};

export default Header;
