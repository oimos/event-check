import { collectionKey } from './firebaseData'

export function setData (database: any, user: any, collectionName: collectionKey, data: any) {
  if (!user) return
  console.log('data', data)
  // let favoriteItems: any = []
  // favoriteItems.push(data)

  // return database.collection(collectionName).doc(user.uid).set(
  //   item

  // console.log('collectionName', collectionName)

  database.collection(collectionName)
    .get()
    .then((querySnapShot: any) => {
      querySnapShot.forEach((doc: any) => {
        if (doc.id === user.uid) {
          let favoriteItems: any = []
          console.log('...doc.data()', doc.data())

          // doc.data().favoriteItems && doc.data().favoriteItems.length > 0 && favoriteItems.push(...doc.data().favoriteItems)
          favoriteItems.push(...doc.data().favoriteItems)
          console.log('11')
          favoriteItems.forEach((items: any) => {
            console.log('22')
            console.log(items.link)
            console.log(data.link)
            // if (items.link !== data.link) {
            favoriteItems.push(data)
            // }
          })

          console.log('favoriteItems', favoriteItems)

          // console.log('merged', {
          //   favoriteItems: {
          //     ...doc.data(),
          //     ...{data},
          //   },
          // })
          // console.log(
          //   {
          //     ...doc.data(),
          //     ...item,
          //   },
          // )
          return database.collection(collectionName).doc(user.uid).set(
            { favoriteItems }
          , { merge: true })
        }

      })
    })
}
