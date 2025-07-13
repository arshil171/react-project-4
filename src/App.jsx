import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Route, Router, Routes } from 'react-router'
import Update from './components/Update'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Cart from './components/Cart'

const App = () => {
  return(
    <div>
      <Navbar/>
      <Routes>
 
      <Route path='/' element={<Home/>}/>
      <Route path='/update/:id' element={<Update/>}/>
      <Route path='/cart' element={<Cart/>}/>

    </Routes>
  
    </div>
  )
}


export default App