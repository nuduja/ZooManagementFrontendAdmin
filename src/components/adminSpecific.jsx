import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../styles/adminSpecific.css';

const AdminSpecific = () => {
    const navigate = useNavigate();
    const { adminId } = useParams();
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/${adminId}`);
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
    }, [adminId]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/${adminId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Admin');
            }
            navigate(-1);
        } catch (error) {
            console.error('Error deleting Admin:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/admin/edit/${adminData.adminId}`);
    };

    const handleResetPassword = () => {
        navigate(`/admin/reset-password/${adminId}`);
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
                        {/* Reset Password button */}
                        <Button label="Reset Password" className="p-button-raised p-button-info p-mr-2" onClick={handleResetPassword} />
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
