import React from 'react';

// import style from './Portfolio.module.css';

import Carousel from '../../components/Carousel';

import data from '../../placeholderData';

const Portfolio = () => {
  return (
    <div>
      <div>
        <Carousel slides={data} />
      </div>
    </div>
  );
};

export default Portfolio;
