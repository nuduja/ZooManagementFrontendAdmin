import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import '../styles/QRScanner.css'; // Import the CSS file

// Ensure the worker path is set correctly
QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

const QRScanner = () => {
    const videoRef = useRef(null);
    const [qrScanner, setQrScanner] = useState(null);
    const [animal, setAnimal] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (videoRef.current) {
            const scanner = new QrScanner(videoRef.current, (result) => {
                fetchAnimalDetails(result.data);
                scanner.stop();  // Stop scanning once a QR code is scanned
            }, (error) => {
                console.error(error);
                setError('Failed to scan QR code');
            });

            setQrScanner(scanner);

            scanner.start().catch(err => {
                console.error(err);
                setError('Unable to access the camera.');
            });

            return () => scanner.destroy();
        }
    }, []);

    const fetchAnimalDetails = (animalId) => {
        axios.get(`http://localhost:8080/api/v1/animal/${animalId}`)
            .then(response => {
                setAnimal(response.data);
                setShowPopup(true);
            })
            .catch(error => {
                console.error('Error fetching animal details:', error);
                setError('Animal not found or server error');
                setShowPopup(true);
            });
    };

    const handleClose = () => {
        setShowPopup(false);
        qrScanner.start().catch(err => console.error('Error restarting scanner:', err)); // Restart scanning
    };

    return (
        <div className="qr-scanner-container">
            <h2>Scan QR Code</h2>
            <video ref={videoRef} className="qr-video" />
            {error && <p className="error-message">{error}</p>}
            <Dialog visible={showPopup} onHide={handleClose} className="qr-popup-container">
                <h3>Animal Details</h3>
                {animal ? (
                    <>
                        <p>Name: {animal.name}</p>
                        <p>Species: {animal.species}</p>
                        {/* You can add more fields here as needed */}
                    </>
                ) : (
                    <p className="qr-popup">{error}</p>
                )}
                <Button label="Close" onClick={handleClose} />
            </Dialog>
            <div className="qr-popup-backdrop" style={{
                display: showPopup ? 'block' : 'none'
            }}></div>
        </div>
    );
};

export default QRScanner;
