import React from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';

import ProjectType from '../../types/Project';

import style from './Project.module.css';

const Project = (props: ProjectType) => {
  return (
    <div className={style.Project}>
      <div className={style.Header}>
        <h2>{props.name}</h2>
        {props.html_url && (
          <a
            href={props.html_url}
            className={style.Link}
            target="_blank"
            rel="noreferrer"
          >
            <i className="devicon-github-original"></i>
          </a>
        )}
        {props.website && (
          <a
            href={props.website}
            className={style.Link}
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineGlobal />
          </a>
        )}
      </div>
      <img src={props.image} />
    </div>
  );
};

export default Project;
