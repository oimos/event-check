import React, { useState, useEffect } from 'react'
import { callApi, IEventData, IEventItem } from '../utils/api'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

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
      <Card>
        <CardContent>
          <div key={item.id}>
            <Typography>{item.title}</Typography>
            <Typography>{item.startDate}</Typography>
            <Typography>{item.endDate}</Typography>
            <CardMedia
              style={{ 'height': '140px' }}
              image={item.image}
              title={item.title}
            />
            <Typography>{item.pref}</Typography>
            <Typography>{item.city}</Typography>
            <Typography>{item.location}</Typography>
            <Button variant="contained" color="primary">
              Test
            </Button>
          </div>
        </CardContent>
      </Card>
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
