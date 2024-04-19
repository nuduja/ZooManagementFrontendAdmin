import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../styles/customerSpecific.css'; // Importing the CSS file

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

    const handleEdit = () => {
        navigate(`/customer/edit/${username}`);
    };

    const handleResetPassword = () => {
        navigate(`/customer/reset-password/${username}`);
    };

    return (
        <div>
            <h1>Customer Specific data</h1>
            {customerData ? (
                <Card title="Customer Details" className="customer-card">
                    <div>
                        <p>ID: {customerData.id}</p>
                        <p>Name: {customerData.name}</p>
                        <p>Username: {customerData.username}</p>
                        <p>Phone: {customerData.phone}</p>
                        <p>Email: {customerData.email}</p>
                        {/* <p>Role: {customerData.role}</p> */}
                    </div>
                    <div className="button-container">
                        <Button label="Edit" className="edit-button" onClick={handleEdit} />
                        <Button label="Delete" className="delete-button" onClick={handleDelete} />
                        <Button label="Reset Password" className="reset-password-button" onClick={handleResetPassword} />
                    </div>
                </Card>
            ) : (
                <p>Loading Customer data...</p>
            )}
        </div>
    );
};

export default CustomerSpecific;
