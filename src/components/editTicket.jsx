import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import {Calendar} from "primereact/calendar";

const TicketSpecific = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editedTicketData, setEditedTicketData] = useState({
        ticketType: '',
        ticketDate: new Date(),
        status: '',
        price: ''
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const ticketTypes = ['LOCAL_ADULT', 'LOCAL_KID', 'FOREIGN_ADULT', 'FOREIGN_KID'];

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
        const fetchTicketData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/ticket/${ticketId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTicketData(data);
                setEditedTicketData({
                    ticketType: data.ticketType,
                    ticketDate: new Date(data.ticketDate),
                    status: data.status,
                    price: data.price.toString()
                });
            } catch (error) {
                console.error('Error fetching Ticket data:', error);
                setErrorMsg('Failed to fetch Ticket data');
                setShowErrorDialog(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTicketData();
    }, [ticketId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name == null){
            const date = new Date(value);
            const formattedDate = date.toISOString().split('T')[0];
            setEditedTicketData({
                ...editedTicketData,
                ticketDate: formattedDate
            });
        }else{
        setEditedTicketData(prevData => ({
            ...prevData,
            [name]: value
        }));}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/ticket/updatebyticketid/${ticketId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTicketData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update Ticket data');
            }

            setSuccessMsg('Ticket data updated successfully');
            setErrorMsg('');
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Error updating Ticket data:', error);
            setErrorMsg(error.message || 'Failed to update Ticket data');
            setShowErrorDialog(true);
            setSuccessMsg('');
        }
    };

    const onHideDialog = () => {
        setShowSuccessDialog(false);
        setShowErrorDialog(false);
        navigate(-1);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Ticket Specific data</h1>
            {loading ? (
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            ) : 
             (
                <div style={styles.formContainer}>
                    <h2>Edit Ticket Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.field}>
                            <label htmlFor="ticketType">Ticket Type:</label>
                            <Dropdown
                                id="ticketType"
                                name="ticketType"
                                value={editedTicketData.ticketType}
                                options={ticketTypes}
                                onChange={handleInputChange}
                                placeholder="Select a Ticket Type"
                            />
                        </div>
                        <div style={styles.field}>
                            <label htmlFor="ticketDate">Ticket Date:</label>
                            <Calendar
                                value={editedTicketData.ticketDate}
                                onChange={handleInputChange}
                                dateFormat="yy-mm-dd"
                                className="zoo-input"
                                required
                            />
                        </div>
                        <div style={styles.field}>
                            <label htmlFor="status">Status:</label>
                            <InputText
                                id="status"
                                name="status"
                                value={editedTicketData.status}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={styles.field}>
                            <label htmlFor="price">Price:</label>
                            <InputText
                                id="price"
                                name="price"
                                value={editedTicketData.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button type="submit" label="Update" className="p-button-success" style={styles.button} />
                    </form>

                    <Dialog
                        visible={showSuccessDialog}
                        onHide={onHideDialog}
                        header="Success"
                        className="custom-dialog"
                        footer={<Button label="OK" onClick={onHideDialog} />}
                    >
                        <p>Ticket data updated successfully!</p>
                    </Dialog>

                    <Dialog
                        visible={showErrorDialog}
                        onHide={onHideDialog}
                        header="Error"
                        className="custom-dialog"
                        footer={<Button label="OK" onClick={onHideDialog} />}
                    >
                        <p>{errorMsg}</p>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default TicketSpecific;
