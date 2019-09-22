export function formatDate (date: string) {
  let resultDate = null
  const dateString = date
  if (dateString) {
    if (dateString.match(/\d+/g)) {
      resultDate = dateString.match(/\d+/g).map((value) => parseInt(value, 10) < 10 ? `0${parseInt(value, 10)}` : value)
    } else {
      resultDate = dateString
    }
  }

  if (Array.isArray(resultDate)) {
    if (resultDate[0].length === 4) {
      resultDate = resultDate.slice(0, 3)
    } else if (resultDate[0].length === 2) {
      resultDate = [].concat(['2019'], resultDate)
    }
    return resultDate.join('').slice(0, 8)
  }

  return resultDate
}
