import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

import { IEventData } from '../../utils/api'
import styles from './styles.css'

export const loading = (state: any, render: any, classes: any, isLoading: boolean, user: any) => {
  let items = null
  if (isLoading && state.items) {
    items = state.items.map((item: IEventData) => {
      return render(item, classes, user)
    })
  } else {
    items = <div className={styles.textCenter}>
              <Paper className={[classes.paper, styles.noBoxShadow].join(' ')}>
                <CircularProgress className={classes.progress} />
              </Paper>
            </div>
  }
  return items
}
