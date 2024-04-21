import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
// import '../styles/createEmployee.css'; // Import CSS file for custom styling

function CreateEmployee() {
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !nic || !address || !phone || !position || !gender || !dob) {
      setErrorMessage('Please fill in all fields');
      setShowErrorDialog(true);
      return;
    }

    if (!validatePhone(phone)) {
      setErrorMessage('Invalid phone number');
      setShowErrorDialog(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/employee/createEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          nic: nic,
          address: address,
          phone: phone,
          position: position,
          gender: gender,
          dob: dob
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create Employee');
      }
      setShowSuccessDialog(true);
      setName('');
      setNic('');
      setAddress('');
      setPhone('');
      setPosition('');
      setGender('');
      setDob('');
    } catch (error) {
      console.error('Error creating Employee:', error);
      setErrorMessage('Failed to create Employee. Please try again.');
      setShowErrorDialog(true);
    }
  };

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  }

  const onHideDialog = () => {
    setShowSuccessDialog(false);
    setShowErrorDialog(false);
  };

  return (
    <div className="create-employee-container">
      <h2>Enter Employee Details</h2>
      {errorMessage && <Message severity="error" text={errorMessage} />}
      <form onSubmit={handleSubmit} className="create-employee-form">
        <div className="p-field">
          <label htmlFor="name">Name:</label>
          <InputText
            id="name"
            value={name}
            onChange={handleInput(setName)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="nic">NIC:</label>
          <InputText
            id="nic"
            value={nic}
            onChange={handleInput(setNic)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="address">Address:</label>
          <InputText
            id="address"
            value={address}
            onChange={handleInput(setAddress)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="phone">Phone:</label>
          <InputText
            id="phone"
            value={phone}
            onChange={handleInput(setPhone)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="position">Position:</label>
          <InputText
            id="position"
            value={position}
            onChange={handleInput(setPosition)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="gender">Gender:</label>
          <InputText
            id="gender"
            value={gender}
            onChange={handleInput(setGender)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <div className="p-field">
          <label htmlFor="dob">Date of Birth:</label>
          <InputText
            id="dob"
            value={dob}
            onChange={handleInput(setDob)}
            className="p-inputtext p-component p-filled"
          />
        </div>
        <Button label="Create Employee" type="submit" className="p-button p-component p-filled p-button-rounded p-button-success" />
      </form>

      <Dialog
        visible={showSuccessDialog}
        onHide={onHideDialog}
        header="Success"
        className="custom-dialog"
        footer={<Button label="OK" onClick={onHideDialog} />}
      >
        <p>Employee created successfully</p>
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
  );
}

export default CreateEmployee;
