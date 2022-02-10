import React, { useState, useEffect } from 'react';
import { getImage } from '../../utils/API';
import './Carousel.css';

const Carousel = ({ oItems }) => {
  return (
    <div className="carousel">
      {oItems.map(({ profile_path, character, name }, index) => (
        <div className="card-cast" key={index}>
          <div className="card-cast-img">
            <img src={getImage(profile_path)} alt={name} />
          </div>
          <h3>{name}</h3>
          <p>{character}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
