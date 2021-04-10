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
      {/* <Hexagon>
        <i className={[style.Icon, 'devicon-c-line'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-cplusplus-line'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-csharp-line'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-html5-plain'].join(' ')}></i>
      </Hexagon>

      <Hexagon>
        <i className={[style.Icon, 'devicon-css3-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i
          className={[style.Icon, 'devicon-dot-net-plain-wordmark'].join(' ')}
        ></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-javascript-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-typescript-plain'].join(' ')}></i>
      </Hexagon>

      <Hexagon>
        <i className={[style.Icon, 'devicon-python-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-git-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-postgresql-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-docker-plain'].join(' ')}></i>
      </Hexagon>

      <Hexagon>
        <i className={[style.Icon, 'devicon-bootstrap-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-bash-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-go-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-react-original'].join(' ')}></i>
      </Hexagon>

      <Hexagon>
        <i
          className={[style.Icon, 'devicon-mongodb-plain-wordmark'].join(' ')}
        ></i>
      </Hexagon>
      <Hexagon>
        <i
          className={[style.Icon, 'devicon-jquery-plain-wordmark'].join(' ')}
        ></i>
      </Hexagon>
      <Hexagon>
        <i className={[style.Icon, 'devicon-sqlalchemy-plain'].join(' ')}></i>
      </Hexagon>
      <Hexagon>
        <i
          className={[
            style.Icon,
            'devicon-microsoftsqlserver-plain-wordmark',
          ].join(' ')}
        ></i>
      </Hexagon> */}
    </div>
  );
};

export default HexagonGrid;
