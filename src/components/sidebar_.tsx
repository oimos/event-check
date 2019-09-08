import React, { useState, useReducer, ReactNode } from 'react'
import Sidebar from 'react-sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { incrementActionAsync, decrementActionAsync, callPrefApi } from '../actions/index'

// First way to import
import { CircleLoader } from 'react-spinners'

import {
  IPrefItem,
} from '../actions'

interface Props {
  type?: string
  children?: ReactNode
}

const prefInfo = (state: any) => {
  return state.prefInfo.result
}

const MenuSideBar: React.FC<Props> = () => {
  const [sidebarOpen, setSidebarOpen] = useReducer((state, action) => {
    switch (action.type) {
      case 'open':
        toggleScrollLock(true)
        return true
      case 'close':
        toggleScrollLock(false)
        return false
      default:
        return state
    }
  }, false)

  // const [prefListState, setPrefListState] = useState([])
  const prefList = useSelector(prefInfo)
  const dispatch = useDispatch()

  function showPrefContent (list: IPrefItem[]) {
    return list.map((item: IPrefItem): JSX.Element => (
      <li key={item.prefCode}>{item.prefName}</li>
    ))
  }

  function toggleScrollLock (isOpen: boolean) {
    isOpen
      ? document.body.classList.add('scrollLock')
      : document.body.classList.remove('scrollLock')
  }

  return (
    <div>
      <Sidebar
        sidebar={
          prefList.length > 0
          ? <div>
              {showPrefContent(prefList)}
              <button onClick={() => {
                // setSidebarOpen(false)
                setSidebarOpen({
                  type: 'close',
                })
              }}>
                  close
              </button>
            </div>
          : <CircleLoader
            sizeUnit={'px'}
            size={50}
            color={'#36D7B7'}
            loading={true}
          />
        }
        open={ sidebarOpen }
        onSetOpen={ setSidebarOpen }
        styles={{
          // root: {
          //   position: 'fixed',
          // },
          // sidebar: {
          //   width: '100vw',
          //   background: '#fff',
          // },
          overlay: {
            width: '10px',
          },
        }}
      ><button onClick={() => {
        // setSidebarOpen(true)
        setSidebarOpen({
          type: 'open',
        })
        prefList.length === 0 && dispatch(callPrefApi())
      }}>adsaasdas dasdass das open</button></Sidebar>
    </div>
  )
}

export default MenuSideBar
