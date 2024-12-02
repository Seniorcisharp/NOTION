import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";
import "./app.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
      if (response.data.length === 0) {
        setErrorMessage("Пользователь не найден.");
        return;
      }

      const user = response.data[0];

      
      const passwordMatch = bcrypt.compareSync(formData.password, user.password);
      if (!passwordMatch) {
        setErrorMessage("Неверный пароль.");
        return;
      }

     
      localStorage.setItem("userId", user.id);

    
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Произошла ошибка при входе.");
    }
  };

  return (
    <div className="login-form">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        
        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
