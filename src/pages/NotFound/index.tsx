import React from 'react';
import { Link } from 'react-router-dom';

import style from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={style.NotFound}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default NotFound;
