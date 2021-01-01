import React from 'react';

import style from './Image.module.css';

type ImageProps = {
  position: string;
  image: string;
};

const Image = ({ position, image }: ImageProps) => {
  return (
    <article className={[style.Article, style[position]].join(' ')}>
      <img src={image} style={{ width: '100%', height: '100%' }} />
    </article>
  );
};

export default Image;
