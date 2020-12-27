import React from "react";

import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <div>Home</div>
      <div>Portfolio</div>
      <div>Contact</div>
    </nav>
  );
};

export default Navbar;
