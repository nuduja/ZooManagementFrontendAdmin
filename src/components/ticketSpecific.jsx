import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import '../styles/ticketSpecific.css';

const TicketSpecific = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    // Function to handle edit button click
    const handleEdit = () => {
        navigate(`/ticket/edit/${ticketId}`);
    };

    return (
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
            <h1>Ticket Specific data</h1>
            {loading ? (
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            ) : (
                <Card style={{ width: '400px' }} className="p-mb-2">
                    <div className="p-grid p-dir-col p-p-2">
                        <div className="p-col">
                            <strong>ID:</strong> {ticketData?.id}
                        </div>
                        <div className="p-col">
                            <strong>Ticket ID:</strong> {ticketData?.ticketID}
                        </div>
                        <div className="p-col">
                            <strong>Ticket Type:</strong> {ticketData?.ticketType}
                        </div>
                        <div className="p-col">
                            <strong>Availability:</strong> {ticketData?.status}
                        </div>
                        <div className="p-col">
                            <strong>Price:</strong> {ticketData?.price}
                        </div>
                        <div className="p-col">
                            <strong>Username:</strong> {ticketData?.username}
                        </div>
                        <div className="p-col">
                            <strong>Ticket Date:</strong> {ticketData?.ticketDate}
                        </div>
                        <div className="p-col">
                            {/* Edit button */}
                            <Button label="Edit" icon="pi pi-pencil" className="p-button-primary p-mr-2" onClick={handleEdit} />
                            {/* Delete button */}
                            <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(ticketData?.id)} />
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default TicketSpecific;
