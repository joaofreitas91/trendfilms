import React from 'react';
import './MiniCard.css';

const MiniCards = ({ oItems }) => {
  console.log('miranha', oItems[0]);
  return (
    <div className="mini-cards">
      {oItems.map(({ department, name }, index) => (
        <div className="card" key={index}>
          <h3>{name}</h3>
          <p>{department}</p>
        </div>
      ))}
    </div>
  );
};

export default MiniCards;
