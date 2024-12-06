import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext'; // Import AuthContext hook

import '../styles/CreateHustle.css';

function CreateHustle({ onHustleCreated }) {
  const { sailorId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    valuation: '',
    currency: 'SGD',
    cardCount: '',
    cardValue: '',
    tenure: '',
    tenureUnit: 'MONTH',
    returnPeriod: 'MONTHLY',
    returnType: 'PERCENTAGE_PER_CARD',
    returnValue: '',
    totalReturnPerCard: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        if (!sailorId) {
          alert('Sailor ID not available. Please log in again.');
          return;
        }
    const url = `http://localhost:8080/v1/sailor/${sailorId}/create/hustle`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create hustle');
      }

      const createdHustle = await response.json();
      alert('Hustle created successfully!');
      onHustleCreated(createdHustle); // Notify parent component of new hustle
    } catch (error) {
      console.error('Error creating hustle:', error.message);
      alert('Error creating hustle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-hustle-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Valuation:</label>
          <input type="number" name="valuation" value={formData.valuation} onChange={handleChange} required />
        </div>
        <div>
          <label>Currency:</label>
          <select name="currency" value={formData.currency} onChange={handleChange}>
            <option value="SGD">SGD</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <label>Card Count:</label>
          <input type="number" name="cardCount" value={formData.cardCount} onChange={handleChange} required />
        </div>
        <div>
          <label>Card Value:</label>
          <input type="number" name="cardValue" value={formData.cardValue} onChange={handleChange} required />
        </div>
        <div>
          <label>Tenure:</label>
          <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required />
        </div>
        <div>
          <label>Tenure Unit:</label>
          <select name="tenureUnit" value={formData.tenureUnit} onChange={handleChange}>
            <option value="MONTH">Month</option>
            <option value="YEAR">Year</option>
          </select>
        </div>
        <div>
          <label>Return Period:</label>
          <select name="returnPeriod" value={formData.returnPeriod} onChange={handleChange}>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </select>
        </div>
        <div>
          <label>Return Type:</label>
          <select name="returnType" value={formData.returnType} onChange={handleChange}>
            <option value="PERCENTAGE_PER_CARD">Percentage Per Card</option>
            <option value="FLAT">Flat</option>
          </select>
        </div>
        <div>
          <label>Return Value:</label>
          <input type="number" name="returnValue" value={formData.returnValue} onChange={handleChange} required />
        </div>
        <div>
          <label>Total Return Per Card:</label>
          <input
            type="number"
            name="totalReturnPerCard"
            value={formData.totalReturnPerCard}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Hustle'}
        </button>
      </form>
    </div>
  );
}

export default CreateHustle;
