import React, { useState, useEffect } from 'react';

const Carousel = ({ oItems }) => {
  console.log(oItems);
  return (
    <div className="carousel">
      {oItems.map(({ department, name }, index) => (
        <div className="cards" key={index}>
          <h3>{name}</h3>
          <p>{department}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
