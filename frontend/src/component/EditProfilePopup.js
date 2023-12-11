import { useEffect, useCallback } from 'react'
import PopupWithForm from './PopupWithForm'
import { useForm } from '../hooks/useForm'
import { useUser } from '../hooks'
import { useEditUserProfileMutation } from '../hooks'
import { usePopups } from '../hooks'

function EditProfilePopup() {
  const {
    values,
    handleChange,
    setValues,
    isValid,
    setIsValid,
    errors,
    setErrors,
  } = useForm({})

  const { data: user } = useUser()
  const { closePopup } = usePopups()

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name,
        about: user.about,
      })
      setErrors({})
      setIsValid(true)
    }
  }, [user])

  const { mutate, isLoading } = useEditUserProfileMutation()

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
    // Передаём значения управляемых компонентов во внешний обработчик
    mutate({
      name: values.name,
      about: values.about,
    })
  }

  const closeHandler = useCallback(() => {
    closePopup()
  }, [closePopup])

  return (
    <PopupWithForm
      isOpen={true}
      onClose={closeHandler}
      popupTitle="Редактировать профиль"
      popunName="add_profile"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        value={values.name || ''}
        onChange={handleChange}
        id="heading-input"
        type="text"
        className={`popup__item ${errors?.name && 'popup__item_error'}`}
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error">{errors.name || ''}</span>
      <input
        value={values.about || ''}
        onChange={handleChange}
        id="subheading-input"
        type="text"
        className={`popup__item ${errors?.about && 'popup__item_error'}`}
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error">{errors.about || ''}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
