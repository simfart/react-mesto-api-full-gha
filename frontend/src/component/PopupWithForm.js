import React, { memo } from 'react'

function PopupWithForm({
  popunName,
  popupTitle,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid,
}) {
  return (
    <div
      className={`popup popup_${popunName} ${isOpen ? 'popup_opened' : ''}`}
      name={`popup_${popunName}`}
    >
      <div className="popup__conteiner popup__conteiner-open">
        <form className="popup__form" onSubmit={onSubmit} noValidate>
          <h2 className="popup__title">{popupTitle}</h2>
          <fieldset className="popup__info">{children}</fieldset>
          <button
            className={`popup__button ${
              isValid ? '' : 'popup__button_invalid'
            }`}
            type="submit"
            aria-label="Сохранить"
          >
            {buttonText}
          </button>
        </form>
        <button
          onClick={onClose}
          className="popup__close"
          aria-label="Закрыть"
          type="button"
        />
      </div>
    </div>
  )
}

export default memo(PopupWithForm)
