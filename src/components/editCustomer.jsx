import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

const EditCustomer = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
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
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

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
        successMessage: {
            color: 'green',
            marginBottom: '1rem',
        },
    };

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/user/${userId}`);
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
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Validate phone
        if (name === 'phone') {
            if (!/^\d{10}$/.test(value)) {
                setPhoneError('Phone number must be 10 digits');
            } else {
                setPhoneError('');
            }
        }

        // Validate email
        if (name === 'email') {
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                setEmailError('Invalid email address');
            } else {
                setEmailError('');
            }
        }
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
        <div style={styles.container}>
            <h1 style={styles.header}>Edit Customer Details</h1>
            {loading ? (
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            ) : (
                <div style={styles.formContainer}>
                    {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
                    {successMsg && <div style={styles.successMessage}>{successMsg}</div>}
                    <form onSubmit={handleSubmit}>
                        <div style={styles.field}>
                            <label htmlFor="name">Name:</label>
                            <InputText
                                id="name"
                                name="name"
                                value={editedCustomerData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={styles.field}>
                            <label htmlFor="username">Username:</label>
                            <InputText
                                id="username"
                                name="username"
                                value={editedCustomerData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={styles.field}>
                            <label htmlFor="phone">Phone:</label>
                            <InputText
                                id="phone"
                                name="phone"
                                value={editedCustomerData.phone}
                                onChange={handleInputChange}
                                className={phoneError ? 'p-invalid' : ''}
                            />
                            <small style={{ color: 'red' }}>{phoneError}</small>
                        </div>
                        <div style={styles.field}>
                            <label htmlFor="email">Email:</label>
                            <InputText
                                id="email"
                                name="email"
                                value={editedCustomerData.email}
                                onChange={handleInputChange}
                                className={emailError ? 'p-invalid' : ''}
                            />
                            <small style={{ color: 'red' }}>{emailError}</small>
                        </div>
                        <Button type="submit" label="Update" className="p-button-success" style={styles.button} disabled={phoneError || emailError} />
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
