export function formatDate(date: string) {
  const dateString = date

  const getDateNumber = dateString.match(/\d+/g)
              .map((value) => parseInt(value, 10) < 10 ? `0${value}` : value)
              .join('')

  return getDateNumber
}