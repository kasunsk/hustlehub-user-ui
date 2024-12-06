// HustleList.js
import React, { useState, useEffect } from 'react';
import { fetchAvailableStatuses, fetchHustlesByStatus, fetchActiveHustles } from '../utils/api';
import HustleGrid from './HustleGrid';
import CreateHustle from './CreateHustle';
import '../styles/HustleList.css';

function HustleList() {
  const [hustleData, setHustleData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableStatuses, setAvailableStatuses] = useState([]); // To store status options
  const [selectedStatus, setSelectedStatus] = useState(''); // For selected status

    // Fetch hustles by selected status
    const loadHustlesByStatus = async () => {
      if (!selectedStatus) {
        alert('Please select a status');
        return;
      }
      setLoading(true);
      try {
        const data = await fetchHustlesByStatus(selectedStatus);
        setHustleData(data);
      } catch (error) {
        console.error('Failed to load hustles by status:', error.message);
      } finally {
        setLoading(false);
      }
    };

// Fetch available statuses on component mount
  useEffect(() => {
    const loadStatuses = async () => {
      try {
        const statuses = await fetchAvailableStatuses();
        setAvailableStatuses(statuses);
      } catch (error) {
        console.error('Failed to load available statuses:', error.message);
      }
    };

    loadStatuses();
  }, []);

  const handleHustleCreated = (newHustle) => {
      setHustleData((prev) => [...prev, newHustle]); // Add new hustle to the list
      setShowCreateForm(false); // Hide form after creation
    };

  // Fetch hustles based on the selected status
  const loadHustles = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedStatus) {
        data = await fetchHustlesByStatus(selectedStatus); // Fetch by selected status
      } else {
        data = await fetchActiveHustles(); // Default fetch active hustles
      }
      setHustleData(data);
    } catch (error) {
      console.error('Failed to load hustles:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Automatically load hustles on component mount
  useEffect(() => {
    loadHustles();
  }, []);

return (
  <div>
    <h1>Hustles</h1>
    {/* Buttons container */}
    <div className="button-container">
      {!showCreateForm && (
        <>
          {/* Search by Status */}
          <div className="search-container">
            <select
              className="status-dropdown"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select a Status</option>
              {availableStatuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button className="search-button" onClick={loadHustlesByStatus}>
              Search
            </button>
          </div>
        </>
      )}
      <button
        className="create-hustle-button"
        onClick={() => setShowCreateForm((prev) => !prev)}
      >
        {showCreateForm ? 'Cancel' : 'Create Hustle'}
      </button>
    </div>

    {/* Conditional Rendering */}
    {showCreateForm ? (
      <CreateHustle onHustleCreated={handleHustleCreated} />
    ) : (
      <>
        {loading && <p>Loading...</p>}
        <HustleGrid data={hustleData} />
      </>
    )}
  </div>
);
}

export default HustleList;
