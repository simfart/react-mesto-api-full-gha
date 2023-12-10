import React from 'react'
import PopupWithForm from './PopupWithForm'
import { useForm } from '../hooks/useForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const {
    values,
    handleChange,
    setValues,
    isValid,
    setIsValid,
    errors,
    setErrors,
  } = useForm({})

  React.useEffect(() => {
    setValues({})
    setErrors({})
    setIsValid(true)
  }, [isOpen, setValues, setErrors, setIsValid])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: values.name,
      link: values.link,
    })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      popupTitle="Новое место"
      popunName="add_card"
      buttonText={isLoading ? 'Добавление...' : 'Создать'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        value={values.name || ''}
        onChange={handleChange}
        id="cardHeading-input"
        type="text"
        className={`popup__item ${errors?.name && 'popup__item_error'}`}
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error">{errors.name || ''}</span>
      <input
        value={values.link || ''}
        onChange={handleChange}
        id="cardLink-input"
        type="url"
        className={`popup__item ${errors?.link && 'popup__item_error'}`}
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error">{errors.link || ''}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
