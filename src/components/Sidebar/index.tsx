import React, { useReducer, useEffect, ReactNode } from 'react'
import GoogleMapReact from 'google-map-react'
import { useSelector, useDispatch } from 'react-redux'
import { callPrefApi, callCityApi } from '../../actions/index'
import { CSSTransition } from 'react-transition-group'
import { IState } from '../../reducer'

// First way to import
import { CircleLoader } from 'react-spinners'

import styles from './sidebar.css'

import {
  IPrefItem,
  ICityItem,
} from '../../actions'

export interface IProps {
  type?: string
  children?: ReactNode
}

export interface ISidebar {
  layer: number
  open: boolean
}

export interface ISidebarAction {
  layer: number
  type: 'open' | 'close'
}

function toggleScrollLock (isOpen: boolean, attachedClassName: string) {
  isOpen
    ? document.body.classList.add(attachedClassName)
    : document.body.classList.remove(attachedClassName)
}

function handleScrollLock (sidebarState: ISidebar[]) {
  console.log('sidebarState', sidebarState)
  const isSidebarOpen = sidebarState.some((state: ISidebar) => state.open === true)
  toggleScrollLock(isSidebarOpen, 'scrollLock')
}

function handleSidebar (stateArr: ISidebar[], action: ISidebarAction, isVisible: boolean) {
  return stateArr.map((arr: ISidebar): ISidebar =>
    arr.layer === action.layer
    ? {
      layer: action.layer,
      open: isVisible,
    }
    : arr,
  )
}

function handleSidebarContent (contentArr: IPrefItem[] | ICityItem[], render: (list: IPrefItem[] | ICityItem[]) => JSX.Element[]) {
  // console.log('contentArr', contentArr)
  return contentArr.length
    ? render(contentArr)
    : <CircleLoader
        sizeUnit={'px'}
        size={50}
        color={'#36D7B7'}
        loading={true}
      />
}

function sidebarRuducer (state: ISidebar[], action: ISidebarAction) {
  const layerExist = state.some((s: ISidebar) => s.layer === action.layer)
  switch (action.type) {
    case 'open':
      return layerExist
        ? handleSidebar(state, action, true)
        : [
          ...state,
          ...[
            {
              layer: action.layer,
              open: true,
            },
          ],
        ]
    case 'close':
      return layerExist
        ? handleSidebar(state, action, false)
        : [...state]
    default:
      return state
  }
}

const MenuSideBar: React.FC<IProps> = (props) => {
  const [sidebarState, setSidebarState] = useReducer(
    sidebarRuducer,
    [], // Default State
  )

  const prefList = useSelector((state: IState) => state.prefInfo.result)
  const cityList = useSelector((state: IState) => state.cityInfo.result)
  const dispatch = useDispatch()

  useEffect(() => {
    handleScrollLock(sidebarState)
  }, [sidebarState])

  function getPrefApi (): void {
    dispatch(callPrefApi())
  }

  function getCityApi (e: React.MouseEvent<HTMLElement>): void {
    const prefCode: number = parseInt(e.currentTarget.dataset.prefCode, 10)
    setSidebarState({
      type: 'open',
      layer: 2,
    })

    const hasCityList = cityList.some(list => list.prefCode === prefCode)
    if (!hasCityList) {
      dispatch(callCityApi(prefCode))
    }
  }

  function getMap (e: React.MouseEvent<HTMLElement>): void {
    const cityName: string = e.currentTarget.dataset.cityName
    setSidebarState({
      type: 'open',
      layer: 3,
    })

    // dispatch(callCityMapApi(cityName))

  }

  function renderPref (list: IPrefItem[]): JSX.Element[] {
    return list.map((item: IPrefItem): JSX.Element => {
      return <li key={item.prefCode + '_prefItem'} data-pref-code={item.prefCode} onClick={getCityApi}>{item.prefName}</li>
    })
  }

  function renderCity (list: any[]) {
    return list.map((item: any): JSX.Element => {
      return <li key={item.cityCode + '_cityItem'} data-city-name={item.cityName} onClick={getMap}>{item.cityName} | {item.bigCityFlag}</li>
    })
  }

  interface Test {
    lat: number
    lng: string
    text: string
  }

  function renderCityMap () {
    const AnyReactComponent = () => <div>'hhh'</div>
    /* tslint:disable */
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAoPqLmWvqBkS0Lgk1pwhuZmP2oqDtVGMc' }}
      >

      </GoogleMapReact>
    )
    /* tslint:enable */
  }

  const SLIDE_STYLE: any = {
    entering: {
      transition: 'all 400ms ease',
      background: 'black',
      transform: 'translateX(-100vw)',
      opacity: 0,
    },
    entered: {
      transition: 'all 400ms ease',
      background: 'rgba(0,0,0,0.4)',
      transform: 'translateX(0)',
      opacity: 1,
    },
    exiting: {
      transition: 'all 400ms ease',
      background: 'blue',
      transform: 'translateX(0)',
      opacity: 1,
    },
    exited: {
      transition: 'all 400ms ease',
      background: 'green',
      transform: 'translateX(-100vw)',
      opacity: 0,
    },
  }

  return (
    <div>
      <button onClick={() => {
        setSidebarState({
          type: 'open',
          layer: 1,
        })
        prefList.length === 0 && getPrefApi()
      }}>Open1</button>

      <div className={styles.sidebar}>
        {
          sidebarState.map((sidebar: ISidebar, index: number) => {
            return (
              <CSSTransition
                in={sidebar.open}
                key={index + 'tran'}
                appear={true}
                classNames="slide"
                timeout={0}
                mountOnEnter
                >
                  {(transitionState: any) => {
                    console.log(index + '_slide')
                    return <div
                      className={`${styles.slide} ${styles.sidebar} ${styles.sidebar + sidebar.layer} ${sidebar.open}`}
                      style={SLIDE_STYLE[transitionState]}
                      key={index + '_slide'}
                    >

                      {
                        index === 0
                          ? handleSidebarContent(prefList, renderPref)
                          : index === 1
                            ? handleSidebarContent(cityList, renderCity)
                            : index === 2
                              ? renderCityMap()
                              : null
                      }

                      Sidebar {sidebar.layer}
                      <button onClick={() => {
                        setSidebarState({
                          type: 'close',
                          layer: sidebar.layer,
                        })
                      }}>Close {sidebar.layer}
                      </button>
                    </div>
                  }
                }
              </CSSTransition>
            )
          })
        }
      </div>
    </div>
  )
}

export default MenuSideBar
