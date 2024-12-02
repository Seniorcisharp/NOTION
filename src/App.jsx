import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Notes from "./NotesPage";
import EditNotePage from "./EditNotePage";
import NoteViewPage from "./NoteViewPage";
import CreateNotePage from "./CreateNotePage";
import NotFoundPage from "./404Page";  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/edit/:id" element={<EditNotePage />} />
        <Route path="/notes/view/:id" element={<NoteViewPage />} />
        <Route path="/notes/create" element={<CreateNotePage />} />
      
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
