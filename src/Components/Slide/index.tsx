import React from 'react';
import 'devicon';
import style from './Slide.module.css';

import SlideType from '../../types/Slide';

const Slide = ({ position, data }: SlideType) => {
  return (
    <article className={[style.Article, style[position]].join(' ')}>
      <h1 className={style.Title}>{data.name}</h1>
      <img src={data.image} style={{ width: '100%', height: '100%' }} />
      <div className={style.Information}>
        <a href={data.html_url} className={style.Link} target="_blank">
          <i
            className="devicon-github-original colored"
            style={{ color: 'white' }}
          ></i>
          Source
        </a>
      </div>
    </article>
  );
};

export default Slide;
