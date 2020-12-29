import React from "react";

import style from "./Hexagon.module.css";

const Hexagon = (props) => {
  return <div className={style.hexagon}>{props.children}</div>;
};

export default Hexagon;
