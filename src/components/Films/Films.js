import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { getDataBackend } from '../../utils/API';
import { FormatDate } from '../../utils/Format';
import Button from '../Button/Button';

import './Films.css';

const Films = () => {
  const [categories, setCategories] = useState([]);
  const [contador, setContador] = useState(1);

  useEffect(() => {
    async function loadCategories() {
      const url =
        'https://api.themoviedb.org/3/genre/movie/list?api_key=d31881d7732eb0ca7f5bfe7017713b39&language=pt-BR';
      const data = await getDataBackend(url);
      setCategories(data.genres);
    }
    loadCategories();
  }, []);

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

  const [filter, setFilter] = useState([]);

  async function filterFilms({ target }) {
    const id = Number(target.getAttribute('id'));
    const url = handleURL(currentPage);
    const data = await getDataBackend(url, 'FilterFilms');
    const results = data.results;
    const hasID = filter.includes(id);
    let filterLocal = [...filter];

    if (hasID) {
      filterLocal.splice(filterLocal.indexOf(id), 1);
    } else {
      filterLocal = [...filter, id];
    }

    setFilter(filterLocal);

    const filmsFiltered = results.filter((film) => {
      return film.genre_ids.some((id) => filterLocal.includes(id));
    });

    setFilms(filmsFiltered.length === 0 ? results : filmsFiltered);
  }

  function handleClick(event) {
    const idFilm = event.currentTarget.getAttribute('data-id');
    navigate(`/film/${idFilm}`);
  }

  return (
    <>
      <section className="subHeader">
        <div className="subHeaderContent">
          <span>
            Milhões de filmes, séries e pessoas para descobrir. Explore já.
          </span>
          <p>Filtre por:</p>
          <div className="buttons">
            {categories.map(({ id, name }) => (
              <Button key={id} name={name} id={id} funcao={filterFilms} />
            ))}
          </div>
        </div>
      </section>
      <section className="films">
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
          <span>{currentPage}</span>
          <button onClick={changePage} value="next">
            Próxima Pagina
          </button>
        </div>
      </section>
    </>
  );
};

export default Films;
