import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const AnimalSpecific = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const [animalData, setAnimalData] = useState(null);

    useEffect(() => {
        const fetchAnimalData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/animal/${name}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimalData(data);
            } catch (error) {
                console.error('Error fetching Animal data:', error);
            }
        };

        fetchAnimalData();
    }, [name]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/animal/${name}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Animal');
            }
            navigate('/');
        } catch (error) {
            console.error('Error deleting Animal:', error);
        }
    };

    // Function to handle edit button click
    const handleEdit = () => {
        navigate(`/animalEdit/${name}`);
    };

    return (
        <div className="p-grid p-justify-center">
            <div className="p-col-10">
                <Card title="Animal Specific Data" className="p-card p-mt-4">
                    {animalData ? (
                        <div>
                            <div>
                                <p><strong>ID:</strong> {animalData.id}</p>
                                <p><strong>Animal Specific ID:</strong> {animalData.animalSpecificId}</p>
                                <p><strong>Animal Species Name:</strong> {animalData.animalSpeciesName}</p>
                                <p><strong>Name:</strong> {animalData.name}</p>
                                <p><strong>Enclosure ID:</strong> {animalData.enclosureId}</p>
                                <p><strong>Age:</strong> {animalData.age}</p>
                            </div>
                            <div className="p-d-flex p-jc-end">
                                {/* Edit button */}
                                <Button label="Edit" className="p-button-primary p-mr-2" onClick={handleEdit} />
                                {/* Delete button */}
                                <Button label="Delete" className="p-button-danger" onClick={handleDelete} />
                            </div>
                        </div>
                    ) : (
                        <p>Loading animal data...</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default AnimalSpecific;
