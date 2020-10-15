import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import './App.css';
import { useStateValue } from './state';

const { Header, Footer, Content } = Layout;

function App() {
  const [_, dispatch] = useStateValue();
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Layout>
      <Header>Header</Header>
      <Switch>
        <Content style={{ background: 'white' }}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">{/* <Register onSubmit={handleLogin} /> */}</Route>
          <Route path="/login">
            <Login />
          </Route>
        </Content>
        <Footer>Footer</Footer>
      </Switch>
    </Layout>
  );
}

export default App;
