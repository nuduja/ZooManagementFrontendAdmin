import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
// import '../styles/animalSpecific.css';

const AnimalSpecific = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const [animalData, setAnimalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

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
                setErrorMessage('Failed to fetch Animal data.');
            } finally {
                setLoading(false);
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
            setErrorMessage('Failed to delete Animal. Please try again.');
        }
    };

    const handleEdit = () => {
        navigate(`/animalEdit/${name}`);
    };

    return (
        <div className="p-grid p-justify-center">
            <div className="p-col-10">
                <Card title="Animal Specific Data" className="p-card p-mt-4">
                    {loading && <p>Loading animal data...</p>}
                    {errorMessage && <Message severity="error" text={errorMessage} />}
                    {animalData && (
                        <div>
                            <div>
                                <p><strong>ID:</strong> {animalData.id}</p>
                                <p><strong>Animal Species ID:</strong> {animalData.animalSpeciesId}</p>
                                <p><strong>Animal Species Name:</strong> {animalData.animalSpeciesName}</p>
                                <p><strong>Name:</strong> {animalData.name}</p>
                                <p><strong>Enclosure ID:</strong> {animalData.enclosureId}</p>
                                <p><strong>Birth Date:</strong> {animalData.birthDate}</p>
                                <p><strong>Birth Country:</strong> {animalData.birthCountry}</p>
                            </div>
                            <div className="p-d-flex p-jc-end">
                                <Button label="Edit" className="p-button-primary p-mr-2" onClick={handleEdit} />
                                <Button label="Delete" className="p-button-danger" onClick={handleDelete} />
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default AnimalSpecific;
