import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import '../styles/editEvent.css';
import {Calendar} from "primereact/calendar"; // Import CSS file

const EditEvent = () => {
    const navigate = useNavigate();
    const { eventID } = useParams();
    const [eventData, setEventData] = useState(null);
    const [editedEventData, setEditedEventData] = useState({
        eventName: '',
        eventDescription: '',
        eventDate: new Date(),
        eventLocation: '',
        eventManager: '',
        capacity: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/event/${eventID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEventData(data);
                setEditedEventData({
                    eventName: data.eventName,
                    eventDescription: data.eventDescription,
                    eventDate: new Date(data.eventDate),
                    eventLocation: data.eventLocation,
                    eventManager: data.eventManager,
                    capacity: data.capacity.toString()
                });
            } catch (error) {
                console.error('Error fetching Event data:', error);
                setErrorMsg('Failed to fetch Event data');
                setShowErrorDialog(true);
            }
        };

        fetchEventData();
    }, [eventID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name == null){
            const date = new Date(value);
            const formattedDate = date.toISOString().split('T')[0];
            setEditedEventData({
                ...editedEventData,
                eventDate: formattedDate
            });
        }else{
            setEditedEventData(prevData => ({
                ...prevData,
                [name]: value
            }));}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/event/updatebyeventid/${eventID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedEventData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update Event data');
            }

            setSuccessMsg('Event data updated successfully');
            setErrorMsg('');
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Error updating Event data:', error);
            setErrorMsg(error.message || 'Failed to update Event data');
            setShowErrorDialog(true);
            setSuccessMsg('');
        }
    };

    const onHideDialog = () => {
        setShowSuccessDialog(false);
        setShowErrorDialog(false);
        navigate(`/event/${eventID}`);
    };

    return (
        <div className="edit-event-container">
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit} className="edit-event-form">
                <div className="p-field">
                    <label htmlFor="eventName">Event Name:</label>
                    <InputText
                        id="eventName"
                        name="eventName"
                        value={editedEventData.eventName}
                        onChange={handleInputChange}
                        className="p-inputtext"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="eventDescription">Event Description:</label>
                    <InputText
                        id="eventDescription"
                        name="eventDescription"
                        value={editedEventData.eventDescription}
                        onChange={handleInputChange}
                        className="p-inputtext"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="eventDate">Event Date:</label>
                    <Calendar
                        id="eventDate"
                        name="eventDate"
                        value={editedEventData.eventDate}
                        onChange={handleInputChange}
                        dateFormat="yy-mm-dd"
                        className="zoo-input"
                        required
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="eventLocation">Event Location:</label>
                    <InputText
                        id="eventLocation"
                        name="eventLocation"
                        value={editedEventData.eventLocation}
                        onChange={handleInputChange}
                        className="p-inputtext"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="eventManager">Event Manager:</label>
                    <InputText
                        id="eventManager"
                        name="eventManager"
                        value={editedEventData.eventManager}
                        onChange={handleInputChange}
                        className="p-inputtext"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="capacity">Capacity:</label>
                    <InputText
                        id="capacity"
                        name="capacity"
                        value={editedEventData.capacity}
                        onChange={handleInputChange}
                        className="p-inputtext"
                    />
                </div>
                <Button type="submit" label="Update" className="p-button-success" />
            </form>

            <Dialog
                visible={showSuccessDialog}
                onHide={onHideDialog}
                header="Success"
                className="custom-dialog"
                footer={<Button label="OK" onClick={onHideDialog} />}
            >
                <p>{successMsg}</p>
            </Dialog>

            <Dialog
                visible={showErrorDialog}
                onHide={onHideDialog}
                header="Error"
                className="custom-dialog"
                footer={<Button label="OK" onClick={onHideDialog} />}
            >
                <p>{errorMsg}</p>
            </Dialog>
        </div>
    );
};

export default EditEvent;