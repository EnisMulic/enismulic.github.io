import React from 'react';

import HexagonGrid from '../../components/HexagonGrid';

import style from './Layout.module.css';

const Layout = (props: { children: any }) => {
  return (
    <div className={style.Layout}>
      <div className={style.Skills}>
        <HexagonGrid />
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
