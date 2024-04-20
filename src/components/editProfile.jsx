import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    let navigate = useNavigate();

    const items = [
        { label: 'Profile', icon: 'pi pi-palette', url: '/profile' },
        { label: 'Booked Events', icon: 'pi pi-link', url: '/profile/event' },
        { label: 'Booked Tickets', icon: 'pi pi-home', url: '/ticketprofile' }
    ];

    const [userDetails, setUserDetails] = useState({
        adminId: '',
        name: '',
        username: '',
        role: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async (loggedUserId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/${loggedUserId}`);
                const data = await response.json();
                setUserDetails({
                    adminId: data.adminId || '',
                    name: data.name || '',
                    username: data.username || '',
                    role: data.role || '',
                });
            } catch (err) {
                setError(err.message);
            }
        };

        const loggedUserId = sessionStorage.getItem('userId');
        console.log("loggedUserId", loggedUserId)
        fetchData(loggedUserId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/updatebyadminid/${userDetails.adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });
            if (!response.ok) {
                throw new Error('Failed to update Admin data');
            }
            setUserDetails(userDetails);
            setError(null)
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update');
        }
        setSubmitted(true);
    };

    return (
        <div className="edit-profile-container">
            <Menu model={items} />
            <div className="edit-profile-form">
                <Card title="Edit Your Profile" className="edit-profile-card">
                    {error && <Message severity="error" text={`Error: ${error}`} />}
                    <form className="p-fluid" onSubmit={handleSubmit}>
                        <div className="p-field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={userDetails.name}
                                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                className="p-inputtext-lg"
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="username">Username</label>
                            <InputText
                                id="username"
                                value={userDetails.username}
                                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                className="p-inputtext-lg"
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="role">Role</label>
                            <InputText
                                id="role"
                                value={userDetails.role}
                                onChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })}
                                className="p-inputtext-lg"
                            />
                        </div>
                        <div className="p-field">
                            <Button
                                label="Save"
                                type="submit"
                                className="p-button-rounded p-button-lg p-button-success"
                            />
                        </div>
                    </form>
                    {submitted && (
                        <Message severity="info" text="Profile updated successfully." />
                    )}
                </Card>
            </div>
        </div>
    );
};

export default EditProfile;