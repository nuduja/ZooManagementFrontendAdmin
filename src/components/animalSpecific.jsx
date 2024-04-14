import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AnimalSpecific = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const [animalData, setAnimalData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/animal/${name}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimalData(data);
            } catch (error) {
                console.error('Error fetching Animal data:', error);
            }
        };

        fetchAdminData();
    }, [name]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/admin/${name}`, {
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

    return (
        <div>
            <h1>Admin Specif data</h1>
            {name}
            {animalData ? (
                // <Card title="Admin Specific Details" className="ticket-card">
                <div>
                    <div>
                        <p>ID: {animalData.id}</p>
                        <p>animalSpecificId: ${animalData.animalSpecificId}</p>
                        <p>animalSpeciesName: {animalData.animalSpeciesName}</p>
                        <p>name ID: {animalData.name}</p>
                        <p>enclosureId Type: {animalData.enclosureId}</p>
                        <p>age: {animalData.age}</p>
                    </div>
                    <div>
                        {/*<Button label="Edit" className="p-button-raised p-button-info p-mr-2" onClick={() => navigate(`/editticket/${ticketData.ticketID}`)} />*/}
                        <button onClick={handleDelete} />
                    </div>
                    </div>
                // </Card>
            ) : (
                <p>Loading admin data...</p>
            )}
        </div>
    );
};

export default AnimalSpecific;