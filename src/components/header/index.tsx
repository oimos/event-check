import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'

import { getData } from '../../utils/getData'
import { setData } from '../../utils/setData'

import { login } from '../login'
import styles from './styles.css'

export const header: React.FC<Props> = ({ database, classes, toggleOrder, user, signOut, signInWithGoogle }) => {
  return (
    <Paper className={[classes.paper, styles.header].join(' ')}>
      <Typography variant="h6" component="h6">
        <div className={styles.inner}>
          <span>都内のイベント情報</span>

          <span className={styles.userWrapper}>
            {login({ user, signOut, signInWithGoogle })}
            <span onClick={toggleOrder} className={styles.toggleButton}><CompareArrowsIcon /></span>
          </span>
        </div>
        {/* <p>set Data</p>
        <p onClick={() => getData(database, user, 'publicDocs')}>get Data</p> */}

      </Typography>
    </Paper>
  )
}

export type Props = StateProps

export interface StateProps {
  database: any
  user: any
  classes: any
  toggleOrder: any
  signOut: any
  signInWithGoogle: any
}
