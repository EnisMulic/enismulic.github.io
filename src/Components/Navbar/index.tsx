import React from "react";

import style from "./Navbar.module.css";

const navbar = () => {
  return (
    <nav className={style.nav}>
      <div>Home</div>
      <div>About</div>
      <div>Portfolio</div>
      <div>Blog</div>
      <div>Contact</div>
    </nav>
  );
};

export default navbar;
