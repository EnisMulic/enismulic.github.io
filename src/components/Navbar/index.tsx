import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/portfolio">Portfolio</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
};

export default Navbar;
