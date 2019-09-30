import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { firebaseAppAuth, providers, database } from '../../utils/firebase'
import { callApi, IEventData, IEventItem } from '../../utils/api'
import { setData } from '../../utils/setData'

export function list (item: IEventData, classes: any, user: any) {
  const renderDate = () => item.startDate === item.endDate
    ? `${item.startDate}`
    : `${item.startDate} - ${item.endDate}`

  function handleClick (event: React.MouseEvent<HTMLElement>): void {
    setData(database, user, 'publicDocs', item)
  }

  return (
    <Paper className={classes.paper} key={item.id}>
      <a key={item.id} className={classes.root} href={item.link} style={{ 'textDecoration': 'none', 'lineHeight': 1.2, 'color': 'inherit' }}>
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
      </a>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleClick} data-key={item.id}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Paper>
  )
}
