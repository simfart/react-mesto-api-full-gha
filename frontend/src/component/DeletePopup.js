import { useCallback } from 'react'
import PopupWithForm from './PopupWithForm'
import { useDeleteCard } from '../hooks'
import { usePopups } from '../hooks'

export const DeletePopup = (card) => {
  const { mutate, isLoading } = useDeleteCard()
  const { closePopup } = usePopups()

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      mutate(card._id)
    },
    [mutate],
  )

  const closeHandler = useCallback(() => {
    closePopup()
  }, [closePopup])

  return (
    <PopupWithForm
      popunName="confirm"
      isOpen={true}
      onClose={closeHandler}
      popupTitle="Вы уверены?"
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
      isValid={true}
    ></PopupWithForm>
  )
}