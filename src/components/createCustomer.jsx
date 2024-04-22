import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import '../styles/createCustomer.css';

function CreateCustomer() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = "USER"

    if (!name || !username || !phone || !email || !password) {
      setErrorMessage('Please fill in all fields');
      setShowErrorDialog(true);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      setShowErrorDialog(true);
      return;
    }

    if (!validatePhone(phone)) {
      setErrorMessage('Invalid phone number');
      setShowErrorDialog(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          username: username,
          phone: phone,
          email: email,
          password: password,
          role: role
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create Customer');
      }
      setShowSuccessDialog(true);
      setName('');
      setUsername('');
      setPhone('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating Customer:', error);
      setErrorMessage('Failed to create Customer. Please try again.');
      setShowErrorDialog(true);
    }
  };

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  }

  const onHideDialog = () => {
    setShowSuccessDialog(false);
    setShowErrorDialog(false);
  };

  return (
    <div className="create-customer-container">
      <h2>Enter Customer Details</h2>
      {errorMessage && <Message severity="error" text={errorMessage} />}
      <form onSubmit={handleSubmit} className="create-customer-form">
        <div className="p-field">
          <label htmlFor="name">Name:</label>
          <InputText
            id="name"
            value={name}
            onChange={handleInput(setName)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="username">Username:</label>
          <InputText
            id="username"
            value={username}
            onChange={handleInput(setUsername)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="phone">Phone:</label>
          <InputText
            id="phone"
            value={phone}
            onChange={handleInput(setPhone)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email:</label>
          <InputText
            id="email"
            value={email}
            onChange={handleInput(setEmail)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password:</label>
          <InputText
            id="password"
            value={password}
            onChange={handleInput(setPassword)}
            type="password"
            className="p-inputtext p-component p-filled"
          />
        </div>
        <Button label="Create Customer" type="submit" className="p-button p-component p-filled p-button-rounded p-button-success" />
      </form>

      <Dialog
        visible={showSuccessDialog}
        onHide={onHideDialog}
        header="Success"
        className="custom-dialog"
        footer={<Button label="OK" onClick={onHideDialog} />}
      >
        <p>Customer created successfully</p>
      </Dialog>

      <Dialog
        visible={showErrorDialog}
        onHide={onHideDialog}
        header="Error"
        className="custom-dialog"
        footer={<Button label="OK" onClick={onHideDialog} />}
      >
        <p>{errorMessage}</p>
      </Dialog>
    </div>
  );
}

export default CreateCustomer;