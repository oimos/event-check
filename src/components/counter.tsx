import React, { useState, useReducer, ReactNode } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
// import Sidebar from 'react-sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { incrementActionAsync, decrementActionAsync, callPrefApi } from '../actions/index'
// import Header from './header/index'

import { css } from '@emotion/core'
// First way to import
import { CircleLoader } from 'react-spinners'

import {
  IPrefItem,
} from '../actions'

interface Props {
  type?: string
  children?: ReactNode
}

// const counterSelector = (state: any) => {
//   return state.counter
// }

// const prefInfo = (state: any) => {
//   return state.prefInfo.result
// }

const Counter: React.FC<Props> = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false)

  // const [sidebarOpen, setSidebarOpen] = useReducer((state, action) => {
  //   switch (action.type) {
  //     case 'open':
  //       toggleScrollLock(true)
  //       return true
  //     case 'close':
  //       toggleScrollLock(false)
  //       return false
  //     default:
  //       return state
  //   }
  // }, false)

  // const [prefListState, setPrefListState] = useState([])
  // const counter = useSelector(counterSelector)
  // const prefList = useSelector(prefInfo)
  // const dispatch = useDispatch()

  // function showPrefContent (list: IPrefItem[]) {
  //   return list.map((item: IPrefItem): JSX.Element => (
  //     <li key={item.prefCode}>{item.prefName}</li>
  //   ))
  // }

  // function toggleScrollLock (isOpen: boolean) {
  //   isOpen
  //     ? document.body.classList.add('scrollLock')
  //     : document.body.classList.remove('scrollLock')
  // }

  const topPage = () => <div><h1>Top Page</h1>ここがトップページです</div>
  const page1 = () => <div><h1>page1</h1>1枚目のページです</div>
  const page2 = () => <div><h1>page2</h1>2枚目のページです</div>
  const page3 = () => <div><h1>page3</h1>3枚目のページです</div>

  return (
    <div>
      {/* <Header
        src="https://web.archive.org/web/20160326142013im_/http://shinyatk.com/images/logo.pngss"
        alt="Shinya Takahashi"
        width={235}
        height={111}
      /> */}
      {/* <button onClick={() => {
        // setSidebarOpen(true)
        setSidebarOpen({
          type: 'open',
        })
        prefList.length === 0 && dispatch(callPrefApi())
      }}>Open Sidebar</button> */}

      <Router>
        {/* <h1>Count: {counter}</h1> */}
        <Route path="/" exact component={topPage} />
        <Route path="/page1" exact component={page1} />
        <Route path="/page2" exact component={page2} />
        <Route path="/page3" exact component={page3} />

        <div>
          <ul>
            <li><Link to="/">top</Link></li>
            <li><Link to="page1">page1</Link></li>
            <li><Link to="page2">page2</Link></li>
            <li><Link to="page3">page3</Link></li>
          </ul>
        </div>
      </Router>

      <div>
        {/* <button onClick={() => dispatch(incrementActionAsync(2))}>+2</button> */}
        {/* <button onClick={() => dispatch(decrementActionAsync(10))}>-10</button> */}
        {/* <button onClick={() => prefList.length === 0 && dispatch(callPrefApi())}>Get Pref</button> */}
        {/* {showPrefContent(prefList)} */}
      </div>
    </div>
  )
}

export default Counter
