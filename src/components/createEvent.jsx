import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import '../styles/createevent.css';
import { Button } from 'primereact/button';

function CreateEvent() {
  // const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [displayDialog, setDisplayDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          eventDescription,
          eventDate: eventDate.toISOString(),
          eventLocation,
          capacity: parseInt(capacity),
          username,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      setDisplayDialog(true);
      setDialogMessage('Event created successfully');
      setEventName('');
      setEventDescription('');
      setEventLocation('');
      setCapacity('');
      setEventDate(null);
      setUsername('');
    } catch (error) {
      console.error('Error creating event:', error);
      setErrorMessage('Failed to create event. Please try again.');
      setDisplayDialog(true);
      setDialogMessage(errorMessage);
    }
  };

  const dialogFooter = (
    <div>
      <Button label="OK" icon="pi pi-check" onClick={() => setDisplayDialog(false)} />
    </div>
  );

  return (
    <div className="container">
      {/* <img className="background-image" src="https://shorturl.at/oqFS2" alt="Background" /> */}
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
            disabled
          />
        </label>
        <label>
          Event Type:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </label>
        <label>
          Event Description:
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Capacity:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </label>
        <label>
          Event Location:
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </label>
        <div className="calendar-container">
          <label>
            Select Date:
            <Calendar
              value={eventDate}
              onChange={(e) => setEventDate(e.value)}
              dateFormat="yy-mm-dd"
              required
            />
          </label>
        </div>
        <button type="submit">Book Event</button>

        {/* Dialog */}
        <Dialog
          visible={displayDialog}
          onHide={() => setDisplayDialog(false)}
          header="Message"
          footer={dialogFooter}
        >
          <p>{dialogMessage}</p>
        </Dialog>
      </form>
    </div>
  );
}

export default CreateEvent;
