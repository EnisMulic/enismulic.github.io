import React from 'react';

import style from './Home.module.css';

import HexagonGrid from '../../components/HexagonGrid';

const Home = () => {
  return (
    <div>
      <div className={style.Skills}>
        <HexagonGrid />
      </div>
    </div>
  );
};

export default Home;
