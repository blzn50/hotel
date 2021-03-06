import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useStateValue } from './state';
import { extractToken } from './utils/extractToken';

import Home from './components/Home';
import NavHeader from './components/NavHeader';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './App.css';
import SearchResult from './components/SearchResult';
import Reservation from './components/Reservation';

const { Header, Footer, Content } = Layout;

function App() {
  const [_, dispatch] = useStateValue();
  extractToken();
  useEffect(() => {
    (async function () {
      // try {
      //   const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
      //   console.log(data);
      // } catch (error) {
      //   console.log(error);
      // }
    })();
  }, []);

  return (
    <Layout>
      <Header className="header">
        <NavHeader />
      </Header>
      <Switch>
        <Content style={{ background: 'rgb(245, 245, 245)', minHeight: '91vh' }}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:token">
            <ResetPassword />
          </Route>
          <Route path="/search">
            <SearchResult />
          </Route>
          <Route path="/reservation">
            <Reservation />
          </Route>
        </Content>
        <Footer>Footer</Footer>
      </Switch>
    </Layout>
  );
}

export default App;
