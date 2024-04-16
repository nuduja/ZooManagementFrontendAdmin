import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const CustomerSpecific = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/user/${username}`);
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
    }, [username]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/user/${username}`, {
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
                <Card title="Customer Details" className="p-col-12 p-md-6 p-lg-4">
                    <div>
                        <p>ID: {customerData.id}</p>
                        <p>Name: {customerData.name}</p>
                        <p>Username: {customerData.username}</p>
                        <p>Phone: {customerData.phone}</p>
                        <p>Email: {customerData.email}</p>
                        {/* <p>Role: {customerData.role}</p> */}
                    </div>
                    <div>
                        <Button label="Delete" className="p-button-danger" onClick={handleDelete} />
                    </div>
                </Card>
            ) : (
                <p>Loading Customer data...</p>
            )}
        </div>
    );
};

export default CustomerSpecific;
