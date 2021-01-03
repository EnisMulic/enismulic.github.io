import React, { useState } from 'react';

import style from './Home.module.css';

import HexagonGrid from '../../components/HexagonGrid';
import Carousel from '../../components/Carousel';

import data from '../../placeholderData';
import Project from '../../types/Project';

const Home = () => {
  const [projects, setProjects] = useState<Array<Project>>(data);

  return (
    <div className={style.Home}>
      <div className={style.Skills}>
        <HexagonGrid />
      </div>
      <div>
        <Carousel slides={projects} />
      </div>
    </div>
  );
};

export default Home;
