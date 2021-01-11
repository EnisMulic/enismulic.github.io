import React from 'react';

import style from './Tag.module.css';

const Tag = (props: any) => {
  return <div className={style.Tag}>{props.value}</div>;
};

export default Tag;
