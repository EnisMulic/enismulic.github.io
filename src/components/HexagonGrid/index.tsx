import React from 'react';

import style from './HexagonGrid.module.css';

import Hexagon from '../Hexagon';

const HexagonGrid = () => {
  return (
    <div className={style.HexagonGrid}>
      <Hexagon>
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
      </Hexagon>
    </div>
  );
};

export default HexagonGrid;
