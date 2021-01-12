import React from 'react';

import Projects from '../../components/Projects';

import data from '../../placeholderData';

const Portfolio = () => {
  console.log(data);
  return (
    <div>
      <div>
        <Projects projects={data} />
      </div>
    </div>
  );
};

export default Portfolio;
