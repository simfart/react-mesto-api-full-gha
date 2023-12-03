import React, { useState } from "react";
import headerLogo from "../images/logo.svg";
import Navbar from "./Navbar";
import burgerIcon from "../images/burger.png";
import closeIcon from "../images/CloseIcon.svg";

function Header({ adress, buttonClick, buttonText, email }) {
  const [nav, setNav] = useState(false);

  return (
    <header className="header">
      <div
        className={`header__navbar-burger ${
          nav ? "header__navbar-burger_opened" : ""
        }`}
        // className="header__navbar-burger"
      >
        <div className="header__navbar-burger_open">
          <Navbar
            adress={adress}
            email={email}
            buttonClick={buttonClick}
            buttonText={buttonText}
          />
        </div>
      </div>
      <div className="header__conteiner">
        <img className="header__logo" src={headerLogo} alt="Логотип Место" />
        <div className="header__navbar">
          <Navbar
            adress={adress}
            email={email}
            buttonClick={buttonClick}
            buttonText={buttonText}
          />
        </div>

        <img
          onClick={() => setNav(!nav)}
          className="header__burger"
          src={nav ? closeIcon : burgerIcon}
          alt="Бургер меню"
        />
      </div>
    </header>
  );
}

export default Header;

{
  /* <header className="header">
<img className="header__logo" src={headerLogo} alt="Логотип Место" />
<div className="header__conteiner" >
  <p className="header__email">{email}</p>
  <Link to={adress} > <button onClick={buttonClick} className="header__button" type="button" aria-label={buttonText}>{buttonText}</button></Link>
</div>
</header> */
}
