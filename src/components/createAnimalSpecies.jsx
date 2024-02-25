import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

function CreateAnimalSpecies() {
  const [animalSpeciesID, setAnimalSpeciesID] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [name, setName] = useState('');
  const [taxonomy_kingdom, setTaxonomy_kingdom] = useState('');
  const [taxonomy_scientific_name, setTaxonomy_scientific_name] = useState('');
  const [characteristics_group_behavior, setCharacteristics_group_behavior] = useState('');
  const [characteristics_diet, setCharacteristics_diet] = useState('');
  const [characteristics_skin_type, setCharacteristics_skin_type] = useState('');
  const [characteristics_top_speed, setCharacteristics_top_speed] = useState('');
  const [characteristics_lifespan, setCharacteristics_lifespan] = useState('');
  const [characteristics_weight, setCharacteristics_weight] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/animalspecies/createAnimalSpecies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animalSpeciesID: animalSpeciesID,
          animalId: animalId,
          name: name,
          taxonomy_kingdom: taxonomy_kingdom,
          taxonomy_scientific_name: taxonomy_scientific_name,
          characteristics_group_behavior: characteristics_group_behavior,
          characteristics_diet: characteristics_diet,
          characteristics_skin_type: characteristics_skin_type,
          characteristics_top_speed: characteristics_top_speed,
          characteristics_lifespan: characteristics_lifespan,
          characteristics_weight: characteristics_weight,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }
      alert('Animal Species created successfully');
      setAnimalSpeciesID('');
      setAnimalId('');
      setName('');
      setTaxonomy_kingdom('');
      setTaxonomy_scientific_name('');
      setCharacteristics_group_behavior('');
      setCharacteristics_diet('');
      setCharacteristics_skin_type('');
      setCharacteristics_top_speed('');
      setCharacteristics_lifespan('');
      setCharacteristics_weight('');
    } catch (error) {
      console.error('Error creating Animal Species:', error);
      setErrorMessage('Failed to create Animal Species. Please try again.');
    }
  };

  return (
    <div>
      <header className="zoo-header">
        <h1>Welcome to Our Zoo</h1>
        <p>Discover the wonders of nature and wildlife at our amazing zoo. Come and experience a day filled with fun, education, and adventure!</p>
        <p>Location: [Your Zoo's Location]</p>
        <p>Opening Hours: [Your Zoo's Opening Hours]</p>
        <hr />
      </header>
      <div className="ticket-section-container">
        <div className="ticket-section-background"></div> {/* Background image */}
        <div className="create-ticket-container">
          <h2>Book Online</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>animalSpeciesID:</label>
              <InputText
                // value={animalSpeciesID}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>animalId:</label>
              <InputText
                value={animalId}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>taxonomy_kingdom:</label>
              <InputText
                value={taxonomy_kingdom}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>taxonomy_scientific_name:</label>
              <InputText
                value={taxonomy_scientific_name}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_group_behavior:</label>
              <InputText
                value={characteristics_group_behavior}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_diet:</label>
              <InputText
                value={characteristics_diet}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_skin_type:</label>
              <InputText
                value={characteristics_skin_type}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>setCharacteristics_top_speed:</label>
              <InputText
                value={setCharacteristics_top_speed}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_lifespan:</label>
              <InputText
                value={characteristics_lifespan}
                disabled
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_weight:</label>
              <InputText
                value={characteristics_weight}
                disabled
                className="zoo-input"
              />
            </div>            
            <Button label="Buy Tickets" type="submit" className="zoo-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAnimalSpecies;
