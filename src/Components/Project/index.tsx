import React from 'react';

import ProjectType from '../../types/Project';

import style from './Project.module.css';

const Project = (props: ProjectType) => {
  return (
    <div className={style.Project}>
      <h2>{props.name}</h2>
    </div>
  );
};

export default Project;
