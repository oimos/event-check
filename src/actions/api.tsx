const API = {
  callPrefApi: () => {
    return fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: {
        'X-API-KEY': process.env.X_API_KEY,
      },
    })
    .then(response => {
      return response.json()
    })
    .catch(err => err)
  },
  callCityApi: (prefCode: number) => {
    return fetch(`https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${prefCode}`, {
      headers: {
        'X-API-KEY': process.env.X_API_KEY,
      },
    })
    .then(response => {
      return response.json()
    })
    .catch(err => err)
  },
}

export default API
