import React from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';

import ProjectType from '../../types/Project';
import Tag from '../../components/Tag';

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
      <div
        className={style.Content}
        style={{
          backgroundImage: 'url(' + props.image + ')',
          backgroundSize: '100% 100%',
        }}
      >
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            similique neque omnis quidem, esse cumque deleniti qui voluptate
            eius, modi sequi error in facere vel perferendis libero nam eum
            laboriosam.
          </p>
          <div>
            {props.tags.map((tag, index) => (
              <Tag value={tag} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
