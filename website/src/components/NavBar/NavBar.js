import React from 'react';

//local
import TehranReactImg from '../../assets/images/tehranreact.svg';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="MainNavbar">
      <div className="container MainNavbar__container">
        <ul className="MainNavbar__navbar">
          <li className="MainNavbar__navbarItem">
            <span>Documents</span>
          </li>
          <li className="MainNavbar__navbarItem">
            <span>Installation</span>
          </li>
          <li className="MainNavbar__navbarItem">
            <span>Basic Usage</span>
          </li>
          <li className="MainNavbar__navbarItem -donation">
            <i className="icon-mug MainNavbar__navbarItemIcon" />
            <span>Buy me a coffee!</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export {NavBar};
