import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

const EditAdmin = () => {
    const navigate = useNavigate();
    const { adminId } = useParams();
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedAdminData, setEditedAdminData] = useState({
        name: '',
        username: '',
    });
    const [showDialog, setShowDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        header: {
            marginBottom: '1rem',
        },
        formContainer: {
            width: '100%',
            maxWidth: '400px',
        },
        field: {
            marginBottom: '1rem',
        },
        button: {
            marginTop: '1rem',
        },
        errorMessage: {
            color: 'red',
            marginBottom: '1rem',
        },
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/${adminId}`);
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
                setErrorMessage('Failed to fetch Admin data');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [adminId]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAdminData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Validate name
        if (name === 'name') {
            if (!value.trim()) {
                setNameError('Name is required');
            } else {
                setNameError('');
            }
        }

        // Validate username
        if (name === 'username') {
            if (!value.trim()) {
                setUsernameError('Username is required');
            } else {
                setUsernameError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add form-level validation here if needed
        // For example, checking if all fields are filled

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
        navigate(-1);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Edit Admin Details</h1>
            {loading ? (
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            ) : (
                <div style={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.field}>
                            <label htmlFor="name">Name:</label>
                            <InputText
                                id="name"
                                name="name"
                                value={editedAdminData.name}
                                onChange={handleInputChange}
                                className={nameError ? 'p-invalid' : ''}
                            />
                            <small style={{ color: 'red' }}>{nameError}</small>
                        </div>
                        <div style={styles.field}>
                            <label htmlFor="username">Username:</label>
                            <InputText
                                id="username"
                                name="username"
                                value={editedAdminData.username}
                                onChange={handleInputChange}
                                className={usernameError ? 'p-invalid' : ''}
                            />
                            <small style={{ color: 'red' }}>{usernameError}</small>
                        </div>
                        <Button type="submit" label="Update" className="p-button-success" style={styles.button} />
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
                        <div style={styles.errorMessage}>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EditAdmin;
