import React from 'react';
import { useHistory } from 'react-router';

import Projects from '../../components/Projects';

import data from '../../placeholderData';

const Portfolio = () => {
  let history = useHistory();

  history.push('/portfolio');

  return (
    <div>
      <div>
        <Projects projects={data} />
      </div>
    </div>
  );
};

export default Portfolio;
