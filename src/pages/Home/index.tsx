import React from 'react';

import style from './Home.module.css';

import HexagonGrid from '../../components/HexagonGrid';

const Home = () => {
  return (
    <div className={style.Home}>
      <div className={style.Skills}>
        <HexagonGrid />
      </div>
      <div className={style.Info}>Full stack software developer</div>
    </div>
  );
};

export default Home;
