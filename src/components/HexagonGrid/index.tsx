import React from 'react';

import style from './HexagonGrid.module.css';

import Hexagon from '../Hexagon';

const HexagonGrid = () => {
  const iconClasses = [
    'devicon-c-line',
    'devicon-cplusplus-line',
    'devicon-csharp-line',
    'devicon-html5-plain',
    'devicon-css3-plain',
    'devicon-dot-net-plain-wordmark',
    'devicon-dotnetcore-plain',
    'devicon-javascript-plain',
    'devicon-typescript-plain',
    'devicon-python-plain',
    'devicon-git-plain',
    'devicon-postgresql-plain',
    'devicon-docker-plain',
    'devicon-bootstrap-plain',
    'devicon-bash-plain',
    'devicon-go-plain',
    'devicon-react-original',
    'devicon-mongodb-plain-wordmark',
    'devicon-jquery-plain-wordmark',
    'devicon-sqlalchemy-plain',
    'devicon-microsoftsqlserver-plain-wordmark',
    'devicon-graphql-plain',
  ];
  return (
    <div className={style.HexagonGrid}>
      {iconClasses.map((iconClass) => {
        return (
          <Hexagon>
            <i className={[style.Icon, iconClass].join(' ')}></i>
          </Hexagon>
        );
      })}
    </div>
  );
};

export default HexagonGrid;
