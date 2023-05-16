import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link } from "react-router-dom";

function Header({ adress, buttonClick, buttonText, email }) {

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Место" />
      <div className="header__conteiner" >
        <p className="header__email">{email}</p>
        <Link to={adress} > <button onClick={buttonClick} className="header__button" type="button" aria-label={buttonText}>{buttonText}</button></Link>
      </div>
    </header>
  );
}

export default Header;
