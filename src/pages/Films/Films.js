import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getDataBackend } from "../../utils/API";
import { FormatDate } from "../../utils/Format";
import Button from "../../components/Button/Button";

import "./Films.css";

const Films = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState([]);

  const totalPages = 500;

  useEffect(() => {
    async function loadCategories() {
      const path = "genre/movie/list";
      const data = await getDataBackend(path);
      setCategories(data.genres);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadFilms() {
      const path = `movie/popular`;
      const page = 1;
      const data = await getDataBackend(path, page);
      setFilms(data.results);
    }
    loadFilms();
    controlPagination(1);
  }, []);

  const changePage = async (pageNumber) => {
    window.scrollTo(0, 0);

    const path = `movie/popular`;
    const data = await getDataBackend(path, pageNumber);

    if (!pages.includes(pageNumber)) {
      controlPagination(pageNumber);
    }

    setCurrentPage(pageNumber);
    setFilms(data.results);
  };

  function controlPagination(pagRef) {
    const newPagination = Array.from(Array(totalPages), (_, index) => {
      return index + 1;
    }).slice(pagRef - 1, pagRef + 4);

    if (newPagination.length < 5) {
      const endPages = Array.from(Array(totalPages), (_, index) => {
        return index + 1;
      }).slice(495, 500);
      setPages(endPages);
      return;
    }

    setPages(newPagination);
  }

  async function filterFilms({ target }) {
    const id = Number(target.getAttribute("id"));
    const path = `movie/popular`;
    const data = await getDataBackend(path, currentPage);
    const results = data.results;
    const hasID = filter.includes(id);
    let filterLocal = [...filter];

    target.classList.toggle("active");

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
    const idFilm = event.currentTarget.getAttribute("data-id");
    navigate(`/trendfilms/film/${idFilm}`);
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
              <Button key={id} name={name} id={id} callback={filterFilms} />
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
              <h3>{title}</h3>
              <p>{FormatDate(release_date)}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {currentPage > 1 && (
            <>
              <button onClick={() => changePage(1)}>{"<<"}</button>
              <button onClick={() => changePage(currentPage - 1)} value="back">
                {"<"}
              </button>
            </>
          )}
          {pages.map((e) => (
            <button
              key={e}
              onClick={(evt) => changePage(Number(evt.target.innerText))}
              className={e === currentPage ? "selectedPage" : ""}
            >
              {e}
            </button>
          ))}
          {currentPage < totalPages && (
            <>
              <button onClick={() => changePage(currentPage + 1)} value="next">
                {">"}
              </button>
              <button onClick={() => changePage(totalPages)}>{">>"}</button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Films;
