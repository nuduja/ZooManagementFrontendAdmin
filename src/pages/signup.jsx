import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import '../styles/signup.css'
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  //TODO:Set an initial touch for confirm password

  let navigate = useNavigate(); 

  const [submitted, setSubmitted] = useState(false);
  const [confPassword, setconfPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name;
    const username = formData.username;
    const phone = formData.phone;
    const email = formData.email;
    const password = formData.password;

    try{
      if(!confPassword && name && username && phone && email && password) {
        console.log('here2')
        const response = await fetch("http://localhost:8080/user/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, username, phone, email, password})
        });
        setSubmitted(false);
        navigate('/login');
      }
      setSubmitted(true);

    }catch(error){
      console.error("Signup Error: ", error);
      setSubmitted(true);
    }
  };

  return (
    <div className="login-container p-grid p-justify-center">
      <div className="p-col-12 p-md-6">
        <Card title="Sign-Up" className="login-card p-shadow-3 card">
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
              <label htmlFor="username">Name</label>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-inputtext-lg"
              />
            </div>
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
              <label htmlFor="username">Phone</label>
              <InputText
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="p-inputtext-lg"
              />
            </div>
            <div className="p-field">
              <label htmlFor="username">E-mail</label>
              <InputText
                id="email"
                type='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              <label htmlFor="password">Confirm Password</label>
              <InputText
                id="password"
                type="password"
                onChange={(e) =>  {(e.target.value == formData.password) ? setconfPassword(false) : setconfPassword(true)}}
                className="p-inputtext-lg"
              />
            </div>
            {confPassword && (
            <Message severity="error" text="Passwords are not same. Please try again." />
          )}
            <div className="p-field">
              <Button
                label="Login"
                type="submit"
                className="p-button-rounded p-button-lg p-button-success"
              />
            </div>
          </form>
          {submitted && (
            <Message severity="error" text="Fill All details. Please try again." />
          )}
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;