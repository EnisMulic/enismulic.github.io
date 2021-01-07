import React from 'react';

import style from './Home.module.css';

import Carousel from '../../components/Carousel';

import data from '../../placeholderData';

const Home = () => {
  // const [projects, setProjects] = useState<Array<Project>>(data);

  return (
    <div className={style.Home}>
      <Carousel slides={data} />
    </div>
  );
};

export default Home;
