import React, { useEffect, useState } from 'react';
import { getDataBackend } from '../services/API';
import { FormatDate } from '../services/Format';
import './Films.css';

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [films, setFilms] = useState([]);

  const handleURL = (page) => {
    console.log('handleURL', currentPage);
    const url = `http://api.themoviedb.org/3/movie/popular?page=${page}&language=pt-BR&api_key=d31881d7732eb0ca7f5bfe7017713b39`;

    return url;
  };
  useEffect(() => {
    async function loadFilms() {
      const url = handleURL();
      const data = await getDataBackend(url, 'Films');
      setFilms(data.results);
    }
    loadFilms();
  }, []);

  const changePage = async (event) => {
    const buttonValue = event.target.value;

    debugger;

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

  return (
    <section className="films">
      <div className="films-content">
        {films.map(({ id, poster_path, title, release_date }) => (
          <div key={id} className="card">
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
