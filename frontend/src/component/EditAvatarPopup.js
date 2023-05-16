import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const { handleChange, isValid, setIsValid, errors, setErrors } = useForm({});

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
    setErrors({});
    setIsValid(true)
  }, [isOpen, setErrors, setIsValid]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      popupTitle="Обновить аватар"
      popunName="update_avatar"
      buttonText={isLoading ? "Сохранение..." : "Обновить"}
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
  );
}

export default EditAvatarPopup;
