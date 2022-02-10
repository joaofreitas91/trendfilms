import React, { useEffect, useState } from 'react';
import './DetailFilm.css';
import { useParams } from 'react-router-dom';
import { getDataBackend } from '../../utils/API';
import { CircularProgressbar } from 'react-circular-progressbar';
import { FormatDate } from '../../utils/Format';
import Carousel from '../../components/Carousel/Carousel';
import MiniCards from '../../components/MiniCards/MiniCards';

const DetailFilm = () => {
  const [detail, setDetail] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const params = useParams();
  const idFilm = params.id;

  useEffect(() => {
    async function loadDetailFilm() {
      const url = `https://api.themoviedb.org/3/movie/${idFilm}?api_key=d31881d7732eb0ca7f5bfe7017713b39&language=pt-BR`;
      const data = await getDataBackend(url);
      setDetail(data);
    }
    loadDetailFilm();
  }, []);

  useEffect(() => {
    async function loadCredits() {
      const url = `https://api.themoviedb.org/3/movie/${idFilm}/credits?api_key=d31881d7732eb0ca7f5bfe7017713b39&language=pt-BR`;
      const data = await getDataBackend(url);
      setCredits(data);
    }
    loadCredits();
  }, []);

  useEffect(() => {
    async function loadTrailer() {
      const url = `https://api.themoviedb.org/3/movie/${idFilm}/videos?api_key=d31881d7732eb0ca7f5bfe7017713b39&language=pt-BR`;
      const data = await getDataBackend(url);
      setTrailer(data.results[0].key);
    }
    loadTrailer();
  }, []);

  if (detail === null) return null;
  if (credits === null) return null;
  // if (trailer === null) return null;
  return (
    <div className="detailPage">
      <section className="detailFilm">
        <div className="detailFilmContent">
          <div className="poster">
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${detail.poster_path}`}
              alt=""
            />
          </div>
          <div className="details">
            <h1>{detail.title}</h1>
            <p>
              {detail.adult ? '86 anos' : '16 anos'} •{' '}
              {FormatDate(detail.release_date, 'numbers')} •{' '}
              {detail.genres
                .map((element) => element.name)
                .toString()
                .replaceAll(',', ', ')}{' '}
              •{''} {parseInt(detail.runtime / 60)}h{' '}
              {parseInt(detail.runtime % 60)}m
            </p>
            <div className="progressBar">
              <CircularProgressbar
                maxValue={100}
                value={detail.vote_average * 10}
                text={`${detail.vote_average * 10}%`}
                background="true"
              />
              <div>
                <span> Avaliação dos</span>
                <span> usuários</span>
              </div>
            </div>
            {detail.overview && <h1>Sinopse</h1>}
            <p>{detail.overview} </p>
            {/* Equipe Técnica */}
            <MiniCards oItems={credits.crew} />
          </div>
        </div>
      </section>
      {/* Elenco */}
      <div className="carousel-container">
        <div className="carousel-title">
          <h2>Elenco Principal</h2>
        </div>
        <Carousel oItems={credits.cast} />
      </div>

      <div className="trailer-container">
        <div className="trailer-title">
          <h2>Trailer</h2>
        </div>
        <div className="trailer-video">
          <iframe
            width="85%"
            height="545"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DetailFilm;
