export function formatDate (date: string) {
  let resultDate = null
  const dateString = date
  if (dateString) {
    if (dateString.match(/\d+/g)) {
      resultDate = dateString.match(/\d+/g).map((value) => parseInt(value, 10) < 10 ? `0${value}` : value).join('')
    } else {
      resultDate = dateString
    }
  }

  // dateString && dateString.match(/\d+/g)
  //             .map((value) => parseInt(value, 10) < 10 ? `0${value}` : value)
  //             .join('')

  return resultDate
}
