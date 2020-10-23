import React from 'react';
import Search from './Search';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Search searchResultPage={false} />
    </div>
  );
};

export default Home;
