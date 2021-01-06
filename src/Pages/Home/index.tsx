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
      <Carousel slides={projects} />
    </div>
  );
};

export default Home;
