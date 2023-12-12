import { useCallback } from 'react';
import { usePopups } from '../hooks'

function ImagePopup({ card, isOpen = true }) {

  const { closePopup } = usePopups()

  const closeHandler = useCallback(() => {
    closePopup()
  }, [closePopup])

  return (
    <div className={`popup popup_img-background ${isOpen ? 'popup_opened' : ''}`} name="imagePopup">
      <div className="popup-image popup__conteiner-open">
        <figure className="popup-image__conteiner">
          <img className="popup-image__photo" src={card?.link} alt={card?.name} />
          <figcaption className="popup-image__label"> {card?.name} </figcaption>
        </figure>
        <button className="popup__close" aria-label="Закрыть" type="button" onClick={closeHandler} ></button>
      </div>
    </div>

  );
}

export default ImagePopup;