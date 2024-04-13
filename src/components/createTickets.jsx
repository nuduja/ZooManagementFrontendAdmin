import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

function CreateTicket() {
  const [ticketType, setTicketType] = useState('');
  const [price, setPrice] = useState('');
  const [username, setUsername] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem(username, "adminUser1") //TODO:Remove This line
    setUsername(sessionStorage.getItem(username))
    try {
      const response = await fetch('http://localhost:8080/api/v1/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketType: ticketType,
          price: parseFloat(price),
          ticketDate: ticketDate,
          username: username,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create Ticket');
      } else{
        alert('Ticket created successfully');
        setTicketType('');
        setPrice('');
        setUsername('');
      }
    } catch (error) {
      console.error('Error creating Ticket:', error);
      setErrorMessage('Failed to create Ticket. Please try again.');
    }
  };

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
  }

  return (
    <div>
      <div className="ticket-section-container">
        <div className="ticket-section-background"></div> {/* Background image */}
        <div className="create-ticket-container">
          <h2>Book Online</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label className='t'>Ticket Type:</label>
              <select id="ticketTypeSelect" className="zoo-dropdown" onChange={handleInput(setTicketType)}>
                <option value="">Select a Ticket Type</option>
                <option value="LOCAL_ADULT">Local Adult</option>
                <option value="LOCAL_KID">Local Child</option>
                <option value="FOREIGN_ADULT">Foreign Adult</option>
                <option value="FOREIGN_KID">Foreign Child</option>
              </select>

            </div>

            <div className="input-container">
              <label>Price:</label>
              <InputText
                value={price}
                onChange={handleInput(setPrice)}

                className="zoo-input"
              />
            </div>
            <Button label="Buy Ticket" type="submit" className="zoo-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;