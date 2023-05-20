import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
  email,
  signOut,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <Header
        buttonClick={signOut}
        adress={"/singin"}
        buttonText={"Выйти"}
        email={email}
      />
      <main className="content">
        <section className="profile">
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__conteiner"
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="Исправить"
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__add-button"
            type="button"
            aria-label="Добавить"
          ></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
            onCardClick={onCardClick} 
            onCardLike={onCardLike} 
            onCardDelete={onCardDelete} 
            card={card} 
            key={card._id} 

            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
