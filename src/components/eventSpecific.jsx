import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import '../styles/eventSpecific.css';

const EventSpecific = () => {
    const navigate = useNavigate();
    const { eventID } = useParams();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/event/${eventID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEventData(data);
            } catch (error) {
                console.error('Error fetching Event data:', error);
            }
        };

        fetchEventData();
    }, [eventID]);

    const handleDelete = async (eventID) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/event/${eventID}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Event');
            }
            navigate('/');
        } catch (error) {
            console.error('Error deleting Event:', error);
        }
    };

    return (
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
            <h1>Event Specific data</h1>
            {eventData ? (
                // <Card title="Admin Specific Details" className="event-card">
                <Card style={{ width: '400px' }} className="p-mb-2">
    <div className="p-grid p-dir-col p-p-2">
        <div className="p-col">
            <strong>Event ID:</strong> {eventData?.eventID}
        </div>
        <div className="p-col">
            <strong>Event Name:</strong> {eventData?.eventName}
        </div>
        <div className="p-col">
            <strong>Description:</strong> {eventData?.eventDescription}
        </div>
        <div className="p-col">
            <strong>Date:</strong> {eventData?.eventDate}
        </div>
        <div className="p-col">
            <strong>Location:</strong> {eventData?.eventLocation}
        </div>
        <div className="p-col">
            <strong>Manager:</strong> {eventData?.eventManager}
        </div>
        <div className="p-col">
            <strong>Capacity:</strong> {eventData?.capacity}
        </div>
        <div className="p-col">
            {/* Edit button */}
            <Button label="Edit" icon="pi pi-pencil" className="p-button-primary p-mr-2" onClick={() => navigate(`/editEvent/${eventData?.eventID}`)} />
            {/* Delete button */}
            <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(eventData?.eventID)} />
        </div>
    </div>
</Card>

            ) : (
                <p>Loading Event data...</p>
            )}
        </div>
    );
};

export default EventSpecific;