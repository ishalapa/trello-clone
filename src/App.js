import Dashboard from 'pages/Dashboard';
import Home from 'pages/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from 'ui/Layout';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/home' element={<Home />}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
