import React, { Fragment, useState } from 'react';
import { Button, Menu } from 'antd';
import { useStateValue, logout } from '../../state';
import { authenticatedApi, baseApi } from '../../utils/httpUtils';
import { NavLink, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [{ user }, dispatch] = useStateValue();
  const location = useLocation();
  const [current, setCurrent] = useState(() => location.pathname.slice(1));

  const handleMenuItemChange = (e: any) => {
    setCurrent(e.key);
  };

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
      <div className="logo">
        <a href="/">Sunshine Hotel</a>
      </div>

      <Menu
        mode="horizontal"
        theme="light"
        style={{ float: 'right', lineHeight: 4.4 }}
        onClick={handleMenuItemChange}
        selectedKeys={[current]}
      >
        {Object.keys(user).length > 0 ? (
          <Menu.Item key="logout">
            <Button type="text" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        ) : (
          <Fragment>
            <Menu.Item key="login">
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
            <Menu.Item key="register">
              <NavLink to="/register">Register</NavLink>
            </Menu.Item>
          </Fragment>
        )}
      </Menu>
    </Fragment>
  );
};

export default Header;
