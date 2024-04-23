import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';

function CreateEmployee() {
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const genders = [
    { label: 'MALE', value: 'MALE' },
    { label: 'FEMALE', value: 'FEMALE' }
  ];

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
          // dob: dob.toISOString().split('T')[0]  // Convert Date object to yyyy-mm-dd format
          dob: dob.toISOString().split('T')[0]
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
      setDob(new Date());
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

  const dialogStyles = {
    customDialog: {
      width: '300px',
    }
  };

  const cardStyle = {
    width: 500,
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '8px'
  };

  return (
    <div className="create-employee-container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <Card title="" style={cardStyle}>
        <h2 style={{ marginBottom: '20px' }}>Enter Employee Details</h2>
        {errorMessage && <Message severity="error" text={errorMessage} style={{ marginBottom: '20px' }} />}
        <form onSubmit={handleSubmit} className="create-employee-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="p-field">
            <label htmlFor="name">Name:</label>
            <InputText
              id="name"
              value={name}
              onChange={handleInput(setName)}
              className="p-inputtext p-component p-filled"
              style={{ marginBottom: '20px' }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="nic">NIC:</label>
            <InputText
              id="nic"
              value={nic}
              onChange={handleInput(setNic)}
              className="p-inputtext p-component p-filled"
              style={{ marginBottom: '20px' }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="address">Address:</label>
            <InputText
              id="address"
              value={address}
              onChange={handleInput(setAddress)}
              className="p-inputtext p-component p-filled"
              style={{ marginBottom: '20px' }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="phone">Phone:</label>
            <InputText
              id="phone"
              value={phone}
              onChange={handleInput(setPhone)}
              className="p-inputtext p-component p-filled"
              style={{ marginBottom: '20px' }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="position">Position:</label>
            <InputText
              id="position"
              value={position}
              onChange={handleInput(setPosition)}
              className="p-inputtext p-component p-filled"
              style={{ marginBottom: '20px' }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="gender">Gender:</label>
            <Dropdown
              id="gender"
              value={gender}
              options={genders}
              onChange={(e) => setGender(e.value)}
              className="p-inputtext p-component p-filled"
              style={{ marginBottom: '20px', width: '100%' }}
              placeholder="Select Gender"
            />
          </div>
          <div className="p-field">
            <label htmlFor="dob">Date of Birth:</label>
            <Calendar
              id="dob"
              value={dob}
              onChange={(e) => setDob(new Date(e.value))}
              dateFormat="yy-mm-dd"
              className="p-inputtext p-component p-filled"
              style={{ marginBottom: '20px' }}
            />
          </div>
          <Button label="Create Employee" type="submit" className="p-button p-component p-filled p-button-rounded p-button-success" style={{ marginTop: '20px', width: '200px' }} />
        </form>

        <Dialog
          visible={showSuccessDialog}
          onHide={onHideDialog}
          header="Success"
          style={dialogStyles.customDialog}
          footer={<Button label="OK" onClick={onHideDialog} />}
        >
          <p>Employee created successfully</p>
        </Dialog>

        <Dialog
          visible={showErrorDialog}
          onHide={onHideDialog}
          header="Error"
          style={dialogStyles.customDialog}
          footer={<Button label="OK" onClick={onHideDialog} />}
        >
          <p>{errorMessage}</p>
        </Dialog>
      </Card>
    </div>
  );
}

export default CreateEmployee;
