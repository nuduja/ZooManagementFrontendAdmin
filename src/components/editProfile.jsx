import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import '../styles/editProfile.css'; 

const EditProfile = () => {
    let navigate = useNavigate();

    const items = [
        { label: 'Profile', icon: 'pi pi-palette', url: '/profile' },
        { label: 'Booked Events', icon: 'pi pi-link', url: '/profile/event' },
        { label: 'Booked Tickets', icon: 'pi pi-home', url: '/ticketprofile' }
    ];

    const [userDetails, setUserDetails] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const loggedUsername = sessionStorage.getItem('loggedUserDetails');
            try {
                const response = await fetch(`http://localhost:8080/admin/${loggedUsername}`);
                const data = await response.json();
                setUserDetails(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement the logic to submit the form data
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
                            <label htmlFor="phone">Phone</label>
                            <InputText
                                id="phone"
                                value={userDetails.phone}
                                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                                className="p-inputtext-lg"
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="email">E-mail</label>
                            <InputText
                                id="email"
                                type="email"
                                value={userDetails.email}
                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
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
