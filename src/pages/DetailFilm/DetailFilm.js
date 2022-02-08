import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataBackend } from '../../hooks/API';

const DetailFilm = () => {
  const [detail, setDetail] = useState(null);
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

  if (detail === null) return null;
  return (
    <div>Essa é a pagina de detalhe - ID do Filme = {detail.homepage} </div>
  );
};

export default DetailFilm;
