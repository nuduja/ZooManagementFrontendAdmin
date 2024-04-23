import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const MedicalRecordSpecific = () => {
    const navigate = useNavigate();
    const { medicalRecordId } = useParams();
    const [recordData, setRecordData] = useState(null);
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
                const response = await fetch(`http://localhost:8080/api/v1/medicalrecord/byAnimalId${animalId}`);
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
    }, [animalId]);

    const handleDelete = async (recordId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/medicalrecord/${recordId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Medical Record');
            }
            navigate(-1);
        } catch (error) {
            console.error('Error deleting Medical Record:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/medicalrecord/edit/${medicalRecordId}`);
    };

    return (
        <div style={styles.container}>
            <h1>Medical Record Specific data</h1>
            {loading ? (
                <ProgressSpinner style={styles.spinner} />
            ) : (
                <Card style={styles.card} className="p-mb-2">
                    <div style={styles.grid}>
                        <div style={styles.column}>
                            <strong>ID:</strong> {recordData?.id}
                        </div>
                        <div style={styles.column}>
                            <strong>Medical Record ID:</strong> {recordData?.medicalRecordId}
                        </div>
                        <div style={styles.column}>
                            <strong>Animal ID:</strong> {recordData?.animalId}
                        </div>
                        <div style={styles.column}>
                            <strong>Record Date:</strong> {recordData?.recordDate}
                        </div>
                        <div style={styles.column}>
                            <strong>Description:</strong> {recordData?.description}
                        </div>
                        <div style={styles.buttonGroup}>
                            <Button label="Edit" icon="pi pi-pencil" className="p-button-primary p-mr-2" onClick={handleEdit} />
                            <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(recordData?.id)} />
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default MedicalRecordSpecific;
