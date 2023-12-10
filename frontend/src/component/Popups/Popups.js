import { useCallback, useMemo, useState, useEffect } from 'react'
import { popupsMapper } from './Popups.constants'
import { PopupsContext } from './Popups.context'

export const Popups = ({ children }) => {
  const [popup, setPopup] = useState(null)
  const [popupProps, setPopupProps] = useState({})

  const openPopup = useCallback((popupName, popupProps) => {
    setPopup(popupName)
    setPopupProps(popupProps)
  }, [])

  const popupContent = useMemo(() => {
    if (popup) return null

    const Component = popupsMapper[popup]

    return <Component {...popupProps} />
  }, [popup, popupProps])

  const closeByEscape = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setPopup(null)
    }
  }, [])

  const clickOverPopups = useCallback((e) => {
    if (!e.target.closest('.popup__conteiner-open')) {
      setPopup(null)
    }
  }, [])

  useEffect(() => {
    if (popup) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape)
      document.addEventListener('mousedown', clickOverPopups)
      return () => {
        document.removeEventListener('keydown', closeByEscape)
        document.removeEventListener('mousedown', clickOverPopups)
      }
    }
  }, [popup])

  return (
    <PopupsContext.Provider value={{ openPopup }}>
      {popupContent}
      {children}
      {/* <EditProfilePopup
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={load}
      />
      <EditAvatarPopup
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={load}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={load}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <ConfirmPopup
        card={selectedCardToDelete}
        onClose={closeAllPopups}
        onConfirm={handleCardDelete}
        isLoading={load}
      />
      <InfoTooltip
        onClose={closeAllPopups}
        registered={isRegistered}
        errMessage={errMessage}
      /> */}
    </PopupsContext.Provider>
  )
}
