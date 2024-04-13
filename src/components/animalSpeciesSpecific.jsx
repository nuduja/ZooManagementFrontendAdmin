import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AnimalSpeciesSpecific = () => {
    const navigate = useNavigate();
    const { animalSpeciesId } = useParams();
    const [animalSpeciesData, setAnimalSpeciesData] = useState(null);

    useEffect(() => {
        const fetchAnimalSpeciesData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/animalspecies/animalSpeciesId/${animalSpeciesId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimalSpeciesData(data);
            } catch (error) {
                console.error('Error fetching AnimalSpecies data:', error);
            }
        };

        fetchAnimalSpeciesData();
    }, [name]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/animalspecies/animalSpeciesId/${animalSpeciesId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete AnimalSpecies');
            }
            navigate('/');
        } catch (error) {
            console.error('Error deleting AnimalSpecies:', error);
        }
    };

    return (
        <div>
            <h1>Animal Species Specific data</h1>
            {animalSpeciesData ? (
                // <Card title="Admin Specific Details" className="ticket-card">
                <div>
                    <div>
                        <p>ID: {animalSpeciesData.id}</p>
                        <p>animalId: ${animalSpeciesData.animalSpeciesId}</p>
                        <p>name: {animalSpeciesData.animalSpeciesName}</p>
                        <p>taxonomy_kingdom: {animalSpeciesData.taxonomy_kingdom}</p>
                        <p>taxonomy_scientific_name Type: {animalSpeciesData.taxonomy_scientific_name}</p>
                    </div>
                    <div>
                        {/*<Button label="Edit" className="p-button-raised p-button-info p-mr-2" onClick={() => navigate(`/editticket/${ticketData.ticketID}`)} />*/}
                        <button onClick={handleDelete} />
                    </div>
                    </div>
                // </Card>
            ) : (
                <p>Loading AnimalSpecies data...</p>
            )}
        </div>
    );
};

export default AnimalSpeciesSpecific;