import React from 'react';

import style from './Home.module.css';

import HexagonGrid from '../../components/HexagonGrid';

const Home = () => {
  return (
    <div className={style.Skills}>
      <HexagonGrid />
    </div>
  );
};

export default Home;
