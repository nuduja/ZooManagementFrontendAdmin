import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Menu } from 'primereact/menu';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar'; // Import Avatar component
import { useNavigate } from 'react-router-dom';
// import { deleteUser } from '../hooks/deleteUserHook';
import '../styles/profile.css';

const Profile = () => {
    let navigate = useNavigate();

    // Menu items
    // const items = [
    //     { label: 'Profile', icon: 'pi pi-palette', url: '/profile' },
    //     { label: 'Booked Events', icon: 'pi pi-link', url: '/profile/event' },
    //     { label: 'Booked Tickets', icon: 'pi pi-home', url: '/ticketprofile' }
    // ];

    // State for user details
    const [userDetails, setUserDetails] = useState({
        name: '',
        username: '',
        password: ''
    });

    // State for error
    const [error, setError] = useState(null);

    // State for right sidebar
    // const [showRightSidebar, setShowRightSidebar] = useState(false);
    // const [rightSidebarContent, setRightSidebarContent] = useState(null);

    // Fetch user data
    useEffect(() => {
        const fetchData = async (username) => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/${username}`);
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

        const loggedUsername = sessionStorage.getItem('loggedUserDetails');
        fetchData(loggedUsername);
    }, []);

    // Handle delete user
    const handleDelete = async (e) => {
        e.preventDefault();
        deleteUser(userDetails.username);
        navigate('/');
    };

    return (
        <div className="main-container">
            {/* <div className="left-sidebar">
                <Menu model={items} />
            </div> */}
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
            {/* {showRightSidebar && (
                <div className="right-sidebar">
                    Booked Tickets details */}
                    {/* Display rightSidebarContent */}
                    {/* {rightSidebarContent} */}
                {/* </div> */}
            {/* // )} */}
        </div>
    );
};

export default Profile;
