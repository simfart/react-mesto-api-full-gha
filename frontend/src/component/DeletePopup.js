import { useCallback, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { useCardToDelete } from '../hooks';
import { usePopups } from '../hooks';
import { useContext, createContext } from 'react'


export const DeletePopup = (card) => {

  const { mutate, isLoading } = useCardToDelete()
  const { closePopup } = usePopups()

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      mutate(card._id)
    }, [mutate]
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
      buttonText={isLoading ? "Удаление..." : "Да"}
      onSubmit={handleSubmit}
      isValid={true}
    >
    </PopupWithForm>
  );
}
