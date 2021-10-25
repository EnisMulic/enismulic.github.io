import CLineIcon from 'react-devicons/c/line';
import CplusplusLineIcon from 'react-devicons/cplusplus/line';
import BashPlainIcon from 'react-devicons/bash/plain';
import BootstrapPlainIcon from 'react-devicons/bootstrap/plain';
import CsharpLineIcon from 'react-devicons/csharp/plain';
import Css3PlainIcon from 'react-devicons/css3/plain';
import DockerPlainIcon from 'react-devicons/docker/plain';
import DotnetcorePlainIcon from 'react-devicons/dotnetcore/plain';
import DotNetPlainIcon from 'react-devicons/dot-net/plain';
import GitPlainIcon from 'react-devicons/git/plain';
import GoPlainIcon from 'react-devicons/go/plain';
import GraphqlPlainIcon from 'react-devicons/graphql/plain';
import Html5PlainIcon from 'react-devicons/html5/plain';
import JavascriptPlainIcon from 'react-devicons/javascript/plain';
import JqueryPlainWordmarkIcon from 'react-devicons/jquery/plain';
import MicrosoftsqlserverPlainWordmarkIcon from 'react-devicons/microsoftsqlserver/plain-wordmark';
import MongodbPlainWordmarkIcon from 'react-devicons/mongodb/plain-wordmark';
import PostgresqlPlainIcon from 'react-devicons/postgresql/plain';
import PythonPlainIcon from 'react-devicons/python/plain';
import ReactOriginalIcon from 'react-devicons/react/original';
import SqlalchemyPlainIcon from 'react-devicons/sqlalchemy/plain';
import TypescriptPlainIcon from 'react-devicons/typescript/plain';

import style from './HexagonGrid.module.css';

import Hexagon from '../Hexagon';

const HexagonGrid = () => {
  const icons = [
    <CLineIcon className={style.Icon}></CLineIcon>,
    <CplusplusLineIcon className={style.Icon}></CplusplusLineIcon>,
    <CsharpLineIcon className={style.Icon}></CsharpLineIcon>,
    <Html5PlainIcon className={style.Icon}></Html5PlainIcon>,
    <Css3PlainIcon className={style.Icon}></Css3PlainIcon>,
    <DotNetPlainIcon className={style.Icon}></DotNetPlainIcon>,
    <DotnetcorePlainIcon className={style.Icon}></DotnetcorePlainIcon>,
    <JavascriptPlainIcon className={style.Icon}></JavascriptPlainIcon>,
    <TypescriptPlainIcon className={style.Icon}></TypescriptPlainIcon>,
    <PythonPlainIcon className={style.Icon}></PythonPlainIcon>,
    <PostgresqlPlainIcon className={style.Icon}></PostgresqlPlainIcon>,
    <GitPlainIcon className={style.Icon}></GitPlainIcon>,
    <DockerPlainIcon className={style.Icon}></DockerPlainIcon>,
    <BootstrapPlainIcon className={style.Icon}></BootstrapPlainIcon>,
    <BashPlainIcon className={style.Icon}></BashPlainIcon>,
    <ReactOriginalIcon className={style.Icon}></ReactOriginalIcon>,
    <MongodbPlainWordmarkIcon
      className={style.Icon}
    ></MongodbPlainWordmarkIcon>,
    <GoPlainIcon className={style.Icon}></GoPlainIcon>,
    <JqueryPlainWordmarkIcon className={style.Icon}></JqueryPlainWordmarkIcon>,
    <SqlalchemyPlainIcon className={style.Icon}></SqlalchemyPlainIcon>,
    <MicrosoftsqlserverPlainWordmarkIcon
      className={style.Icon}
    ></MicrosoftsqlserverPlainWordmarkIcon>,
    <GraphqlPlainIcon className={style.Icon}></GraphqlPlainIcon>,
  ];
  return (
    <div className={style.HexagonGrid}>
      {icons.map((icon, index) => {
        return <Hexagon children={icon} key={index}></Hexagon>;
      })}
    </div>
  );
};

export default HexagonGrid;
