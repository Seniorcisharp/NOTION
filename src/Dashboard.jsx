import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId"); 
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Ошибка при загрузке данных пользователя.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className="dashboard">
      <h2>Личный кабинет</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Возраст:</strong> {user.age}</p>
      <p><strong>Пол:</strong> {user.gender}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Дата регистрации:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      <button onClick={() => navigate("/notes")}>Перейти к заметкам</button>
    </div>
  );
};

export default Dashboard;
