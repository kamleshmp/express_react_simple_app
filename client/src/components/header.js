import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="javascript:void(0)">Contact App</a>
      </div>
      <ul className="nav navbar-nav">
        <li className="active"><a href="/">Home</a></li>
        <li><Link to='/contact/new'>Add Contact</Link></li>
      </ul>
    </div>
  </nav>
);

export default Header;
