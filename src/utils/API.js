export async function getDataBackend(path, page, whitoutPagination) {
  if (page === undefined) page = 1;
  const apiKey = 'd31881d7732eb0ca7f5bfe7017713b39';
  const leaguage = 'pt-BR';
  let url = `https://api.themoviedb.org/3/${path}?page=${page}&language=${leaguage}&api_key=${apiKey}`;

  if (whitoutPagination) {
    url = `https://api.themoviedb.org/3/${path}?language=${leaguage}&api_key=${apiKey}`;
  }

  const response = await fetch(url);
  if (response.status === 200) {
    const dados = await response.json();
    return dados;
  } else {
    const error = await response.text();

    return error;
  }
}

export function getImage(path) {
  const fullPath = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${path}`;

  return fullPath;
}
