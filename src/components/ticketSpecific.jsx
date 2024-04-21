import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const TicketSpecific = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        spinner: {
            width: '50px',
            height: '50px',
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
        const fetchTicketData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/ticket/${ticketId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTicketData(data);
            } catch (error) {
                console.error('Error fetching Ticket data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTicketData();
    }, [ticketId]);

    const handleDelete = async (ticketID) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/ticket/${ticketID}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Ticket');
            }
            navigate(-1);
        } catch (error) {
            console.error('Error deleting Ticket:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/ticket/edit/${ticketId}`);
    };

    return (
        <div style={styles.container}>
            <h1>Ticket Specific data</h1>
            {loading ? (
                <ProgressSpinner style={styles.spinner} />
            ) : (
                <Card style={styles.card} className="p-mb-2">
                    <div style={styles.grid}>
                        <div style={styles.column}>
                            <strong>ID:</strong> {ticketData?.id}
                        </div>
                        <div style={styles.column}>
                            <strong>Ticket ID:</strong> {ticketData?.ticketID}
                        </div>
                        <div style={styles.column}>
                            <strong>Ticket Type:</strong> {ticketData?.ticketType}
                        </div>
                        <div style={styles.column}>
                            <strong>Availability:</strong> {ticketData?.status}
                        </div>
                        <div style={styles.column}>
                            <strong>Price:</strong> {ticketData?.price}
                        </div>
                        <div style={styles.column}>
                            <strong>Username:</strong> {ticketData?.username}
                        </div>
                        <div style={styles.column}>
                            <strong>Ticket Date:</strong> {ticketData?.ticketDate}
                        </div>
                        <div style={styles.buttonGroup}>
                            <Button label="Edit" icon="pi pi-pencil" className="p-button-primary p-mr-2" onClick={handleEdit} />
                            <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(ticketData?.id)} />
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default TicketSpecific;
