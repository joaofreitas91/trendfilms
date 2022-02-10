import React, { useState, useEffect } from 'react';
import { getDataBackend } from '../../utils/API';
import Button from '../Button/Button';
import './SubHeader.css';

const SubHeader = () => {
  const [categories, setCategories] = useState([]);
  const [contador, setContador] = useState(1);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const url =
        'https://api.themoviedb.org/3/genre/movie/list?api_key=d31881d7732eb0ca7f5bfe7017713b39&language=pt-BR';
      const data = await getDataBackend(url);
      setCategories(data.genres);
    }
    loadCategories();
  }, []);

  function callback({ target }) {
    const id = target.getAttribute('id');
    const hasID = filter.includes(id);

    if (hasID) {
      filter.splice(filter.indexOf(id), 1);
    } else {
      setFilter([...filter, id]);
    }

    console.log(filter);
  }

  return (
    <section className="subHeader">
      <div className="subHeaderContent">
        <span>
          Milhões de filmes, séries e pessoas para descobrir. Explore já{' '}
          {contador}.
        </span>
        <p>Filtre por:</p>
        <div className="buttons">
          {categories.map(({ id, name }) => (
            <Button key={id} name={name} id={id} funcao={callback} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubHeader;
