import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ email, adress, buttonClick, buttonText }) => {
  return (
    <nav >
      <ul className="header__navbar-menu">
        <li><p className="header__email">{email}</p></li>
        <li> <Link to={adress}>
        {" "}
        <button
          onClick={buttonClick}
          className="header__button"
          type="button"
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </Link></li>
      </ul>  
    </nav>
  );
};

export default Navbar;
