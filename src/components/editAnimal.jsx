import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";

const EditAnimal = () => {
    const navigate = useNavigate();
    const { animalId } = useParams();
    const [animalData, setAnimalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editedAnimalData, setEditedAnimalData] = useState({
        name: '',
        animalSpeciesName: '',
        enclosureId: '',
        birthDate: new Date()
    });
    const [animalSpecies, setAnimalSpecies] = useState([]);
    const [selectedAnimalSpeciesId, setSelectedAnimalSpeciesId] = useState('');
    const [selectedAnimalSpeciesName, setSelectedAnimalSpeciesName] = useState('');
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

                setEditedAnimalData({
                    animalId: data.animalId,
                    animalSpeciesId: data.animalSpeciesId,
                    animalSpeciesName: data.animalSpeciesName,
                    name: data.name,
                    enclosureId: data.enclosureId,
                    birthDate: new Date(data.birthDate),
                    birthCountry: data.birthCountry,
                    description: data.description,
                });
                setSelectedAnimalSpeciesId(data.animalSpeciesId)
            } catch (error) {
                console.error('Error fetching Animal data:', error);
                setErrorMessage(error.message);
                setShowErrorDialog(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalData();

        const fetchSpecies = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/animalspecies');
                if (!response.ok) {
                    throw new Error('Failed to fetch animal species');
                }
                const data = await response.json();
                setAnimalSpecies(data);
            } catch (error) {
                console.error('Error fetching species:', error);
                setErrorMessage('Failed to fetch species data.');
                setShowErrorDialog(true);
            }
        };

        fetchSpecies();
    }, [animalId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name == "birthdate"){
            const date = new Date(value);
            const formattedDate = date.toISOString().split('T')[0];
            setEditedAnimalData({
                ...editedAnimalData,
                birthDate: formattedDate
            });
        }else{
            setEditedAnimalData(prevData => ({
                ...prevData,
                [name]: value
            }));}
    };

    // const isFormValid = () => {
    //     return (
    //         editedAnimalData.animalId &&
    //         selectedAnimalSpeciesId,
    //         selectedAnimalSpeciesName,
    //         editedAnimalData.name &&
    //         selectedAnimalSpeciesId &&
    //         editedAnimalData.enclosureId &&
    //         editedAnimalData.birthDate &&
    //         editedAnimalData.birthCountry &&
    //         editedAnimalData.description
    //     );
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!isFormValid()) {
        //     setErrorMessage('Please fill in all fields.');
        //     setShowErrorDialog(true);
        //     return;
        // }
        try {
            if (!animalData) {
                throw new Error('Animal data is not available');
            }
            const response = await fetch(`http://localhost:8080/api/v1/animal/updatebyanimalid/${animalData.animalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animalSpeciesId: selectedAnimalSpeciesId,
                    animalSpeciesName: selectedAnimalSpeciesName,
                    name: editedAnimalData.name,
                    enclosureId: editedAnimalData.enclosureId,
                    birthDate: editedAnimalData.birthDate,
                    birthCountry: editedAnimalData.birthCountry,
                    description: editedAnimalData.description,
                }),
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

    const handleDropdownChange = (e) => {
        const { value } = e.target;
        const selectedSpecies = animalSpecies.find(species => species.animalSpeciesId === value);
        setSelectedAnimalSpeciesId(selectedSpecies.animalSpeciesId);
        setSelectedAnimalSpeciesName(selectedSpecies.animalSpeciesName);
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
                                <Dropdown
                                    value={selectedAnimalSpeciesId}
                                    options={animalSpecies.map(species => ({
                                        label: species.animalSpeciesName,
                                        value: species.animalSpeciesId
                                    }))}
                                    onChange={handleDropdownChange}
                                    placeholder="Select an Animal Species"
                                    className="zoo-dropdown"
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
                                <Calendar
                                    id="birthdate"
                                    name="birthdate"
                                    value={editedAnimalData.birthDate}
                                    onChange={handleInputChange}
                                    dateFormat="yy-mm-dd"
                                    className="zoo-input"
                                    required
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