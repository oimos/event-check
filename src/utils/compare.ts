interface EventItem {
  id: number
  city: string
  dateNumber: string
  endDate: string
  image: string
  link: string
  location: string
  pref: string
  startDate: string
  title: string
}

export function compareUp (a: EventItem, b: EventItem) {
  if (parseInt(a.dateNumber, 10) < parseInt(b.dateNumber, 10)) {
    return -1
  }
  if (parseInt(a.dateNumber, 10) > parseInt(b.dateNumber, 10)) {
    return 1
  }
  return 0
}

export function compareDown (a: EventItem, b: EventItem) {
  if (parseInt(a.dateNumber, 10) < parseInt(b.dateNumber, 10)) {
    return 1
  }
  if (parseInt(a.dateNumber, 10) > parseInt(b.dateNumber, 10)) {
    return -1
  }
  return 0
}
