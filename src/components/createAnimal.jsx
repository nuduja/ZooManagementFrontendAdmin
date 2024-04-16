import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import '../styles/createAnimal.css'; // Import CSS file for custom styling

function CreateAnimal() {
  const [animalId, setAnimalId] = useState('');
  const [name, setName] = useState('');
  const [enclosureId, setEnclosureId] = useState('');
  const [age, setAge] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState([]);
  const [selectedAnimalSpeciesId, setSelectedAnimalSpeciesId] = useState('');
  const [selectedAnimalSpeciesName, setSelectedAnimalSpeciesName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      }
    };

    fetchSpecies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/createAnimal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animalSpecificId: selectedAnimalSpeciesId,
          animalSpeciesName: selectedAnimalSpeciesName,
          name: name,
          enclosureId: enclosureId,
          age: age
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create animal');
      }
      alert('Animal created successfully');
      setAnimalId('');
      setName('');
      setSelectedAnimalSpeciesId('');
      setSelectedAnimalSpeciesName('');
      setEnclosureId('');
      setAge('');
    } catch (error) {
      console.error('Error creating Animal:', error);
      setErrorMessage('Failed to create Animal. Please try again.');
    }
  };

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
  }

  const handleDropdownChange = (e) => {
    const { value } = e.target;
    const selectedSpecies = animalSpecies.find(species => species.animalSpeciesId === value);
    setSelectedAnimalSpeciesId(selectedSpecies.animalSpeciesId);
    setSelectedAnimalSpeciesName(selectedSpecies.animalSpeciesName);
  }

  return (
    <div>
      <div className="ticket-section-container1">
        <div className="ticket-section-background"></div> {/* Background image */}
        <div className="create-ticket-container">
          <h2>Enter Animal Details</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>animalId:</label>
              <InputText
                value={animalId}
                onChange={handleInput(setAnimalId)}
                className="zoo-input"
              />
            </div>
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
              <label>enclosureId:</label>
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
            <Button label="Create Animal" type="submit" className="zoo-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAnimal;
