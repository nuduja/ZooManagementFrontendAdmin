import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import axios from 'axios';

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
        <div>
            <h2>Scan QR Code</h2>
            <video ref={videoRef} style={{ width: '100%' }} />
            {error && <p>{error}</p>}
            {showPopup && (
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '25%',
                    width: '50%',
                    background: 'white',
                    border: '2px solid #000',
                    padding: '20px',
                    zIndex: '1000'
                }}>
                    <h3>Animal Details</h3>
                    {animal ? (
                        <>
                            <p>Name: {animal.name}</p>
                            <p>Species: {animal.species}</p>
                            {/* You can add more fields here as needed */}
                        </>
                    ) : (
                        <p>{error}</p>
                    )}
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: '999',
                display: showPopup ? 'block' : 'none'
            }}></div>
        </div>
    );
};

export default QRScanner;
