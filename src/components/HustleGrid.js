import React from 'react';
import '../styles/HustleGrid.css';

const HustleGrid = ({ data }) => {
  if (!data.length) {
    return <p>No hustles available</p>;
  }

return (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Valuation</th>
          <th>Total Capital Raised</th>
          <th>Total Return Balance</th>
          <th>Currency</th>
          <th>Total Card Count</th>
          <th>Sold Card Count</th>
          <th>Unsold Card Count</th>
          <th>Card Value</th>
          <th>Created At</th>
          <th>Tenure</th>
          <th>Tenure Unit</th>
          <th>Return Period</th>
          <th>Return Type</th>
          <th>Return Value</th>
          <th>Total Return Per Card</th>
        </tr>
      </thead>
      <tbody>
        {data.map((hustle) => (
          <tr key={hustle.id}>
            <td>{hustle.name}</td>
            <td>{hustle.description}</td>
            <td>{hustle.status}</td>
            <td>{hustle.valuation.toFixed(2)}</td>
            <td>{hustle.totalCapitalRaised.toFixed(2)}</td>
            <td>{hustle.totalReturnBalance.toFixed(2)}</td>
            <td>{hustle.currency}</td>
            <td>{hustle.totalCardCount}</td>
            <td>{hustle.soldCardCount}</td>
            <td>{hustle.unsoldCardCount}</td>
            <td>{hustle.cardValue.toFixed(2)}</td>
            <td>{new Date(hustle.createdAt).toLocaleString()}</td>
            <td>{hustle.tenure}</td>
            <td>{hustle.tenureUnit}</td>
            <td>{hustle.returnPeriod}</td>
            <td>{hustle.returnType}</td>
            <td>{hustle.returnValue.toFixed(2)}</td>
            <td>{hustle.totalReturnPerCard.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

};

export default HustleGrid;
