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
        name: '',
        username: '',
        password: ''
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async (loggedUserId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/${loggedUserId}`);
                const data = await response.json();
                setUserDetails({
                    name: data.name || '',
                    username: data.username || '',
                    password: data.password || ''
                });
            } catch (err) {
                setError(err.message);
            }
        };

        const loggedUserId = sessionStorage.getItem('userId');
        fetchData(loggedUserId);
    }, []);

    // Handle delete user
    const handleDelete = async (e) => {
        e.preventDefault();
        deleteUser(userDetails.username);
        navigate('/');
    };

    return (
        <div className="main-container">
            <div className="profile-section">
                <Divider />
                <Card title={<Avatar label={userDetails.name.charAt(0)} style={{ width: '100px', height: '100px', fontSize: '50px'}} />} className="profile-card"> {/* Avatar component */}
                    {error && <p className="error-message">Error: {error}</p>}
                    <div className="profile-details">
                        <p><span className="profile-label">Name:</span> {userDetails.name}</p>
                        <p><span className="profile-label">Username:</span> {userDetails.username}</p>
                    </div>
                </Card>
                <div className="profile-buttons">
                    <Button label="Edit" icon="pi pi-pencil" className="p-button-raised p-button-rounded p-button-primary" onClick={() => navigate('/editprofile')} />
                    <Button label="Delete Profile" icon="pi pi-trash" className="p-button-raised p-button-rounded p-button-danger" onClick={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default Profile;