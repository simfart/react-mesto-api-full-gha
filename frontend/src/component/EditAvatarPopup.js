import React, { useCallback } from 'react'
import PopupWithForm from './PopupWithForm'
import { useForm } from '../hooks/useForm'
import { usePopups } from '../hooks'
import { useMutation, useQueryClient } from 'react-query'
import { editUserAvatar } from '../api'

function EditAvatarPopup() {
  const { handleChange, isValid, setIsValid, errors, setErrors } = useForm({})

  const { closePopup } = usePopups()

  const closeHandler = useCallback(() => {
    closePopup()
  }, [closePopup])

  const avatarRef = React.useRef()

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(editUserAvatar, {
    onSuccess: () => {
      closePopup()
      queryClient.invalidateQueries(['user'])

      avatarRef.current.value = ''
      setErrors({})
      setIsValid(true)
    },
  })

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      mutate(avatarRef.current.value)
    },
    [mutate],
  )

  return (
    <PopupWithForm
      isOpen={true}
      onClose={closeHandler}
      popupTitle="Обновить аватар"
      popunName="update_avatar"
      buttonText={isLoading ? 'Сохранение...' : 'Обновить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="Avatar-input"
        type="url"
        className={`popup__item ${errors?.link && 'popup__item_error'}`}
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
        onChange={handleChange}
      />
      <span className="popup__error">{errors.link || ''}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
