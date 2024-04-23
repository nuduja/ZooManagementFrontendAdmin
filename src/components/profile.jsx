import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
    let navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        adminId: '',
        name: '',
        username: '',
    });

    const [loggedUserId, setLoggedUserId] = useState('');
    const [error, setError] = useState(null);
    const [errorDialogVisible, setErrorDialogVisible] = useState(false);
    const [successDialogVisible, setSuccessDialogVisible] = useState(false);

    useEffect(() => {
        const fetchData = async (loggedUserId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/${loggedUserId}`);
                const data = await response.json();
                setUserDetails({
                    userId: data.name || '',
                    name: data.name || '',
                    username: data.username || '',
                });
            } catch (err) {
                setError(err.message);
                setErrorDialogVisible(true);
            }
        };

        const loggedUserId = sessionStorage.getItem('userId');
        setLoggedUserId(loggedUserId);
        fetchData(loggedUserId);
    }, []);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/${loggedUserId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Admin data');
            }

            setSuccessDialogVisible(true);
            navigate(-1);
        } catch (error) {
            console.error('Error deleting profile:', error);
            setError('Failed to delete');
            setErrorDialogVisible(true);
        }
    };

    const handleResetPassword = async () => {
        // Implement the logic to reset the user's password here
        // For example, you can send a request to the backend to reset the password
    };

    return (
        <div className="main-container1">
            <div className="profile-section">
                <Divider />
                <Card title={<Avatar label={userDetails.name.charAt(0)} style={{ width: '100px', height: '100px', fontSize: '50px'}} />} className="profile-card">
                    {error && <p className="error-message">Error: {error}</p>}
                    <div className="profile-details">
                        <p><span className="profile-label">Name:</span> {userDetails.name}</p>
                        <p><span className="profile-label">Username:</span> {userDetails.username}</p>
                    </div>
                </Card>
                <div className="profile-buttons">
                    <Button label="Edit" icon="pi pi-pencil" className="p-button-raised p-button-rounded p-button-primary" onClick={() => navigate('/editprofile')} />
                    <Button label="Delete Profile" icon="pi pi-trash" className="p-button-raised p-button-rounded p-button-danger" onClick={handleDelete} />
                    <Button label="Reset Password" icon="pi pi-refresh" className="p-button-raised p-button-rounded" onClick={handleResetPassword} />
                </div>
            </div>
        </div>
    );
};

export default Profile;