import { collectionKey } from './firebaseData'

export function getData (database: any, user: any, collectionName: collectionKey) {
  if (!user) return
  database.collection(collectionName).doc(user.uid).get()
    .then((snapShot: any) => {
      console.log(snapShot.data())
    })
    .catch((err: any) => console.log(err))
}
