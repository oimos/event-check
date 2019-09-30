import React from 'react'

import styles from './styles.css'

export const login = (props: any) => {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props

  let loginElem = user
    ? <div className={styles.user}>
        <p><img width="20" height="20" src={user.providerData[0].photoURL} /></p>
        <button onClick={signOut} className={styles.button}>Sign out!</button>
      </div>
    : <div className={styles.user}>
        {/* <p>Please sign in!</p> */}
        <button onClick={signInWithGoogle} className={styles.button}>Sign in with Google</button>
      </div>

  return loginElem
}
