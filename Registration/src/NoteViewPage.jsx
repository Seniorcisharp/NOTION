import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; 

const NoteViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null); 
  const [error, setError] = useState("");

  useEffect(() => {
   
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/notes/${id}`);
        setNote(response.data);
      } catch (err) {
        setError("Ошибка при загрузке заметки.");
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Вы уверены, что хотите удалить эту заметку?")) {
      try {
     
        await axios.delete(`http://localhost:3000/notes/${id}`);
        navigate("/notes"); 
      } catch (err) {
        setError("Ошибка при удалении заметки.");
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!note) {
    return <p>Заметка не найдена</p>;
  }

  return (
    <div className="note-view-page">
      <h1>{note.title}</h1>

      
      <div className="note-actions">
        <button onClick={() => navigate(`/notes/edit/${id}`)}>✍️ Редактировать</button>
        <button onClick={handleDelete}>🗑 Удалить</button>
      </div>

   
      <div className="note-body">
        <pre>{note.body}</pre> 
      </div>

     
      <p>
        <small>Создано: {new Date(note.createdAt).toLocaleDateString()}</small>
      </p>


      <button onClick={() => navigate("/notes")}>Назад</button>
    </div>
  );
};

export default NoteViewPage;
