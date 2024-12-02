import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; 

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null); 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/notes/${id}`);
        setNote(response.data);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (err) {
        setError("Ошибка при загрузке заметки.");
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Название заметки не может быть пустым.");
      return;
    }

   
    try {
      const updatedNote = { title, body, createdAt: note.createdAt }; 
      await axios.put(`http://localhost:3000/notes/${id}`, updatedNote);

      navigate(`/notes/view/${id}`); 
    } catch (err) {
      setError("Ошибка при сохранении изменений.");
    }
  };

  if (!note) {
    return <p>Заметка не найдена</p>;
  }

  return (
    <div className="edit-note-page">
      <h1>Редактирование заметки</h1>

      <label>
        Название:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <label>
        Тело:
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>

      <button onClick={handleSave}>Сохранить</button>
      
      <button onClick={() => navigate("/notes")}>Назад</button>
    </div>
  );
};

export default EditNotePage;
