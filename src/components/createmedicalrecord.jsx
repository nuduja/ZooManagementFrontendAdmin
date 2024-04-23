import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import '../styles/createmedicalrecord.css'; // Import CSS file for custom styling

function CreateMedicalRecord() {
  const [animalId, setAnimalId] = useState('');
  const [recordDate, setRecordDate] = useState(null);
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const isFormValid = () => {
    return animalId && recordDate && description;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setErrorMessage('Please fill in all fields.');
      setShowErrorDialog(true);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/v1/medicalRecord/createMedicalRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animalId,
          recordDate: recordDate.toISOString().split('T')[0], // Format to YY-MM-DD
          description,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create medical record');
      }
      setSuccessMessage('Medical record created successfully');
      setShowSuccessDialog(true);
      setAnimalId('');
      setRecordDate(null);
      setDescription('');
    } catch (error) {
      console.error('Error creating Medical Record:', error);
      setErrorMessage('Failed to create Medical Record. Please try again.');
      setShowErrorDialog(true);
    }
  };

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const onHideDialog = () => {
    setShowSuccessDialog(false);
    setShowErrorDialog(false);
  };

  return (
    <div>
      <div className="medical-record-section-container">
        <div className="medical-record-section-background"></div> {/* Background image */}
        <div className="create-medical-record-container">
          <h2>Enter Medical Record Details</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          {successMessage && <Message severity="success" text={successMessage} />}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Animal ID:</label>
              <InputText
                value={animalId}
                onChange={handleInput(setAnimalId)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>Record Date:</label>
              <Calendar
                value={recordDate}
                onChange={(e) => setRecordDate(e.value)}
                dateFormat="yy-mm-dd"
                className="zoo-input"
                inputClassName="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>Description:</label>
              <InputText
                value={description}
                onChange={handleInput(setDescription)}
                className="zoo-input"
              />
            </div>
            <Button label="Create Medical Record" type="submit" className="zoo-button" enable={!isFormValid()} />
          </form>
          <Dialog
            visible={showSuccessDialog}
            onHide={onHideDialog}
            header="Success"
            className="custom-dialog"
            footer={<Button label="OK" onClick={onHideDialog} />}
          >
            <p>{successMessage}</p>
          </Dialog>
          <Dialog
            visible={showErrorDialog}
            onHide={onHideDialog}
            header="Error"
            className="custom-dialog"
            footer={<Button label="OK" onClick={onHideDialog} />}
          >
            <p>{errorMessage}</p>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CreateMedicalRecord;
