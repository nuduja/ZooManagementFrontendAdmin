import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import QRCode from "qrcode.react";

const AnimalSpecific = () => {
    const navigate = useNavigate();
    const { animalId } = useParams();
    const qrRef = useRef(null);
    const [animalData, setAnimalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const styles = {
        container: {
            display: 'grid',
            justifyContent: 'center',
        },
        card: {
            marginTop: '1.5rem',
        },
        animalDataContainer: {
            marginBottom: '1rem',
        },
        qrCodeContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
        },
        buttonContainer: {
            marginTop: '1rem',
        },
        button: {
            marginRight: '0.5rem',
        },
    };

    useEffect(() => {
        const fetchAnimalData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/animal/${animalId}`);
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
    }, [animalId]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/animal/${animalId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Animal');
            }
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Error deleting Animal:', error);
            setErrorMessage('Failed to delete Animal. Please try again.');
            setShowErrorDialog(true);
        }
    };

    const handleEdit = () => {
        navigate(`/animalEdit/${animalId}`);
    };

    const onHideSuccessDialog = () => {
        setShowSuccessDialog(false);
        navigate(-1);
    };

    const onHideErrorDialog = () => {
        setShowErrorDialog(false);
    };

    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `QRCode-${animalId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={styles.container}>
            <div className="p-col-10">
                <Card title="Animal Specific Data" style={styles.card}>
                    {loading && <p>Loading animal data...</p>}
                    {errorMessage && <Message severity="error" text={errorMessage} />}
                    {animalData && (
                        <div style={styles.animalDataContainer}>
                            <p><strong>ID:</strong> {animalData.id}</p>
                            <p><strong>Animal Species ID:</strong> {animalData.animalSpeciesId}</p>
                            <p><strong>Animal Species Name:</strong> {animalData.animalSpeciesName}</p>
                            <p><strong>Name:</strong> {animalData.name}</p>
                            <p><strong>Enclosure ID:</strong> {animalData.enclosureId}</p>
                            <p><strong>Birth Date:</strong> {animalData.birthDate}</p>
                            <p><strong>Birth Country:</strong> {animalData.birthCountry}</p>
                        </div>
                    )}
                    <div style={styles.qrCodeContainer}>
                        <button onClick={downloadQRCode} disabled={!animalId}>
                            Download QR Code
                        </button>
                        {animalId && (
                            <div ref={qrRef} style={styles.qrCodeContainer}>
                                <QRCode value={animalId} size={256} level={"H"} includeMargin={true} />
                            </div>
                        )}
                        <div style={styles.buttonContainer}>
                            <Button label="Edit" className="p-button-primary" style={styles.button} onClick={handleEdit} />
                            <Button label="Delete" className="p-button-danger" onClick={handleDelete} />
                        </div>
                    </div>
                    <Dialog
                        visible={showSuccessDialog}
                        onHide={onHideSuccessDialog}
                        header="Success"
                        footer={<Button label="OK" onClick={onHideSuccessDialog} />}
                    >
                        <p>Animal deleted successfully</p>
                    </Dialog>
                    <Dialog
                        visible={showErrorDialog}
                        onHide={onHideErrorDialog}
                        header="Error"
                        footer={<Button label="OK" onClick={onHideErrorDialog} />}
                    >
                        <p>Failed to delete Animal. Please try again.</p>
                    </Dialog>
                </Card>
            </div>
        </div>
    );
};

export default AnimalSpecific;
