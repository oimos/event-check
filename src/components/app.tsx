import React, { useState, useEffect } from 'react'
import { callApi, IEventData, IEventItem } from '../utils/api'
import { makeStyles, createStyles, Theme, createMuiTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import blue from '@material-ui/core/colors/blue'
import { compareUp, compareDown } from '../utils/compare'
import CompareArrowsIcon from '@material-ui/Icons/CompareArrows'
import styles from './styles.css'

interface A<S, T> {
  (x: S): T
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: '16px auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
)

const App: React.FC = (props: any): any => {
  const [event, setEvent] = useState()
  const [order, setOrder] = useState(false)

  useEffect((): void => {
    callApi('/event.json')
      .then((data: IEventItem) => {
        setEvent(data)
        setOrder(false)
      })
      .catch(err => console.error(err))
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

  function renderItem (item: IEventData) {
    const renderDate = () => item.startDate === item.endDate
      ? `${item.startDate}`
      : `${item.startDate} - ${item.endDate}`
    return (
      <a key={item.id} className={classes.root} href={item.link} style={{ 'textDecoration': 'none', 'lineHeight': 1.2 }}>
        <Paper className={classes.paper} key={item.id}>
          <Grid container spacing={2} wrap="nowrap">
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={item.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.pref} - {item.city}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.location}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    {renderDate()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1"></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </a>
    )
  }

  return (
    <>
      <Paper className={[classes.paper, styles.header].join(' ')}>
        <Typography variant="h6" component="h6">
          都内のイベント情報 <span onClick={toggleOrder} className={styles.toggleButton}><CompareArrowsIcon /></span>
        </Typography>
      </Paper>
      {
        event && event.items.map(
          (item: IEventData) => {
            return renderItem(item)
          },
        )
      }
    </>
  )
}

export default App
