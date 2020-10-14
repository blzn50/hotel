import React, { useEffect } from 'react';
import { Layout } from 'antd';
import './App.css';
import axios from 'axios';

const { Header, Footer, Content } = Layout;

function App() {
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
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
