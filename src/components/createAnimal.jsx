import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';

function CreateAnimal() {
  const [animalId, setAnimalId] = useState('');
  const [name, setName] = useState('');
  // const [animalSpeciesID, setAnimalSpeciesID] = useState('');
  // const [animalSpeciesName, setAnimalSpeciesName] = useState('');
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
        // setSpeciesOptions(data.map(species => ({
        //   label: species.name,
        //   value: species.id
        // })));
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
      const response = await fetch('http://localhost:8080/animal/createAnimal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animalSpecificId: selectedAnimalSpeciesId,
          animalSpeciesName: selectedAnimalSpeciesName,
          // animalSpeciesName: speciesOptions.find(species => species.value === animalSpeciesID)?.label,
          name: name,
          enclosureId: enclosureId,
          age: age
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create ticket');
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
    // const selectedSpecies = speciesOptions.find(species => species.value === e.value);
    // setAnimalSpeciesID(e.value);
    // // setAnimalSpeciesName(speciesOptions.find(species => species.value === e.value)?.label);
    // setAnimalSpeciesName(selectedSpecies ? selectedSpecies.label : '');
    const { value } = event.target;
    const selectedSpecies = animalSpecies.find(species => species.animalSpeciesId === value);
    setSelectedAnimalSpeciesId(selectedSpecies.animalSpeciesId);
    setSelectedAnimalSpeciesName(selectedSpecies.animalSpeciesName);
  }

  return (
    <div>
      {/*<header className="zoo-header">*/}
      {/*  <hr />*/}
      {/*</header>*/}
      <div className="ticket-section-container">
        <div className="ticket-section-background"></div> {/* Background image */}
        <div className="create-ticket-container">
          <h2>Book Online</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>animalId:</label>
              <InputText
                value={animalId}
                onChange={handleInput(setAnimalId)}
                // disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>Name:</label>
              <InputText
                value={name}
                onChange={handleInput(setName)}
                // disabled
                className="zoo-input"
              />
            </div>
            {/*<div className="input-container">*/}
            {/*  <label>animalSpeciesID:</label>*/}
            {/*  <InputText*/}
            {/*      value={animalSpeciesID}*/}
            {/*      onChange={handleInput(setAnimalSpeciesID)}*/}
            {/*      // disabled*/}
            {/*      className="zoo-input"*/}
            {/*  />*/}
            {/*</div>*/}
            {/*<div className="input-container">*/}
            {/*  <label>animalSpeciesName:</label>*/}
            {/*  <InputText*/}
            {/*    value={animalSpeciesName}*/}
            {/*    onChange={handleInput(setAnimalSpeciesName)}*/}
            {/*    // disabled*/}
            {/*    className="zoo-input"*/}
            {/*  />*/}
            {/*</div>*/}

            {/*<div className="input-container">*/}
            {/*  <label>Animal Species:</label>*/}
            {/*  <Dropdown*/}
            {/*      value={animalSpeciesID}*/}
            {/*      options={speciesOptions}*/}
            {/*      onChange={handleDropdownChange}*/}
            {/*      placeholder="Select a Species"*/}
            {/*      className="zoo-dropdown"*/}
            {/*  />*/}
            {/*</div>*/}

            <select id="animalSpeciesDropdown" onChange={handleDropdownChange} value={selectedAnimalSpeciesId}>
              {animalSpecies.map(species => (
                  <option key={species.animalSpeciesId} value={species.animalSpeciesId}>
                    {species.animalSpeciesName}
                  </option>
              ))}
            </select>
            <div className="input-container">
              <label>enclosureId:</label>
              <InputText
                value={enclosureId}
                onChange={handleInput(setEnclosureId)}
                // disabled
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
