import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import '../styles/login.css'
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  let navigate = useNavigate(); 

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formData.username;
    const password = formData.password;

    try{
      const response = await fetch("http://localhost:8080/api/v1/admin/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });

      const data = await response.json();

      if (data) {
        sessionStorage.setItem("loginStatus", "true");
        sessionStorage.setItem("username", username);
        alert("Login successful!");
        navigate('/');
      } else {
        alert("Login unsuccessful. Please check your credentials.");
      }

      setSubmitted(false);

    }catch(error){
      console.error("Login Error: ", error);
      alert("An error occurred during the process.");
      setSubmitted(true);
    }
  };

  return (
    <div className="login-container p-grid p-justify-center">
      <div className="p-col-12 p-md-6">
        <Card title="Login" className="login-card p-shadow-3 card">
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="p-inputtext-lg"
              />
            </div>
            <div className="p-field">
              <label htmlFor="password">Password</label>
              <InputText
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="p-inputtext-lg"
              />
            </div>
            <div className="p-field">
              <Button
                label="Login"
                type="submit"
                className="p-button-rounded p-button-lg p-button-success"
              />
            </div>
          </form>
          {submitted && (
            <Message severity="error" text="Invalid username or password. Please try again." />
          )}
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;