import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Название заметки не может быть пустым.");
      return;
    }

    const newNote = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:3000/notes", newNote);
      navigate("/notes");
    } catch (err) {
      setError("Ошибка при сохранении заметки. Попробуйте еще раз.");
    }
  };

  return (
    <div className="create-note-page">
      <h1>Создание новой заметки</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Название заметки:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название"
          />
        </label>
        {error && <p className="error">{error}</p>}

        <label>
          Тело заметки:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Введите текст (не обязательно)"
          />
        </label>

        <button type="submit">Создать</button>
      </form>

      <button onClick={() => navigate("/notes")}>Назад</button>
    </div>
  );
};

export default CreateNotePage;
