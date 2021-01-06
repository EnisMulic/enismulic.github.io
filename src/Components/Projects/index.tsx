import React from 'react';

import style from './Projects.module.css';

import Project from '../Project';
import ProjectType from '../../types/Project';

const Projects = () => {
  const temp: ProjectType = {
    id: 1,
    name: 'Placeholder',
    image: '',
    html_url: '',
    website: '',
    description: '',
    technology: [],
  };

  return (
    <div className={style.Projects}>
      <Project {...temp} />
      <Project {...temp} />
      <Project {...temp} />
      <Project {...temp} />
      <Project {...temp} />
      <Project {...temp} />
    </div>
  );
};

export default Projects;
