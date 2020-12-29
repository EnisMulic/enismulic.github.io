import React from "react";

import style from "./HexagonGrid.module.css";

import Hexagon from "../Hexagon";

const HexagonGrid = () => {
  return (
    <div className={style.HexagonGrid}>
      <Hexagon />
      <Hexagon />
      <Hexagon />
      <Hexagon />

      <Hexagon />
      <Hexagon />
      <Hexagon />
      <Hexagon />

      <Hexagon />
      <Hexagon />
      <Hexagon />
      <Hexagon />

      <Hexagon />
      <Hexagon />
      <Hexagon />
      <Hexagon />
    </div>
  );
};

export default HexagonGrid;
