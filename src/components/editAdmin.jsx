import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import '../styles/editAdmin.css';

const EditAdmin = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    // const { adminId } = useParams();
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedAdminData, setEditedAdminData] = useState({
        name: '',
        username: '',
      
    });
    const [showDialog, setShowDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/${username}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAdminData(data);
                setEditedAdminData({
                    name: data.name,
                    username: data.username,
                    
                });
            } catch (error) {
                console.error('Error fetching Admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [username]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAdminData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/updatebyadminid/${adminData.adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedAdminData),
            });
            if (!response.ok) {
                throw new Error('Failed to update Admin data');
            }
            setAdminData(editedAdminData);
            setEditing(false);
            setShowDialog(true);
        } catch (error) {
            console.error('Error updating Admin data:', error);
            setErrorMessage('Failed to update Admin data');
        }
    };

    const onHideDialog = () => {
        setShowDialog(false);
    };

    return (
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
            <h1>Edit Admin Details</h1>
            {loading ? (
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            ) : (
                <div className="edit-profile-container">
                    <form onSubmit={handleSubmit}>
                        <div className="p-field">
                            <label htmlFor="name">Name:</label>
                            <InputText
                                id="name"
                                name="name"
                                value={editedAdminData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="username">Username:</label>
                            <InputText
                                id="username"
                                name="username"
                                value={editedAdminData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button type="submit" label="Update" className="p-button-success" />
                    </form>

                    <Dialog
                        visible={showDialog}
                        onHide={onHideDialog}
                        header="Success"
                        className="custom-dialog"
                        footer={<Button label="OK" onClick={onHideDialog} />}
                    >
                        <p>Admin data updated successfully!</p>
                    </Dialog>

                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EditAdmin;
