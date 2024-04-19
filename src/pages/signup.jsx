import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import '../styles/signup.css';

const SignUpPage = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [confPassword, setconfPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name;
    const username = formData.username;
    const password = formData.password;
    const role = "ADMIN";

    try {
      if (!confPassword && name && username && password) {
        const response = await fetch(`${baseUrl}admin/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, username, password, role })
        });

        setSubmitted(false);
        setShowSuccessDialog(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Signup Error: ", error);
      setShowErrorDialog(true);
      setSubmitted(true);
    }
  };

  const successFooter = (
    <div>
      <Button label="OK" icon="pi pi-check" onClick={() => setShowSuccessDialog(false)} autoFocus />
    </div>
  );

  const errorFooter = (
    <div>
      <Button label="OK" icon="pi pi-times" onClick={() => setShowErrorDialog(false)} autoFocus />
    </div>
  );

  return (
    <div className="login-container p-grid p-justify-center">
      <div className="p-col-12 p-md-6">
        <Card title="Sign-Up" className="login-card p-shadow-3 card">
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
              <label htmlFor="name">Name</label>
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <InputText
                id="confirmPassword"
                type="password"
                onChange={(e) => {(e.target.value === formData.password) ? setconfPassword(false) : setconfPassword(true)}}
                className="p-inputtext-lg"
              />
            </div>
            {confPassword && (
              <Message severity="error" text="Passwords do not match. Please try again." />
            )}
            <div className="p-field">
              <Button
                label="Sign Up"
                type="submit"
                className="p-button-rounded p-button-lg p-button-success"
              />
            </div>
          </form>
          {submitted && (
            <Message severity="error" text="Fill in all details. Please try again." />
          )}
          <Dialog
            visible={showSuccessDialog}
            onHide={() => setShowSuccessDialog(false)}
            header="Success"
            footer={successFooter}
          >
            Registration successful!
          </Dialog>
          <Dialog
            visible={showErrorDialog}
            onHide={() => setShowErrorDialog(false)}
            header="Error"
            footer={errorFooter}
          >
            Registration unsuccessful. Please check your details.
          </Dialog>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
