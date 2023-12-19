import { useEffect } from 'react'
import Header from './Header'
import { useForm } from '../hooks/useForm'
import { useMutation } from 'react-query'
import { login } from '../api/login'
import { useUserStore } from '../store'
import { useNavigate } from 'react-router-dom'

function Login() {
  const {
    values,
    handleChange,
    setValues,
    isValid,
    setIsValid,
    errors,
    setErrors,
  } = useForm({})

  const navigate = useNavigate()
  const { setIsLoggedIn } = useUserStore()

  const { mutate } = useMutation(login, {
    onSuccess: (data) => {
      window.localStorage.setItem('jwt', data.token)

      setIsLoggedIn(true)

      setValues({ email: '', password: '' })
      setErrors({})
      setIsValid(true)

      navigate('/', { replace: true })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!values.email || !values.password) return

    mutate(values)
  }

  return (
    <>
      <Header adress={'/singup'} buttonText={'Регистрация'} />
      <form className="form-auth" onSubmit={handleSubmit} noValidate>
        <h2 className="popup__title ">Вход</h2>
        <fieldset className="form-auth__info">
          <input
            value={values.email || ''}
            onChange={handleChange}
            className={`form-auth__item ${
              errors?.email && 'form-auth__item_error'
            }`}
            type="email"
            name="email"
            minLength="6"
            maxLength="40"
            placeholder="Email"
            required
          />
          <span className="popup__error">{errors.email || ''}</span>
          <input
            value={values.password || ''}
            onChange={handleChange}
            type="password"
            className={`form-auth__item ${
              errors?.password && 'form-auth__item_error'
            }`}
            name="password"
            minLength="8"
            maxLength="200"
            placeholder="Пароль"
            required
          />
          <span className="popup__error">{errors.password || ''}</span>
        </fieldset>
        <button
          className={`form-auth__button ${
            isValid ? '' : 'popup__button_invalid'
          }`}
          type="submit"
          aria-label="Сохранить"
        >
          Войти
        </button>
      </form>
    </>
  )
}

export default Login
