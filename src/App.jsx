import React from 'react'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import Feed from './components/feed'
import Connections from './components/Connections'
import Requests from './components/Requests'
import { BrowserRouter,Routes,Route } from 'react-router'
import { Provider } from 'react-redux'
import appStore from "./utils/appStore"

const App = () => {
  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/connections" element={<Connections/>} />
            <Route path="/requests" element={<Requests/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App