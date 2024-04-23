import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import '../styles/editAnimalSpeciesSpecific.css'; 

const EditAnimalSpeciesSpecific = () => {
    const navigate = useNavigate();
    const { animalSpeciesId } = useParams();
    const [animalSpeciesData, setAnimalSpeciesData] = useState(null);
    const [editedAnimalSpeciesData, setEditedAnimalSpeciesData] = useState({
        id: '',
        animalSpeciesId: '',
        animalSpeciesName: '',
        taxonomy_kingdom: '',
        taxonomy_scientific_name: '',
        characteristics_group_behavior: '',
        characteristics_diet: '',
        characteristics_skin_type: '',
        characteristics_top_speed: '',
        characteristics_lifespan: '',
        characteristics_weight: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    useEffect(() => {
        const fetchAnimalSpeciesData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/animalspecies/animalSpeciesId/${animalSpeciesId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimalSpeciesData(data);
                setEditedAnimalSpeciesData(data); 
            } catch (error) {
                console.error('Error fetching AnimalSpecies data:', error);
                setErrorMessage('Failed to fetch AnimalSpecies data');
                setShowErrorDialog(true);
            }
        };

        fetchAnimalSpeciesData();
    }, [animalSpeciesId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAnimalSpeciesData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !editedAnimalSpeciesData.animalSpeciesName ||
            !editedAnimalSpeciesData.taxonomy_kingdom ||
            !editedAnimalSpeciesData.taxonomy_scientific_name ||
            !editedAnimalSpeciesData.characteristics_group_behavior ||
            !editedAnimalSpeciesData.characteristics_diet ||
            !editedAnimalSpeciesData.characteristics_skin_type ||
            !editedAnimalSpeciesData.characteristics_top_speed ||
            !editedAnimalSpeciesData.characteristics_lifespan ||
            !editedAnimalSpeciesData.characteristics_weight
        ) {
            setErrorMessage('Please fill in all fields.');
            setShowErrorDialog(true);
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/v1/animalspecies/updatebyanimalspeciesid/${animalSpeciesId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedAnimalSpeciesData),
            });
            if (!response.ok) {
                throw new Error('Failed to update AnimalSpecies');
            }
            setSuccessMessage('AnimalSpecies data updated successfully');
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Error updating AnimalSpecies data:', error);
            setErrorMessage('Failed to update AnimalSpecies data');
            setShowErrorDialog(true);
        }
    };

    const onHideDialog = () => {
        setShowSuccessDialog(false);
        setShowErrorDialog(false);
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="edit-animal-species-container">
            <h1>Edit Animal Species Data</h1>
            
            {animalSpeciesData ? (
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="animalSpeciesId">Animal Species ID:</label>
                        <InputText
                            id="animalSpeciesId"
                            name="animalSpeciesId"
                            value={editedAnimalSpeciesData.animalSpeciesId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="animalSpeciesName">Name:</label>
                        <InputText
                            id="animalSpeciesName"
                            name="animalSpeciesName"
                            value={editedAnimalSpeciesData.animalSpeciesName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="taxonomy_kingdom">Taxonomy Kingdom:</label>
                        <InputText
                            id="taxonomy_kingdom"
                            name="taxonomy_kingdom"
                            value={editedAnimalSpeciesData.taxonomy_kingdom}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="taxonomy_scientific_name">Taxonomy Scientific Name:</label>
                        <InputText
                            id="taxonomy_scientific_name"
                            name="taxonomy_scientific_name"
                            value={editedAnimalSpeciesData.taxonomy_scientific_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="characteristics_group_behavior">Group Behavior:</label>
                        <InputText
                            id="characteristics_group_behavior"
                            name="characteristics_group_behavior"
                            value={editedAnimalSpeciesData.characteristics_group_behavior}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="characteristics_diet">Diet:</label>
                        <InputText
                            id="characteristics_diet"
                            name="characteristics_diet"
                            value={editedAnimalSpeciesData.characteristics_diet}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="characteristics_skin_type">Skin Type:</label>
                        <InputText
                            id="characteristics_skin_type"
                            name="characteristics_skin_type"
                            value={editedAnimalSpeciesData.characteristics_skin_type}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="characteristics_top_speed">Top Speed:</label>
                        <InputText
                            id="characteristics_top_speed"
                            name="characteristics_top_speed"
                            value={editedAnimalSpeciesData.characteristics_top_speed}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="characteristics_lifespan">Lifespan:</label>
                        <InputText
                            id="characteristics_lifespan"
                            name="characteristics_lifespan"
                            value={editedAnimalSpeciesData.characteristics_lifespan}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="characteristics_weight">Weight:</label>
                        <InputText
                            id="characteristics_weight"
                            name="characteristics_weight"
                            value={editedAnimalSpeciesData.characteristics_weight}
                            onChange={handleInputChange}
                        />
                    </div>

                    <Button type="submit" label="Update" className="p-button-success" />
                </form>
            ) : (
                <p>Loading Animal Species data...</p>
            )}

            <Dialog
                visible={showSuccessDialog}
                onHide={onHideDialog}
                header="Success"
                className="custom-dialog"
                footer={<Button label="OK" onClick={onHideDialog} />}
            >
                <p>AnimalSpecies data updated successfully!</p>
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
    );
};

export default EditAnimalSpeciesSpecific;
