import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrationSchema } from "./validationSchema";
import bcrypt from "bcryptjs";
import axios from "axios";
import "./app.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    avatarUrl: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    try {
      registrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (validationError) {
      const fieldErrors = {};
      validationError.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
      if (response.data.length > 0) {
        setErrorMessage("Пользователь с таким email уже существует.");
        return;
      }

      const hashedPassword = bcrypt.hashSync(formData.password, 10);

      const userData = {
        id: crypto.randomUUID(),
        ...formData,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };
      delete userData.confirmPassword;

      await axios.post("http://localhost:3000/users", userData);
     ;
      navigate("/login");
    } catch (error) {
      setErrorMessage("Произошла ошибка при регистрации");
    }
  };

  return (
    <div className="registration-form">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Имя"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Возраст"
        />
        {errors.age && <p className="error">{errors.age}</p>}

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другой</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Повторите пароль"
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
