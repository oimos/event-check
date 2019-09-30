import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import firebaseConfig from '../firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseAppAuth = firebaseApp.auth()
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
}
export const database = firebase.firestore()
