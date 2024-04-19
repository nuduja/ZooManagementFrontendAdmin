import React, { useState } from 'react';
import QrCode from 'qrcode-reader';
import axios from 'axios';

const QRUploader = () => {
    const [animal, setAnimal] = useState(null);
    const [error, setError] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const buffer = event.target.result;
            const qr = new QrCode();
            qr.callback = (err, value) => {
                if (err) {
                    setError('Failed to decode QR code');
                    return;
                }
                fetchAnimalDetails(value.result);
            };
            qr.decode(buffer);
        };

        reader.readAsDataURL(file);
    };

    const fetchAnimalDetails = (animalId) => {
        axios.get(`http://localhost:8080/api/v1/animal/${animalId}`)
            .then(response => setAnimal(response.data))
            .catch(error => setError('Animal not found or server error'));
    };

    return (
        <div>
            <input type="file" onChange={handleFile} accept="image/*" />
            {animal && <div>
                <h3>Animal Details</h3>
                <p>Name: {animal.name}</p>
                <p>Species: {animal.species}</p>
                {/* Display other animal properties as needed */}
            </div>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default QRUploader;
