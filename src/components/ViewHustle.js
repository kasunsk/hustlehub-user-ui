import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ViewHustle.css';

const ViewHustle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hustle = location.state;

  if (!hustle) {
    return <p>No hustle data available!</p>;
  }

  return (
    <div className="view-container">
      <div className="details-card">
        <h2>Hustle Details</h2>
        <div className="details-row">
          <strong>Name:</strong> <span>{hustle.name}</span>
        </div>
        <div className="details-row">
          <strong>Description:</strong> <span>{hustle.description}</span>
        </div>
        <div className="details-row">
          <strong>Status:</strong> <span>{hustle.status}</span>
        </div>
        <div className="details-row">
          <strong>Valuation:</strong> <span>{hustle.valuation.toFixed(2)}</span>
        </div>
        <div className="details-row">
          <strong>Currency:</strong> <span>{hustle.currency}</span>
        </div>
        <div className="details-row">
          <strong>Total Card Count:</strong> <span>{hustle.totalCardCount}</span>
        </div>
        <div className="details-row">
          <strong>Sold Card Count:</strong> <span>{hustle.soldCardCount}</span>
        </div>
        <div className="details-row">
          <strong>Unsold Card Count:</strong> <span>{hustle.unsoldCardCount}</span>
        </div>
        <div className="details-row">
          <strong>Card Value:</strong> <span>{hustle.cardValue.toFixed(2)}</span>
        </div>
        <div className="details-row">
          <strong>Return Period:</strong> <span>{hustle.returnPeriod}</span>
        </div>
        <div className="details-row">
          <strong>Return Type:</strong> <span>{hustle.returnType}</span>
        </div>
        <div className="details-row">
          <strong>Return Value:</strong> <span>{hustle.returnValue.toFixed(2)}</span>
        </div>
        <div className="details-row">
          <strong>Total Return Per Card:</strong> <span>{hustle.totalReturnPerCard.toFixed(2)}</span>
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewHustle;
