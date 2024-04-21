import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import QRCode from 'qrcode.react';
import '../styles/QRCodeGenerator.css';

const QRCodeGenerator = () => {
    const [inputId, setInputId] = useState('');
    const qrRef = useRef(null);

    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };

    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `QRCode-${inputId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="qrcode-generator">
            <h2>Enter a Animal ID to Generate a QR Code</h2>
            <InputText
                value={inputId}
                onChange={handleInputChange}
                placeholder="Enter ID"
                className="input-field"
            />
            <Button onClick={downloadQRCode} disabled={!inputId} className="download-button">
                Download QR Code
            </Button>
            {inputId && (
                <div ref={qrRef} className="qrcode-container">
                    <QRCode value={inputId} size={256} level={"H"} includeMargin={true} />
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;
