import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import '../styles/editCustomer.css';

const EditCustomer = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editedCustomerData, setEditedCustomerData] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
    });
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/user/${username}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCustomerData(data);
                setEditedCustomerData({
                    name: data.name,
                    username: data.username,
                    phone: data.phone,
                    email: data.email,
                });
            } catch (error) {
                console.error('Error fetching Customer data:', error);
                setErrorMessage('Failed to fetch Customer data');
                setShowErrorDialog(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [username]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/user/updatebyuserid/${customerData.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedCustomerData),
            });
            if (!response.ok) {
                throw new Error('Failed to update Customer data');
            }
            setSuccessMsg('Customer data updated successfully');
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Error updating Customer data:', error);
            setErrorMessage(error.message || 'Failed to update Customer data');
            setShowErrorDialog(true);
            setSuccessMsg('');
        }
    };

    const onHideDialog = () => {
        setShowSuccessDialog(false);
        setShowErrorDialog(false);
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
            <h1>Edit Customer Details</h1>
            {loading ? (
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            ) : (
                <div className="edit-profile-container">
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMsg && <div className="success-msg">{successMsg}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="p-field">
                            <label htmlFor="name">Name:</label>
                            <InputText
                                id="name"
                                name="name"
                                value={editedCustomerData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="username">Username:</label>
                            <InputText
                                id="username"
                                name="username"
                                value={editedCustomerData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="phone">Phone:</label>
                            <InputText
                                id="phone"
                                name="phone"
                                value={editedCustomerData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="email">Email:</label>
                            <InputText
                                id="email"
                                name="email"
                                value={editedCustomerData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button type="submit" label="Update" className="p-button-success" />
                    </form>

                    <Dialog
                        visible={showSuccessDialog}
                        onHide={onHideDialog}
                        header="Success"
                        className="custom-dialog"
                        footer={<Button label="OK" onClick={onHideDialog} />}
                    >
                        <p>Customer data updated successfully!</p>
                    </Dialog>

                    <Dialog
                        visible={showErrorDialog}
                        onHide={onHideDialog}
                        header="Error"
                        className="custom-dialog"
                        footer={<Button label="OK" onClick={onHideDialog} />}
                    >
                        <p>{errorMessage}</p>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default EditCustomer;
