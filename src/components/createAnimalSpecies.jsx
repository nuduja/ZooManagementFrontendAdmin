import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import '../styles/createAnimalSpecies.css'; // Import CSS file for custom styling

function CreateAnimalSpecies() {
  const [animalSpeciesName, setAnimalSpeciesName] = useState('');
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
      const response = await fetch('http://localhost:8080/api/v1/animalspecies/createAnimalSpecies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animalSpeciesName: animalSpeciesName,
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
      setAnimalSpeciesName('');
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

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
  }

  return (
    <div>
      <div className="ticket-section-container">
        <div className="ticket-section-background"></div> {/* Background image */}
        <div className="create-animalSpec-container">
          <h2>Enter Animal Species Details</h2>
          {errorMessage && <Message severity="error" text={errorMessage} />}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>animalSpeciesName:</label>
              <InputText
                value={animalSpeciesName}
                onChange={handleInput(setAnimalSpeciesName)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>taxonomy_kingdom:</label>
              <InputText
                value={taxonomy_kingdom}
                onChange={handleInput(setTaxonomy_kingdom)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>taxonomy_scientific_name:</label>
              <InputText
                value={taxonomy_scientific_name}
                onChange={handleInput(setTaxonomy_scientific_name)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_group_behavior:</label>
              <InputText
                value={characteristics_group_behavior}
                onChange={handleInput(setCharacteristics_group_behavior)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_diet:</label>
              <InputText
                value={characteristics_diet}
                onChange={handleInput(setCharacteristics_diet)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_skin_type:</label>
              <InputText
                value={characteristics_skin_type}
                onChange={handleInput(setCharacteristics_skin_type)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_top_speed:</label>
              <InputText
                value={characteristics_top_speed}
                onChange={handleInput(setCharacteristics_top_speed)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_lifespan:</label>
              <InputText
                value={characteristics_lifespan}
                onChange={handleInput(setCharacteristics_lifespan)}
                className="zoo-input"
              />
            </div>
            <div className="input-container">
              <label>characteristics_weight:</label>
              <InputText
                value={characteristics_weight}
                onChange={handleInput(setCharacteristics_weight)}
                className="zoo-input"
              />
            </div>            
            <Button label="Create Animal Species" type="submit" className="zoo-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAnimalSpecies;
