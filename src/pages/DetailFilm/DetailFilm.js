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
  const params = useParams();
  const idFilm = params.id;

  useEffect(() => {
    async function loadDetailFilm() {
      const url = `https://api.themoviedb.org/3/movie/${idFilm}?api_key=d31881d7732eb0ca7f5bfe7017713b39&language=pt-BR`;
      const data = await getDataBackend(url);
      console.log(data);
      setDetail(data);
    }
    loadDetailFilm();
  }, []);

  useEffect(() => {
    async function loadCredits() {
      const url = `https://api.themoviedb.org/3/movie/${idFilm}/credits?api_key=d31881d7732eb0ca7f5bfe7017713b39&language=pt-BR`;
      const data = await getDataBackend(url);
      console.log(data);
      setCredits(data);
    }
    loadCredits();
  }, []);

  if (detail === null) return null;
  if (credits === null) return null;
  return (
    <>
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
      <Carousel oItems={credits.cast} />
    </>
  );
};

export default DetailFilm;
