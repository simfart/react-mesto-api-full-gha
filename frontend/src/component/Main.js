import React from 'react'
import Header from './Header'
import { Cards } from './Cards'
import { Profile } from './Profile'
import { useMutation } from 'react-query'
import { logout } from '../api'
import { useUserStore } from '../store'
import { useUser } from '../hooks'

function Main() {
  const { setIsLoggedIn } = useUserStore()
  const { data: user } = useUser()

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      window.localStorage.removeItem('jwt')

      setIsLoggedIn(false)
    },
  })

  return (
    <>
      <Header
        buttonClick={mutate}
        adress={'/singin'}
        buttonText={'Выйти'}
        email={user?.email}
      />
      <main className="content">
        <Profile />
        <Cards />
      </main>
    </>
  )
}

export default Main
