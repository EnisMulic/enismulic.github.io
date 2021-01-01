import React, { useState } from 'react';

import style from './Home.module.css';

import HexagonGrid from '../../components/HexagonGrid';
import Carousel from '../../components/Carousel';

import data from '../../placeholderData';

const Home = () => {
  const [backgrounds, setBackgrounds] = useState<any>(data);
  console.log(backgrounds);
  return (
    <div className={style.Home}>
      <div className={style.Skills}>
        <HexagonGrid />
      </div>
      <div>
        <Carousel slides={backgrounds} />
      </div>
    </div>
  );
};

export default Home;
