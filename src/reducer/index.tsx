import {
  IPrefItem,
  ICityItem,
} from '../actions'

import { ActionTypes } from '../constants'

export interface IPrefContent {
  message: string | null
  result: IPrefItem[]
}

export interface ICityContent {
  message: string | null
  result: ICityItem[]
}

export interface IState {
  prefInfo: IPrefContent
  cityInfo: ICityContent
  counter: number
}

const initialState: IState = {
  prefInfo: {
    message: null,
    result: [],
  },
  cityInfo: {
    message: null,
    result: [],
  },
  counter: 0,
}

export default function reducer (state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + action.payload,
      }
    case ActionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - action.payload,
      }
    case ActionTypes.GET_PREF:
      return {
        ...state,
        ...{
          prefInfo: action.payload,
        },
      }
    case ActionTypes.GET_CITY:
      const currentCity = state.cityInfo.result
      const prefCode = parseInt(action.prefCode, 10)
      const hasCityInState = currentCity.some(city => city.prefCode === prefCode)

      console.log('currentCity',currentCity)
      console.log('prefCode',prefCode)

      return hasCityInState
        ? {
          ...state,
        }
        : {
          ...state,
          ...{
            cityInfo: {
              result: [
                ...currentCity,
                ...action.payload.result,
              ],
            },
          },
        }

    default:
      return state
  }
}
