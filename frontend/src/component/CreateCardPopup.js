import React, { useCallback, useRef } from 'react'
import PopupWithForm from './PopupWithForm'
import { useForm } from '../hooks'
import { usePopups } from '../hooks'
import { useMutation, useQueryClient } from 'react-query'
import { createCard } from '../api'

function CreateCardPopup() {
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
    setErrors({})
    setIsValid(true)
  }, [setErrors, setIsValid])

  const { closePopup } = usePopups()

  const closeHandler = useCallback(() => {
    closePopup()
    setValues({})
  }, [closePopup])

  // Зачем надо

  const { data: card } = useRef()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(createCard, {
    onSuccess: () => {
      closePopup()
      queryClient.invalidateQueries()
    },
  })

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      mutate({
        name: values.name,
        link: values.link,
      })
    },
    [mutate, values.link, values.name],
  )

  return (
    <PopupWithForm
      isOpen={true}
      onClose={closeHandler}
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

export default CreateCardPopup
