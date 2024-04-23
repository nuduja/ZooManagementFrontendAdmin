import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const EditMedicalRecord = () => {
    const navigate = useNavigate();
    const { medicalRecordId } = useParams();
    const [recordData, setRecordData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editedRecordData, setEditedRecordData] = useState({
        animalId: '',
        recordDate: new Date(),
        description: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const styles = {
        container: {
            display: 'grid',
            justifyContent: 'center',
        },
        card: {
            marginTop: '1.5rem',
            width: '100%',
            padding: '1rem',
        },
        inputGroup: {
            marginBottom: '1rem',
        },
        dialog: {
            className: 'custom-dialog',
        },
    };

    useEffect(() => {
        const fetchRecordData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/medicalRecord/${medicalRecordId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch Medical Record data: ${response.statusText}`);
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('Empty response from server');
                }
                setRecordData(data);

                setEditedRecordData({
                    animalId: data.animalId,
                    recordDate: new Date(data.recordDate),
                    description: data.description,
                });
            } catch (error) {
                console.error('Error fetching Medical Record data:', error);
                setErrorMessage(error.message);
                setShowErrorDialog(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRecordData();
    }, [medicalRecordId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRecordData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!recordData) {
                throw new Error('Medical Record data is not available');
            }
            const response = await fetch(`http://localhost:8080/api/v1/medicalRecord/updatebymedicalrecordid/${medicalRecordId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animalId: editedRecordData.animalId,
                    recordDate: editedRecordData.recordDate,
                    description: editedRecordData.description,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update Medical Record data');
            }
            setSuccessMessage('Medical Record data updated successfully');
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Error updating Medical Record data:', error);
            setErrorMessage('Failed to update Medical Record data');
            setShowErrorDialog(true);
        }
    };

    const onHideDialog = () => {
        setShowSuccessDialog(false);
        setShowErrorDialog(false);
        navigate(-1);
    };

    return (
        <div style={styles.container}>
            <div className="p-col-10">
                <Card title="Edit Medical Record Data" style={styles.card}>
                    {loading ? (
                        <p>Loading medical record data...</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={styles.inputGroup}>
                                <label htmlFor="animalId">Animal ID:</label>
                                <InputText
                                    id="animalId"
                                    name="animalId"
                                    value={editedRecordData.animalId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label htmlFor="recordDate">Record Date:</label>
                                <Calendar
                                    id="recordDate"
                                    name="recordDate"
                                    value={editedRecordData.recordDate}
                                    onChange={handleInputChange}
                                    dateFormat="yy-mm-dd"
                                    className="zoo-input"
                                    required
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label htmlFor="description">Description:</label>
                                <InputText
                                    id="description"
                                    name="description"
                                    value={editedRecordData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button type="submit" label="Update" className="p-button-success" />
                            <Dialog
                                visible={showSuccessDialog}
                                onHide={onHideDialog}
                                header="Success"
                                style={styles.dialog}
                                footer={<Button label="OK" onClick={onHideDialog} />}
                            >
                                <p>{successMessage}</p>
                            </Dialog>
                            <Dialog
                                visible={showErrorDialog}
                                onHide={onHideDialog}
                                header="Error"
                                style={styles.dialog}
                                footer={<Button label="OK" onClick={onHideDialog} />}
                            >
                                <p>{errorMessage}</p>
                            </Dialog>
                        </form>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default EditMedicalRecord;
