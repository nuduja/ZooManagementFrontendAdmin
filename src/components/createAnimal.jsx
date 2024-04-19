import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import '../styles/createAnimal.css'; // Import CSS file for custom styling

function CreateAnimal() {
  const [name, setName] = useState('');
  const [enclosureId, setEnclosureId] = useState('');
  const [age, setAge] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState([]);
  const [selectedAnimalSpeciesId, setSelectedAnimalSpeciesId] = useState('');
  const [selectedAnimalSpeciesName, setSelectedAnimalSpeciesName] = useState('');
  const [birthCountry, setBirthCountry] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  useEffect(() => {
    if (birthDate) {
      const calculatedAge = calculateAge(birthDate);
      setAge(calculatedAge.toString());
    }
  }, [birthDate]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/animalspecies');
        if (!response.ok) {
          throw new Error('Failed to fetch animal species');
        }
        const data = await response.json();
        setAnimalSpecies(data);
      } catch (error) {
        console.error('Error fetching species:', error);
        setErrorMessage('Failed to fetch species data.');
        setShowErrorDialog(true);
      }
    };

    fetchSpecies();
  }, []);

  const isFormValid = () => {
    return (
      name &&
      selectedAnimalSpeciesId &&
      enclosureId &&
      age &&
      birthCountry &&
      birthDate &&
      description
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setErrorMessage('Please fill in all fields.');
      setShowErrorDialog(true);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/v1/animal/createAnimal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animalSpeciesId: selectedAnimalSpeciesId,
          animalSpeciesName: selectedAnimalSpeciesName,
          name,
          enclosureId,
          birthDate: birthDate.toISOString().split('T')[0], // Format to YY-MM-DD
          birthCountry,
          description,
          age: parseInt(age, 10)  // Convert age to integer
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create animal');
      }
      setSuccessMessage('Animal created successfully');
      setShowSuccessDialog(true);
      setName('');
      setSelectedAnimalSpeciesId('');
      setSelectedAnimalSpeciesName('');
      setEnclosureId('');
      setAge('');
      setBirthCountry('');
      setBirthDate(null);
      setDescription('');
    } catch (error) {
      console.error('Error creating Animal:', error);
      setErrorMessage('Failed to create Animal. Please try again.');
      setShowErrorDialog(true);
    }
  };

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleDropdownChange = (e) => {
    const { value } = e.target;
    const selectedSpecies = animalSpecies.find(species => species.animalSpeciesId === value);
    setSelectedAnimalSpeciesId(selectedSpecies.animalSpeciesId);
    setSelectedAnimalSpeciesName(selectedSpecies.animalSpeciesName);
  };

  const onHideDialog = () => {
    setShowSuccessDialog(false);
    setShowErrorDialog(false);
  };

  return (
    <div>
      <div className="ticket-section-container1">
        <div className="ticket-section-background"></div> {/* Background image */}
        <div className="create-ticket-container">
          <h2>Enter Animal Details</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          {successMessage && <Message severity="success" text={successMessage} />}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Name:</label>
              <InputText
                value={name}
                onChange={handleInput(setName)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>Animal Species:</label>
              <Dropdown
                value={selectedAnimalSpeciesId}
                options={animalSpecies.map(species => ({
                  label: species.animalSpeciesName,
                  value: species.animalSpeciesId
                }))}
                onChange={handleDropdownChange}
                placeholder="Select an Animal Species"
                className="zoo-dropdown"
              />
            </div>
            <div className="input-container">
              <label>Enclosure ID:</label>
              <InputText
                value={enclosureId}
                onChange={handleInput(setEnclosureId)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>Age:</label>
              <InputText
                value={age}
                onChange={handleInput(setAge)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>Birth Country:</label>
              <InputText
                value={birthCountry}
                onChange={handleInput(setBirthCountry)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>Birth Date:</label>
              <Calendar
                value={birthDate}
                onChange={(e) => setBirthDate(e.value)}
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
            <Button label="Create Animal" type="submit" className="zoo-button" enable={!isFormValid()} />
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

export default CreateAnimal;
