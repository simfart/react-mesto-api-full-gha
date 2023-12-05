import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";
import Navbar from "./Navbar";
import burgerIcon from "../images/burger.png";
import closeIcon from "../images/CloseIcon.svg";

function Header({ adress, buttonClick, buttonText, email, loggedIn }) {
  const [nav, setNav] = useState(false);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        setNav(!nav);
      }
    }
    function clickOverPopups(e) {
      if (!e.target.closest(".header__navbar-menu")) {
        setNav(!nav);
      }
    }
    if (nav) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", clickOverPopups);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("mousedown", clickOverPopups);
      };
    }
  }, [nav]);

  return (
    <header className="header">
      <div className={`header__navbar ${nav ? "header__navbar_opened" : ""}`}>
        <Navbar email={email} buttonClick={buttonClick} />
      </div>
      <div className="header__conteiner">
        <img className="header__logo" src={headerLogo} alt="Логотип Место" />
        {loggedIn ? (
          <>
            <div className="header__menu">
              <Navbar email={email} buttonClick={buttonClick} />
            </div>
            <button
              className="header__button"
              onClick={() => setNav(!nav)}
              aria-label="Меню"
            >
              <img
                className="header__burger"
                src={nav ? closeIcon : burgerIcon}
                alt="Бургер меню"
              />
            </button>
          </>
        ) : (
          <div>
            <Link to={adress}>
              {" "}
              <button
                onClick={buttonClick}
                className="header__button"
                type="button"
                aria-label={buttonText}
              >
                {buttonText}
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* <div
        className={`header__navbar-burger ${nav ? "header__navbar-burger_opened" : ""
          }`}

      >
        <div className="header__navbar-burger_menu">
          <Navbar
            adress={adress}
            email={email}
            buttonClick={buttonClick}
            buttonText={buttonText}
          />
        </div>
      </div> */}
      {/* <div className="header__conteiner">
        <img className="header__logo" src={headerLogo} alt="Логотип Место" />
        <div className={`header__navbar ${loggedIn ? "" : "header__navbar_auth"} `}>
          <Navbar
            adress={adress}
            email={email}
            buttonClick={buttonClick}
            buttonText={buttonText}
          />
        </div>
        {loggedIn && <img
          onClick={() => setNav(!nav)
          }
          className="header__burger"
          src={nav ? closeIcon : burgerIcon}
          alt="Бургер меню"
        />}
      </div> */}
    </header>
  );
}

export default Header;
