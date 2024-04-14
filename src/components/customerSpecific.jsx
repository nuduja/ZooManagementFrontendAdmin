import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerSpecific = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${username}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCustomerData(data);
            } catch (error) {
                console.error('Error fetching Customer data:', error);
            }
        };

        fetchCustomerData();
    }, [name]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${username}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Customer');
            }
            navigate('/');
        } catch (error) {
            console.error('Error deleting Customer:', error);
        }
    };

    return (
        <div>
            <h1>Customer Specific data</h1>
            {customerData ? (
                <div>
                    <div>
                        <p>ID: {customerData.id}</p>
                        <p>name: ${customerData.name}</p>
                        <p>username: {customerData.username}</p>
                        <p>phone: {customerData.phone}</p>
                        <p>email: {customerData.email}</p>
                        <p>role: {customerData.role}</p>
                    </div>
                    <div>
                        {/*<Button label="Edit" className="p-button-raised p-button-info p-mr-2" onClick={() => navigate(`/editticket/${ticketData.ticketID}`)} />*/}
                        <button onClick={handleDelete}> Delete </button>
                    </div>
                    </div>
                // </Card>
            ) : (
                <p>Loading Customer data...</p>
            )}
        </div>
    );
};

export default CustomerSpecific;