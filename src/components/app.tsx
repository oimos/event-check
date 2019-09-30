import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import GoogleMapReact, { MapOptions, Maps } from 'google-map-react'
import withFirebaseAuth from 'react-with-firebase-auth'
import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import { list } from './list'
import { header } from './header'
import { login } from './login'
import { loading } from './loading'

import { firebaseAppAuth, providers, database } from '../utils/firebase'
import { callApi, IEventItem } from '../utils/api'
import { compareUp, compareDown } from '../utils/compare'
import { useStyles } from '../utils/useStyles'

const App: React.FC = (props: any): any => {
  const [event, setEvent] = useState()
  const [order, setOrder] = useState(false)
  const [isLoading, setLoading] = useState(false)

  useEffect((): void => {
    callApi('/event.json')
      .then((data: IEventItem) => {
        setEvent(data)
        setOrder(false)
        setLoading(true)
      })
      .catch(err => {
        setLoading(false)
        console.error(err)
      })
  }, [])

  function toggleOrder () {
    const currentState = event
    const reOrderedItems = {
      items: order === true ? currentState.items.sort(compareDown) : currentState.items.sort(compareUp),
    }
    setEvent(reOrderedItems)
    setOrder(!order)
  }

  const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  })
  const classes = useStyles(theme)

  function Index () {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = props

    return <>
      {
        header(
          {
            database,
            classes,
            toggleOrder,
            user,
            signOut,
            signInWithGoogle,
          },
        )
      }
      {
        loading(event, list, classes, isLoading, user)
      }
    </>
  }

  function Map () {
    return <>
      <div style={{
        'height': '100vh',
        'width': '100%',
      }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${process.env.GOOGLE_MAP_API}`,
          }}
          defaultCenter={{
            lat: 35.6762,
            lng: 139.6503,
          }}
          defaultZoom={12}
        >
          <Marker lat={35.6762} lng={139.6503} />
        </GoogleMapReact>
      </div>
    </>
  }

  function Marker (props: any) {
    return <div className="SuperAwesomePin">1</div>
  }

  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/map/" exact component={Map} />
    </Router>
  )
}

const WrappedApp = withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App)

export default WrappedApp
