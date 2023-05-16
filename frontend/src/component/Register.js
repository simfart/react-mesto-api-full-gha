import React from 'react';
import Header from "./Header";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";

function Register({ onAddAccount, login }) {
  const { values, handleChange, setValues, isValid, setIsValid, errors, setErrors } = useForm({});

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddAccount({
      email: values.email,
      password: values.password
    });
  }

  React.useEffect(() => {
    setValues({});
    setErrors({});
    setIsValid(true)
  }, [setValues, setErrors, setIsValid]);

  return (
    <>
      <Header
        adress={'/singin'}
        buttonText={'Войти'}
      />
      <form className="form-auth" onSubmit={handleSubmit} noValidate>
        <h2 className="popup__title ">Регистрация</h2>
        <fieldset className="form-auth__info">
          <input
            value={values.email || ''}
            onChange={handleChange}
            className={`form-auth__item ${errors?.email && "form-auth__item_error"}`}
            type="email"
            name="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            required
          />
          <span className="popup__error">{errors.email || ''}</span>
          <input
            value={values.password || ""}
            onChange={handleChange}
            type="password"
            className={`form-auth__item ${errors?.password && "form-auth__item_error"}`}
            name="password"
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
            required
          />
          <span className="popup__error">{errors.password || ''}</span>
        </fieldset>
        <button
          className={`form-auth__button ${isValid ? "" : "popup__button_invalid"}`}
          type="submit"
          aria-label="Сохранить"
        >
          Зарегистрироваться
        </button>
        <span className="form-auth__link">Уже зарегистрированы? <Link to="/singin" className="form-auth__sing-in">Войти</Link> </span>
      </form>
    </>
  );
}

export default Register;
