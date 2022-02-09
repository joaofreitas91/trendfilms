import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { getDataBackend } from '../../utils/API';
import { FormatDate } from '../../utils/Format';

import './Films.css';

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  const global = useContext(GlobalContext);

  const handleURL = (page) => {
    const url = `http://api.themoviedb.org/3/movie/popular?page=${page}&language=pt-BR&api_key=d31881d7732eb0ca7f5bfe7017713b39`;

    return url;
  };
  useEffect(() => {
    async function loadFilms() {
      const url = handleURL(1);
      const data = await getDataBackend(url, 'Films');
      setFilms(data.results);
    }
    loadFilms();
  }, []);

  const changePage = async (event) => {
    const buttonValue = event.target.value;

    console.log(buttonValue);
    let page = currentPage;
    console.log(page);

    if (buttonValue === 'next') {
      ++page;
    } else {
      --page;
    }
    setCurrentPage(page);
    const url = handleURL(page);
    const data = await getDataBackend(url, 'Films');
    setFilms(data.results);
  };

  async function filterFilms() {
    const url = handleURL(currentPage);
    const data = await getDataBackend(url, 'FilterFilms');
    const results = data.results;
    const filtro = global.filter;
    const filterFilms = results.filter((film) => {
      return film.genre_ids.toString().includes(filtro);
    });

    setFilms(filterFilms.length > 0 ? filterFilms : results);
  }

  function handleClick(event) {
    const idFilm = event.currentTarget.getAttribute('data-id');
    navigate(`/film/${idFilm}`);
  }

  return (
    <section className="films">
      <button onClick={filterFilms}> Teste de Filtro </button>
      <div className="films-content">
        {films.map(({ id, poster_path, title, release_date }) => (
          <div data-id={id} key={id} className="card" onClick={handleClick}>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
              alt={title}
            />
            <p>{title}</p>
            <p>{FormatDate(release_date)}</p>
          </div>
        ))}
      </div>
      <div className="paginations">
        <button onClick={changePage} value="back">
          Página Anterior
        </button>
        <button onClick={changePage} value="next">
          Próxima Pagina
        </button>
      </div>
    </section>
  );
};

export default Cards;
