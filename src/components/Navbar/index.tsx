import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';

import style from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={style.Navbar}>
      <NavLink exact to="/" className={style.Link}>
        Home
      </NavLink>
      <NavLink to="/portfolio" className={style.Link}>
        Portfolio
      </NavLink>
      <div className={style.Spacer}></div>
      <div className={style.Contact}>
        <div>
          <a
            href="https://www.linkedin.com/in/enis-muli%C4%87/"
            target="_blank"
            rel="noreferrer"
          >
            <i className={[style.Icon, 'devicon-linkedin-plain'].join(' ')}></i>
          </a>
        </div>
        <div>
          <a
            href="https://www.github.com/EnisMulic"
            target="_blank"
            rel="noreferrer"
          >
            <i
              className={[style.Icon, 'devicon-github-original'].join(' ')}
            ></i>
          </a>
        </div>
        <div>
          <a
            href="mailto:enis.s.mulic@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <HiOutlineMail style={{ fontSize: '24px' }} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
