import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';


function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const { values, handleChange, setValues, isValid, setIsValid, errors, setErrors } = useForm({});
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about
    });
    setErrors({});
    setIsValid(true);
  }, [currentUser, isOpen, setValues, setErrors, setIsValid]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      popupTitle="Редактировать профиль"
      popunName="add_profile"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        value={values.name || ''}
        onChange={handleChange}
        id="heading-input"
        type="text"
        className={`popup__item ${errors?.name && 'popup__item_error'}`}
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error">{errors.name || ''}</span>
      <input
        value={values.about || ''}
        onChange={handleChange}
        id="subheading-input"
        type="text"
        className={`popup__item ${errors?.about && 'popup__item_error'}`}
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error">{errors.about || ''}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
