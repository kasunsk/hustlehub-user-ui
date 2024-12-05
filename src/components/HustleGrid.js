import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HustleGrid.css';

const HustleGrid = ({ data }) => {
  const navigate = useNavigate();

  const handleView = (hustle) => {
    // Navigate to the detail page with the hustle ID
    navigate(`/view/${hustle.id}`, { state: hustle });
  };
  if (!data.length) {
    return <p>No hustles available</p>;
  }

 return (
 <div className="grid-container">
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>No</th> {/* Row Number Header */}
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Valuation</th>
            <th>Actions</th> {/* Add a column for actions */}
          </tr>
        </thead>
        <tbody>
          {data.map((hustle, index) => (
            <tr key={hustle.id}>
              <td>{index + 1}</td> {/* Add Row Number */}
              <td>{hustle.name}</td>
              <td>{hustle.description}</td>
              <td>{hustle.status}</td>
              <td>{hustle.valuation.toFixed(2)}</td>
              <td>
                <button
                  className="view-button"
                  onClick={() => handleView(hustle)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );

};

export default HustleGrid;
