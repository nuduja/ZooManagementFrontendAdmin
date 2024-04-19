import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import '../styles/createevent.css';

function CreateEvent() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [eventType, setEventType] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(null); // Changed from ticketDate to date
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [username, setUsername] = useState(''); // State for the username

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const eventTypes = [
    { label: 'Event 01', value: 'event01', price: 40 },
    { label: 'Event 02', value: 'event02', price: 40 },
    { label: 'Event 03', value: 'event03', price: 40 },
    { label: 'Event 04', value: 'event04', price: 40 },
    { label: 'Event 05', value: 'event05', price: 40 }
  ];

  const handleEventTypeChange = (e) => {
    const selectedEventType = e.value;
    const selectedEvent = eventTypes.find(event => event.value === selectedEventType);
    setEventType(selectedEventType);
    setPrice(selectedEvent.price);
    setSelectedPrice(selectedEvent.price); // Update selectedPrice when event type changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EventType: eventType,
          Price: parseFloat(price),
          TicketDate: date.toISOString().substring(0, 10), // Use date instead of ticketDate
          Username: username // Include username in the request
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      alert('Event created successfully');
      setEventType('');
      setPrice('');
      setDate(null); // Reset date after successful creation
      setUsername(''); // Clear username field after successful creation
    } catch (error) {
      console.error('Error creating event:', error);
      setErrorMessage('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Book Online</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Event Type:
          <Dropdown
            value={eventType}
            options={eventTypes}
            onChange={handleEventTypeChange}
            placeholder="Select Event Type"
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={selectedPrice}
            readOnly
          />
        </label>
        <div className="calendar-container">
          <label>
            Select Date:
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              dateFormat="yy-mm-dd"
              required
            />
          </label>
        </div>
        <button type="submit">Book Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
