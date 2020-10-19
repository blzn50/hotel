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
import './App.css';

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
        <Content style={{ background: 'white' }}>
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
        </Content>
        <Footer>Footer</Footer>
      </Switch>
    </Layout>
  );
}

export default App;
