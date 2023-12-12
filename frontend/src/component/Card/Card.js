import { useCallback, useContext, useMemo } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { usePopups } from '../../hooks'

export const Card = ({ card, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = useMemo(
    () => card.owner._id === currentUser._id || card.owner === currentUser._id,
    [card, currentUser],
  )

  const isLiked = card.likes.some(
    (i) => i._id === currentUser._id || i === currentUser._id,
  )
  const cardLikeButtonClassName = `element__button ${isLiked && 'element__button_active'
    }`


  const { openPopup } = usePopups()

  const onCardClick = useCallback(() => {
    openPopup('imagePopup', { card })
  }, [openPopup])

  function handleLikeClick() {
    onCardLike(card)
  }

  const handleDeleteClick = useCallback(() => {
    onCardDelete(card)
  }, [card, onCardDelete])

  const trashButton = useMemo(() => {
    if (!isOwn) return null

    return <button className="element__trash" onClick={handleDeleteClick} />
  }, [handleDeleteClick, isOwn])

  return (
    <figure className="element">
      <img
        className="element__photo"
        onClick={onCardClick}
        src={card.link}
        alt={card.name}
      />
      {trashButton}
      <figcaption className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  )
}
