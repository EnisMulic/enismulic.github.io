import React from 'react';

import style from './Projects.module.css';

import Project from '../Project';
import ProjectType from '../../types/Project';

const Projects = (props) => {
  let projects = props.projects
    ? props.projects.map((project: JSX.IntrinsicAttributes & ProjectType) => (
        <Project {...project} key={project.id} />
      ))
    : null;

  return <div className={style.Projects}>{projects}</div>;
};

export default Projects;
