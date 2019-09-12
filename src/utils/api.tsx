export interface IEventData {
  id: number
  link: string
  title: string
  startDate: string
  endDate: string
  image: string
  pref: string
  city: string
  location: string
}

export interface IEventItem {
  items: IEventData[]
}

export const callApi = (URL: string) => {
  return new Promise((resolve, reject) => {
    console.log(URL)
    fetch(URL)
      .then(res => res.json())
      .then(response => {
        return resolve(response)
      })
      .catch(err => reject(err))
  })
}
