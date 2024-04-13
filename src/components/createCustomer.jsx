import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

function CreateCustomer() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          username: username,
          phone: phone,
          email: email,
          password: password
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create Customer');
      }
      alert('Customer created successfully');
      setName('');
      setUsername('');
      setPhone('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating Customer:', error);
      setErrorMessage('Failed to create Customer. Please try again.');
    }
  };

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
  }

  return (
    <div>
      {/*<header className="zoo-header">*/}
      {/*  <hr />*/}
      {/*</header>*/}
      <div className="ticket-section-container">
        <div className="ticket-section-background"></div> {/* Background image */}
        <div className="create-ticket-container">
          <h2>Book Online</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>name:</label>
              <InputText
                value={name}
                onChange={handleInput(setName)}
                // disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>username:</label>
              <InputText
                value={username}
                onChange={handleInput(setUsername)}
                // disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>phone:</label>
              <InputText
                  value={phone}
                  onChange={handleInput(setPhone)}
                  // disabled
                  className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>email:</label>
              <InputText
                value={email}
                onChange={handleInput(setEmail)}
                // disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>password:</label>
              <InputText
                value={password}
                onChange={handleInput(setPassword)}
                // disabled
                className="zoo-input"
              />
            </div>

            <Button label="Create Animal" type="submit" className="zoo-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
