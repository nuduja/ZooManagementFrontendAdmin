import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const EventSpecific = () => {
    const navigate = useNavigate();
    const { eventID } = useParams();
    const [eventData, setEventData] = useState(null);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        card: {
            width: '400px',
        },
        grid: {
            padding: '8px',
        },
        column: {
            marginBottom: '8px',
        },
        buttonGroup: {
            marginTop: '8px',
        },
    };

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
        <div style={styles.container}>
            <h1>Event Specific data</h1>
            {eventData ? (
                <Card style={styles.card} className="p-mb-2">
                    <div style={styles.grid}>
                        <div style={styles.column}>
                            <strong>Event ID:</strong> {eventData?.eventID}
                        </div>
                        <div style={styles.column}>
                            <strong>Event Name:</strong> {eventData?.eventName}
                        </div>
                        <div style={styles.column}>
                            <strong>Description:</strong> {eventData?.eventDescription}
                        </div>
                        <div style={styles.column}>
                            <strong>Date:</strong> {eventData?.eventDate}
                        </div>
                        <div style={styles.column}>
                            <strong>Location:</strong> {eventData?.eventLocation}
                        </div>
                        <div style={styles.column}>
                            <strong>Manager:</strong> {eventData?.eventManager}
                        </div>
                        <div style={styles.column}>
                            <strong>Capacity:</strong> {eventData?.capacity}
                        </div>
                        <div style={styles.buttonGroup}>
                            <Button label="Edit" icon="pi pi-pencil" className="p-button-primary p-mr-2" onClick={() => navigate(`/editEvent/${eventData?.eventID}`)} />
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
