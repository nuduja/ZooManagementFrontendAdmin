import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

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
        <div>
            <h2>Generate QR Code</h2>
            <input
                type="text"
                value={inputId}
                onChange={handleInputChange}
                placeholder="Enter ID"
            />
            <button onClick={downloadQRCode} disabled={!inputId}>
                Download QR Code
            </button>
            {inputId && (
                <div ref={qrRef}>
                    <QRCode value={inputId} size={256} level={"H"} includeMargin={true} />
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;
