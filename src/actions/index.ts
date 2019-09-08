import { Action } from 'redux'
import { ActionTypes } from '../constants'
import API from './api'

export interface IPrefItem {
  prefCode: string
  prefName: string
}

export interface ICityItem {
  prefCode: number
  cityCode: string
  cityName: string
  bigCityFlag: string
}

export interface IPrefItemAction extends Action {
  type: ActionTypes.GET_PREF
  payload: IPrefItem
}

export interface ICityItemAction extends Action {
  type: ActionTypes.GET_CITY
  payload: ICityItem
  prefCode: number
}

export interface IIncreaseCount extends Action {
  type: ActionTypes.INCREMENT
  payload: number
}

export interface IDecreaseCOunt extends Action {
  type: ActionTypes.DECREMENT
  payload: number
}

export function incrementAction (payload: number): IIncreaseCount {
  return {
    type: ActionTypes.INCREMENT,
    payload: payload,
  }
}

export function incrementActionAsync (payload: number) {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(incrementAction(payload))
    }, 2000)
  }
}

export function decrementAction (payload: number): IDecreaseCOunt {
  return {
    type: ActionTypes.DECREMENT,
    payload: payload,
  }
}

export function decrementActionAsync (payload: number) {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(decrementAction(payload))
    }, 2000)
  }
}

export function getPrefInfo (payload: IPrefItem): IPrefItemAction {
  return {
    type: ActionTypes.GET_PREF,
    payload,
  }
}

export function callPrefApi () {
  return (dispatch: any) => {
    API.callPrefApi()
      .then((response: IPrefItem): any => {
        dispatch(getPrefInfo(response))
      })
      .catch((err: any) => err)
  }
}

export function getCityInfo (payload: ICityItem, prefCode: number): ICityItemAction {
  return {
    type: ActionTypes.GET_CITY,
    payload,
    prefCode,
  }
}

export function callCityApi (prefCode: number) {
  return (dispatch: any) => {
    API.callCityApi(prefCode)
      .then((response: ICityItem): any => {
        dispatch(getCityInfo(response, prefCode))
      })
      .catch((err: any) => err)
  }
}
