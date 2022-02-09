import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './Button.css';

const Button = ({ name, id }) => {
  const global = useContext(GlobalContext);

  function chamar() {
    global.setFilter(id);
  }

  return (
    <button className="button" onClick={chamar}>
      {name} {id}
    </button>
  );
};

export default Button;
