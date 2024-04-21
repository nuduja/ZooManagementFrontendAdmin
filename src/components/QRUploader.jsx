import React, { useState } from 'react';
import QrCode from 'qrcode-reader';
import axios from 'axios';
import { FileUpload } from 'primereact/fileupload';
import '../styles/QRUploader.css'; // Import the CSS file

const QRUploader = () => {
    const [animal, setAnimal] = useState(null);
    const [error, setError] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.files[0];
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
        <div className="qr-uploader-container">
            <h2>Upload the QR code to see Animal Details</h2>
            <FileUpload mode="basic" accept="image/*" customUpload={true} uploadHandler={handleFileUpload} />
            {animal && <div className="animal-details">
                <h3 className="qr-uploader-title">Animal Details</h3>
                <p>ID: {animal.id}</p>
                <p>Animal ID: {animal.animalId}</p>
                <p>Animal Species ID: {animal.animalSpeciesId}</p>
                <p>Animal Species Name: {animal.animalSpeciesName}</p>
                <p>Name: {animal.name}</p>
                <p>Enclosure ID: {animal.enclosureId}</p>
                <p>Birth Date: {animal.birthDate}</p>
                <p>Birth Country: {animal.birthCountry}</p>
                <p>Description: {animal.description}</p>
            </div>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default QRUploader;
