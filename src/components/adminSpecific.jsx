// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const AdminSpecific = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/${username}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAdminData(data);
            } catch (error) {
                console.error('Error fetching Admin data:', error);
            }
        };

        fetchAdminData();
    }, [username]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/${username}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Admin');
            }
            navigate('/');
        } catch (error) {
            console.error('Error deleting Admin:', error);
        }
    };

    // Function to navigate to the edit page
    const handleEdit = () => {
        navigate(`/admin/edit/${username}`);
    };

    return (
        <div>
            <h1>See Details</h1>
            
            {adminData ? (
                <Card title="Admin Specific Details" className="ticket-card">
                    <div>
                        <p>ID: {adminData.id}</p>
                        <p>Name: {adminData.name}</p>
                        <p>Username: {adminData.username}</p>
                        {/* <p>Password: {adminData.password}</p> */}
                        <p>Role: {adminData.role}</p>
                    </div>
                    <div>
                        {/* Edit button */}
                        <Button label="Edit" className="p-button-raised p-button-primary p-mr-2" onClick={handleEdit} />
                        {/* Delete button */}
                        <Button label="Delete" className="p-button-raised p-button-danger p-mr-2" onClick={handleDelete} />
                    </div>
                </Card>
            ) : (
                <p>Loading admin data...</p>
            )}
        </div>
    );
};

export default AdminSpecific;
