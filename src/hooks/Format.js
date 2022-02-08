export const FormatDate = (date) => {
  const dateRaw = date.split('-');
  const [year, month, day] = dateRaw;
  const myDate = new Date(year, month - 1, day);

  const newDate = myDate
    .toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .replace('.', '')
    .replace('de', '')
    .toUpperCase();

  return newDate;
};
