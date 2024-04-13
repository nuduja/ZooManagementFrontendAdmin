import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminSpecific = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/admin/${username}`);
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
            const response = await fetch(`http://localhost:8080/admin/${username}`, {
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

    return (
        <div>
            <h1>Admin Specif data</h1>
            {username}
            {adminData ? (
                // <Card title="Admin Specific Details" className="ticket-card">
                <div>
                    <div>
                        <p>ID: {adminData.id}</p>
                        <p>Price: ${adminData.name}</p>
                        <p>Availability: {adminData.username}</p>
                        <p>Ticket ID: {adminData.password}</p>
                        <p>Ticket Type: {adminData.role}</p>
                    </div>
                    <div>
                        {/*<Button label="Edit" className="p-button-raised p-button-info p-mr-2" onClick={() => navigate(`/editticket/${ticketData.ticketID}`)} />*/}
                        <button onClick={handleDelete} />
                    </div>
                    </div>
                // </Card>
            ) : (
                <p>Loading admin data...</p>
            )}
        </div>
    );
};

export default AdminSpecific;