import React, { useEffect } from 'react'
import Counter from './counter'
import MenuSideBar from './Sidebar/index'

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import firebaseConfig from '../firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
}
const database = firebase.firestore()

interface A<S, T> {
  (x: S): T
}

interface Props {
  name?: string
  className?: string
  subTitle?: boolean
  primary?: string | boolean
  as?: string | A<any, JSX.Element>
  href?: string
}

// database.collection('publicDocs')
//   .get()
//   .then(snapshot => {
//     if (snapshot.empty) {
//       console.log('No matching documents')
//       return
//     }
//     // https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja
//     // https://github.com/firebase/snippets-node/blob/9ae3a00985b53025fdc82716046882af71b6009d/firestore/main/index.js#L550-L561
//     snapshot.forEach(doc => {
//       console.log(doc.data())
//     })
//   })
//   .catch(err => {
//     console.log('Error getting document', err)
//   })

// Add a new document in collection "cities" with ID 'LA'
console.log(database.collection('publicDocs'))

// const App: React.FC<{ compiler: string}> = (props): any => (
const App: React.FC = (props: any): any => {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props

  function postData (uid: string) {
    return database.collection('publicDocs').doc('shinjo').set({
      born: 197321,
      part: 'drum',
      alive: true,
      reviewerID: uid,
    }, { merge: true })
  }

  useEffect((): any => {
    /* tslint:disable */
    // const data = async function (){
    //   let val = null
    //   try {
    //     val = await postData()
    //   } catch (err) {

    //   }
    //   console.log('success!!!')
    //   val = await postData().catch(() => 'EEEERRROORR')
    //   return val
    // }

    // function data() {
    //   firebaseAppAuth.onAuthStateChanged((user) => {
    //     if (user.uid) {
    //       // User logged in already or has just logged in.
    //       // postData (user.uid);
    //     } else {
    //       // User not logged in or has just logged out.
    //     }
    //   });
    // }

    // data()
    /* tslint:enable */

    // getPostResult()
    //   .then((docRef: any) => {
    //     console.log('docRef', docRef)
    //     console.log('success')
    //     docRef && console.log('Success edit user')
    //   })
    //   .catch(err => {
    //     console.log('Error getting document', err)
    //   })
  })

  return (
    <>
      <MenuSideBar />

      {
        user
          ? <p>Hello, {user.displayName}</p>
          : <p>Please sign in.</p>
      }
      {
        user
          ? <button onClick={signOut}>Sign out</button>
          : <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
      <Counter />
    </>
  )
}

const WrappedApp = withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App)

export default WrappedApp
