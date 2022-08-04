import GetState from 'hoc/GetState'
import Dashboards from 'components/Dashboards'
import Home from 'pages/Home'
import Start from 'pages/Start'
import { Route, Routes } from 'react-router-dom'
import Layout from 'ui/Layout'

import './App.css'

function App() {
  return (
    <GetState>
      <Routes>
        <Route index element={<Start />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboards />} />
        </Route>
      </Routes>
    </GetState>
  )
}

export default App
