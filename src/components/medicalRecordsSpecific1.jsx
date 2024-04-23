import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Add useParams
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import '../styles/MedicalRecordSpecific.css';

const MedicalRecordSpecific = () => {
    const navigate = useNavigate(); // Import useNavigate
    const { medicalRecordId } = useParams(); // Retrieve animalId from URL parameters
    const [recordData, setRecordData] = useState([]);
    const [loading, setLoading] = useState(true);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        spinner: {
            width: '50px',
            height: '50px',
        },
        card: {
            width: '400px',
            marginBottom: '20px', // Add margin between cards
        },
        grid: {
            padding: '8px',
        },
        column: {
            marginBottom: '8px',
        },
        buttonGroup: {
            marginTop: '8px',
        },
    };

    useEffect(() => {
        const fetchRecordData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/medicalRecord/${medicalRecordId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecordData(data);
            } catch (error) {
                console.error('Error fetching Medical Record data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecordData();
    }, [medicalRecordId]);

    const handleDelete = async (recordId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/medicalRecord/${medicalRecordId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Medical Record');
            }
            // After deleting, refetch the data to update the UI
            fetchRecordData();
        } catch (error) {
            console.error('Error deleting Medical Record:', error);
        }
    };

    const handleEdit = (medicalRecordId) => {
        navigate(`/medicalrecord/edit/${medicalRecordId}`); // Navigate to editmedicalrecords page with medicalRecordId
    };

    return (
        <div style={styles.container}>
            <h1>Medical Record Details</h1>
            {loading ? (
                <ProgressSpinner style={styles.spinner} />
            ) : (
                recordData.map(record => (
                    <Card key={record.id} style={styles.card} className="p-mb-2">
                        <div style={styles.grid}>
                            <div style={styles.column}>
                                <strong>ID:</strong> {record.id}
                            </div>
                            <div style={styles.column}>
                                <strong>Medical Record ID:</strong> {record.medicalRecordId}
                            </div>
                            <div style={styles.column}>
                                <strong>Animal ID:</strong> {record.animalId}
                            </div>
                            <div style={styles.column}>
                                <strong>Record Date:</strong> {record.recordDate}
                            </div>
                            <div style={styles.column}>
                                <strong>Description:</strong> {record.description}
                            </div>
                            <div style={styles.buttonGroup}>
                                <Button label="Edit" icon="pi pi-pencil" className="p-button-primary p-mr-2" onClick={() => handleEdit(record.medicalRecordId)} />
                                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(record.id)} />
                            </div>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
};

export default MedicalRecordSpecific;
