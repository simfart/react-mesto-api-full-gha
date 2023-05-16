import React from 'react';
import union from '../images/Union.svg';
import unionred from '../images/Union-red.svg';

function InfoTooltip({ isOpen, onClose, registered }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__conteiner-open">
        <div className='popup_info'>
          <img className="header__logo" src={registered ? union : unionred} alt="Результат" />
          <span className="popup__title popup__title_info ">
            {registered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </span>
          <button
            onClick={onClose}
            className="popup__close"
            aria-label="Закрыть"
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
