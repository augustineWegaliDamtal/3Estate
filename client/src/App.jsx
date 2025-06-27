import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './Components/Header'
import Private from './Components/Private'
import Withdraw from './pages/Withdraw'
import Alltransactions from './pages/Alltransactions'
const App = () => {
  return (
  <BrowserRouter>
  <Header/>
    <Routes>
  <Route path='/' element={<Navigate to='/home'/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route element={<Private/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/withdraw' element={<Withdraw/>}/>
            <Route path='/allTransactions' element={<Alltransactions/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
