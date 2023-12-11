import { useCallback } from 'react'
import { usePopups } from '../../hooks'
import { useUser } from '../../hooks'

export const Profile = () => {
  const { openPopup } = usePopups()

  const onAvatarClick = useCallback(() => {
    openPopup('editAvatarPopup')
  }, [openPopup])

  const onProfileClick = useCallback(() => {
    openPopup('editProfile')
  }, [openPopup])

  const { data: user, isLoading } = useUser()

  return (
    <section className="profile">
      <button
        onClick={onAvatarClick}
        type="button"
        className="profile__conteiner"
      >
        <img className="profile__avatar" src={user?.avatar} alt="Аватар" />
      </button>
      <div className="profile__info">
        <h1 className="profile__title">{user?.name}</h1>
        <button
          onClick={onProfileClick}
          className="profile__edit-button"
          type="button"
          aria-label="Исправить"
        ></button>
        <p className="profile__subtitle">{user?.about}</p>
      </div>
      <button
        // onClick={onAddPlace}
        className="profile__add-button"
        type="button"
        aria-label="Добавить"
      ></button>
    </section>
  )
}
