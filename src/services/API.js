export async function GetData(target) {
  const response = await fetch(
    `https://ranekapi.origamid.dev/json/api/produto/${target}`,
  );
  const dados = await response.json();
  return dados;
}

export async function getDataBackend(url, component) {
  const response = await fetch(url);
  if (response.status === 200) {
    const dados = await response.json();
    console.log('component', dados);
    return dados;
  } else {
    const error = await response.text();
    return error;
  }
}
