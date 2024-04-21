import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';

const EditAnimal = () => {
    const navigate = useNavigate();
    const { animalId } = useParams();
    const [animalData, setAnimalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editedAnimalData, setEditedAnimalData] = useState({
        name: '',
        animalSpeciesName: '',
        enclosureId: '',
        birthDate: ''
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
        const fetchAnimalData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/animal/${animalId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch Animal data: ${response.statusText}`);
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('Empty response from server');
                }
                setAnimalData(data);
                setEditedAnimalData(data);
            } catch (error) {
                console.error('Error fetching Animal data:', error);
                setErrorMessage(error.message);
                setShowErrorDialog(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalData();
    }, [animalId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAnimalData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!animalData) {
                throw new Error('Animal data is not available');
            }
            const response = await fetch(`http://localhost:8080/api/v1/animal/updatebyanimalid/${animalData.animalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedAnimalData),
            });
            if (!response.ok) {
                throw new Error('Failed to update Animal data');
            }
            setSuccessMessage('Animal data updated successfully');
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Error updating Animal data:', error);
            setErrorMessage('Failed to update Animal data');
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
                <Card title="Edit Animal Data" style={styles.card}>
                    {loading ? (
                        <p>Loading animal data...</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={styles.inputGroup}>
                                <label htmlFor="name">Name:</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={editedAnimalData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label htmlFor="animalSpeciesName">Animal Species Name:</label>
                                <InputText
                                    id="animalSpeciesName"
                                    name="animalSpeciesName"
                                    value={editedAnimalData.animalSpeciesName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label htmlFor="enclosureId">Enclosure ID:</label>
                                <InputText
                                    id="enclosureId"
                                    name="enclosureId"
                                    value={editedAnimalData.enclosureId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label htmlFor="age">Birth Date:</label>
                                <InputText
                                    id="age"
                                    name="age"
                                    value={editedAnimalData.birthDate}
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

export default EditAnimal;
