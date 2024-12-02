import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Добро пожаловать на наш сайт!</h1>
      <p>Выберите одно из следующих действий:</p>
      <nav>
        <Link to="/register">Зарегистрироваться</Link> | 
        <Link to="/login"> Войти</Link>
        <Link to="/notes"> Заметки</Link>
      </nav>
    </div>
  );
};

export default HomePage;
