export async function getDataBackend(url) {
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
