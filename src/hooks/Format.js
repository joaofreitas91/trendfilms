export const FormatDate = (date, format) => {
  const dateRaw = date.split('-');
  const [year, month, day] = dateRaw;
  const myDate = new Date(year, month - 1, day);

  const params = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (format === 'numbers') params.month = 'numeric';

  const newDate = myDate
    .toLocaleString('pt-BR', params)
    .replace('.', '')
    .replace('de', '')
    .toUpperCase();

  return newDate;
};
