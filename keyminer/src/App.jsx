import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './Pages/Main'
import Home from './Pages/Home'
import AllItems from './Pages/AllItems'
import Favourites from './Pages/Favourites'
import Bin from './Pages/Bin'
import About from './Pages/About'


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/KEY-MINER/' element={<Main />}>
          <Route index element={<Home />} />
          <Route path='AllItems' element={<AllItems />} />
          <Route path='AllItems/:value' element={<AllItems />} />
          <Route path='Favourites' element={<Favourites />} />
          <Route path='Bin' element={<Bin />} />
          <Route path='About' element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
