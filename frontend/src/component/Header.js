import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";
import Navbar from "./Navbar";
import burgerIcon from "../images/burger.png";
import closeIcon from "../images/CloseIcon.svg";

function Header({ adress, buttonClick, buttonText, email, loggedIn }) {
  const [nav, setNav] = useState(false);

  const closeByEscapeHandler = useCallback((evt) => {
    if (evt.key === "Escape") {
      setNav(false);
    }
  }, []);

  const clickOverPopupsHandler = useCallback((evt) => {
    if (!evt.target.closest(".header__navbar-menu")) {
      setNav(false);
    }
  }, []);

  useEffect(() => {
    if (nav) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscapeHandler);
      document.addEventListener("mousedown", clickOverPopupsHandler);
      return () => {
        document.removeEventListener("keydown", closeByEscapeHandler);
        document.removeEventListener("mousedown", clickOverPopupsHandler);
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
              onClick={() => {
                console.log("клик");
                setNav(!nav);
              }}
              aria-label="Меню"
              type="button"
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
                className="header__link"
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
