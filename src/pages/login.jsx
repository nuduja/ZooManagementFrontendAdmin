import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog'; // <-- Import Dialog
import '../styles/login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false); // <-- State for success dialog
  const [showErrorDialog, setShowErrorDialog] = useState(false); // <-- State for error dialog

  let navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formData.username;
    const password = formData.password;

    try {
      const response = await fetch("http://localhost:8080/api/v1/admin/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data) {
        sessionStorage.setItem("loginStatus", "true");
        sessionStorage.setItem("username", username);
        setShowSuccessDialog(true); // <-- Show success dialog
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setShowErrorDialog(true); // <-- Show error dialog
      }

      setSubmitted(false);

    } catch (error) {
      console.error("Login Error: ", error);
      setShowErrorDialog(true); // <-- Show error dialog
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
          {/* Success Dialog */}
          <Dialog
            visible={showSuccessDialog}
            onHide={() => setShowSuccessDialog(false)}
            header="Success"
            footer={successFooter}
          >
            Login successful!
          </Dialog>
          {/* Error Dialog */}
          <Dialog
            visible={showErrorDialog}
            onHide={() => setShowErrorDialog(false)}
            header="Error"
            footer={errorFooter}
          >
            Login unsuccessful. Please check your credentials.
          </Dialog>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
