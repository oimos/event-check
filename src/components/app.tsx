import React, { useState, useEffect } from 'react'
import { callApi, IEventData, IEventItem } from '../utils/api'

interface A<S, T> {
  (x: S): T
}

const App: React.FC = (props: any): any => {
  const [event, setEvent] = useState()

  useEffect((): void => {
    callApi('/event.json')
      .then((data: IEventItem) => {
        setEvent(data)
        // console.log(event)
      })
      .catch(err => console.error(err))
  }, [])

  function renderItem (item: IEventData) {
    return (
      <div key={item.id}>
        <p>{item.title}</p>
        <p>{item.startDate}</p>
        <p>{item.endDate}</p>
        <p><img src={item.image} title={item.title}/></p>
        <p>{item.pref}</p>
        <p>{item.city}</p>
        <p>{item.location}</p>
      </div>
    )
  }

  return (
    <>
      {
        event && event.items.map(
          (item: IEventData) => renderItem(item),
        )
      }
    </>
  )
}

export default App
