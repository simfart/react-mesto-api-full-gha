import React, { memo } from 'react'

const Navbar = ({ email, adress, buttonClick, buttonText }) => {
  return (
    <nav className="navbar">
      <ul className="navbar__container">
        <li>
          <p className="header__email">{email}</p>
        </li>
        <li>
          <button
            onClick={buttonClick}
            className="header__link navbar__link"
            type="button"
            aria-label="Выйти"
          >
            Выйти
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default memo(Navbar)
