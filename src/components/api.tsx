import React from 'react'

interface ApiData {
  bank_code: string
  bank_name: string
  kana: string
}

const getApi = (URL: string) => {
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then(res => res.json())
      .then(response => {
        return resolve(response)
      })
      .catch(err => reject(err))
  })
}

const BankName = () => (
  // <div>
    // {
      getApi('https://demo0427586.mockable.io/bankname')
        .then(
          (d: ApiData[]) => {
            console.log(d)
            return d.map((data: ApiData) => {
              return <p>{data.bank_code}</p>
            })
            // return d.map((data: ApiData) => {
            //   return <p>{data.bank_code}</p>
            // })
          },
      // )
    // }
  // </div>
  )
)

export default BankName
