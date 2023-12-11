import { useEffect, useState, useCallback, createContext } from 'react'
import api from '../utils/Api'
import * as auth from '../utils/Auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from '../component/Register'
import Login from '../component/Login'
import Footer from '../component/Footer'
import ProtectedRoute from '../component/ProtectedRoute'
import Loader from '../component/Loader'
import Main from '../component/Main'
import { Popups } from '../component/Popups'
import { QueryClientProvider } from './providers'
import { ReactQueryDevtools } from 'react-query/devtools'

const BuissnessLogicContext = createContext({})

export const App = () => {
  const navigate = useNavigate()

  const [errMessage, setErrMessage] = useState('')
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [load, setLoad] = useState(false)
  const [isRegistered, setIsRegistered] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isLoad, setIsLoad] = useState(false)

  // Данные из API
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialUserInfo(), api.getInitialUserCards()])
        .then(([resUserInfo, resCards]) => {
          setCurrentUser(resUserInfo)
          setCards(resCards.reverse())
        })
        .catch((err) => {
          console.log(err) // выведем ошибку в консоль
        })
    }
  }, [loggedIn])

  // Попап image
  // function handleCardClick(card) {
  //   setSelectedCard(card)
  // }

  // // Попап infoTooltip
  // function openInfoTooltip() {
  //   setIsInfoTooltipOpen(!isInfoTooltipOpen)
  // }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(
      (user) => user._id === currentUser._id || user === currentUser._id,
    )
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .setLikes(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        )
      })
      .catch((err) => {
        console.log('Ошибка handleCardLik ', err)
      })
  }

  // function handleCardClickDelete(card) {
  //   setSelectedCardToDelete(card)
  //   setIsConfirmPopupOpen(!isConfirmPopupOpen)
  // }

  // удаление карточки
  function handleCardDelete(card) {
    setLoad(true)
    api
      .deleteCards(card._id)
      .then(() => {
        const filtered = cards.filter((newCard) => newCard !== card)
        setCards(filtered)
        // closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoad(false)
      })
  }

  //Редактирование профиля
  function handleUpdateUser(values) {
    setLoad(true)
    api
      .editlUserInfo(values)
      .then((res) => {
        setCurrentUser(res)
        // closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoad(false)
      })
  }

  //Редактирование аватара
  function handleUpdateAvatar(values) {
    setLoad(true)
    api
      .editAvatar(values)
      .then((res) => {
        setCurrentUser(res)
        // closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoad(false)
      })
  }

  // Добавление карточек
  function handleAddPlaceSubmit(data) {
    setLoad(true)
    api
      .createNewCard(data)
      .then((data) => {
        setCards([data, ...cards])
        // closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoad(false)
      })
  }
  // Региcтрация
  const handleRegister = useCallback(
    (values) => {
      auth
        .register(values)
        .then((res) => {
          setIsRegistered(true)
          // openInfoTooltip()
          navigate('/singin', { replace: true })
        })
        .catch((err) => {
          setErrMessage(err.message)
          setIsRegistered(false)
          // openInfoTooltip()
        })
        .finally(() => {
          setIsLoad(false)
        })
    },
    [
      // openInfoTooltip
    ],
  )

  // Вход
  const handleLogin = useCallback(
    async (values) => {
      setIsLoad(true)
      try {
        const res = await auth.authorize(values.email, values.password)

        if (!res) {
          throw new Error('Ошибка аутентификации')
        }
        if (res.token) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          setUserEmail(values.email)
          navigate('/', { replace: true })
        }
      } catch (e) {
        console.log(e)
        setErrMessage(e.message)
        setIsRegistered(false)
        // openInfoTooltip()
      } finally {
        setIsLoad(false)
      }
    },
    [navigate],
  )

  // Выход
  const handleLogout = useCallback(
    async (values) => {
      localStorage.removeItem('jwt')
      setLoggedIn(false)
      setUserEmail('')
      const res = await auth.logout().catch((err) => {
        console.log(err)
        return true
      })

      if (!res) {
        throw new Error('Ошибка : Выйти не получилось')
      }
      setIsLoad(false)
    },
    [navigate],
  )

  const handleTokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            navigate('/', { replace: true })
            setUserEmail(res.email)
            console.log(userEmail)
          }
        })
        .catch((err) => {
          console.log('Ошибка в токене', err)
        })
        .finally(() => {
          setIsLoad(false)
        })
    }
  }, [navigate])

  useEffect(() => {
    handleTokenCheck()
  }, [handleTokenCheck])

  if (isLoad) {
    return <Loader />
  }

  return (
    <QueryClientProvider>
      <CurrentUserContext.Provider value={currentUser}>
        <BuissnessLogicContext.Provider value={{ handleUpdateAvatar }}>
          <ReactQueryDevtools initialIsOpen={true} />
          <Popups>
            <div className="body">
              <div className="page">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute
                        isloggedIn={loggedIn}
                        element={
                          <>
                            <Main
                              // onEditProfile={openProfilePopup}
                              // onEditAvatar={openEditAvatarPopup}
                              // onAddPlace={openAddPlacePopup}
                              // onCardDelete={handleCardClickDelete}
                              // onCardClick={handleCardClick}
                              onCardLike={handleCardLike}
                              cards={cards}
                              email={userEmail}
                              signOut={handleLogout}
                              loggedIn={loggedIn}
                            />
                            <Footer />
                          </>
                        }
                      />
                    }
                  />
                  <Route
                    path="/singup"
                    element={
                      <Register
                        onAddAccount={handleRegister}
                        loggedIn={loggedIn}
                      />
                    }
                  />
                  <Route
                    path="/singin"
                    element={
                      <Login handleLogin={handleLogin} loggedIn={loggedIn} />
                    }
                  />
                </Routes>
              </div>
            </div>
          </Popups>
        </BuissnessLogicContext.Provider>
      </CurrentUserContext.Provider>
    </QueryClientProvider>
  )
}
