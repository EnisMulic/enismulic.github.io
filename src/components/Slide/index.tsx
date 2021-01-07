import React from 'react';
import 'devicon';
import { AiOutlineGlobal } from 'react-icons/ai';
import { GrGithub } from 'react-icons/gr';

import style from './Slide.module.css';

import SlideType from '../../types/Slide';

const Slide = ({ position, data }: SlideType) => {
  return (
    <article className={[style.Article, style[position]].join(' ')}>
      <h1 className={style.Title}>{data.name}</h1>
      <img src={data.image} style={{ width: '100%', height: '100%' }} />
      <div className={style.Information}>
        {data.html_url && (
          <a href={data.html_url} className={style.Link} target="_blank">
            <GrGithub />
            Source
          </a>
        )}
        {data.website && (
          <a href={data.website} className={style.Link} target="_blank">
            <AiOutlineGlobal />
            Website
          </a>
        )}
      </div>
    </article>
  );
};

export default Slide;
