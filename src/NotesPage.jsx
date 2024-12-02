import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./NotesPage.css";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
       
        const response = await axios.get("http://localhost:3000/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке заметок:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Вы уверены, что хотите удалить эту заметку?")) {
      try {
      
        await axios.delete(`http://localhost:3000/notes/${id}`);
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      } catch (error) {
        console.error("Ошибка при удалении заметки:", error);
      }
    }
  };

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="notes-page">
      <h1>Мои заметки</h1>
      <input
        type="text"
        placeholder="Поиск заметок"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link to="/notes/create" className="button">
        Создать новую заметку
      </Link>
      <Link to="/" className="button">
        На главную
      </Link>
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id}>
            <div>
              <strong>{note.title}</strong>
              <span>({new Date(note.createdAt).toLocaleDateString()})</span>
            </div>
            <div>
              <button onClick={() => navigate(`/notes/view/${note.id}`)}>👀</button>
              <button onClick={() => navigate(`/notes/edit/${note.id}`)}>✍️</button>
              <button onClick={() => handleDelete(note.id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
