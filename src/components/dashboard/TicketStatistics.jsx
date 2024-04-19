import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TicketStatistics() {
    const [statistics, setStatistics] = useState({
        totalTickets: 0,
        countByType: {}, // Ensuring it's an object
        countByStatus: {}, // Ensuring it's an object
        totalIncome: 0.0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('/api/v1/ticket/statistics');
                console.log("API Response:", response.data); // Check the structure here
                setStatistics(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setError(error.response.data.message);
                } else if (error.request) {
                    // The request was made but no response was received
                    setError("No response from server");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError("Error " + error.message);
                }
                setLoading(false);
            }

        };


        fetchStatistics();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Ticket Statistics</h1>
            <div>Total Tickets: {statistics.totalTickets}</div>
            <div>
                Tickets by Type:
                <ul>
                    {statistics.countByType && Object.entries(statistics.countByType).map(([type, count]) => (
                        <li key={type}>{type}: {count}</li>
                    ))}
                </ul>
            </div>
            <div>
                Tickets by Status:
                <ul>
                    {statistics.countByStatus && Object.entries(statistics.countByStatus).map(([status, count]) => (
                        <li key={status}>{status}: {count}</li>
                    ))}
                </ul>
            </div>

            <div>Total Income: ${statistics.totalIncome.toFixed(2)}</div>
        </div>
    );
}

export default TicketStatistics;
