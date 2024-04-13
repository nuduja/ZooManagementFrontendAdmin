import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TicketSpecific = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticketData, setTicketData] = useState(null);

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
            navigate('/');
        } catch (error) {
            console.error('Error deleting Ticket:', error);
        }
    };

    return (
        <div>
            <h1>Ticket Specific data</h1>
            {ticketData ? (
                <div>
                    <div>
                        <p>ID: {ticketData.id}</p>
                        <p>ticketID: ${ticketData.ticketID}</p>
                        <p>ticketType: {ticketData.ticketType}</p>
                        <p>availability: {ticketData.status}</p>
                        <p>price: {ticketData.price}</p>
                        <p>price: {ticketData.username}</p>
                    </div>
                    <div>
                        <button onClick={() => handleDelete(ticketData.id)} />
                    </div>
                    </div>
            ) : (
                <p>Loading Ticket data...</p>
            )}
        </div>
    );
};

export default TicketSpecific;