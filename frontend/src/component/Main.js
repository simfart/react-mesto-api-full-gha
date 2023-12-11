import React, { useCallback } from 'react'
import { Card } from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Header from './Header'
import { Cards } from './Cards'

import { Profile } from './Profile'

function Main({
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
  email,
  signOut,
  loggedIn,
}) {
  return (
    <>
      <Header
        buttonClick={signOut}
        adress={'/singin'}
        buttonText={'Выйти'}
        email={email}
        loggedIn={loggedIn}
      />
      <main className="content">
        <Profile />
        <Cards />
      </main>
    </>
  )
}

export default Main
