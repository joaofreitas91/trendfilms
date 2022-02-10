import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './Button.css';

const Button = ({ name, id, funcao }) => {
  return (
    <button className="button" onClick={funcao} id={id}>
      {name}
    </button>
  );
};

export default Button;
