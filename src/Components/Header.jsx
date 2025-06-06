import React from 'react'
import { Link } from 'react-router-dom'
import {FaSearch,FaHome} from 'react-icons/fa'
const Header = () => {
  return (
    <div className='p-2'>
      <ul className='flex justify-center gap-4'>
        <Link to='/home'><li><FaHome className='text-blue-900 h-6 w-6'/></li></Link>
        <div className='flex relative'>
            <input type='text' className='border border-gray-300 outline-0 p-1.5 rounded-lg' placeholder='search... '/>
            <FaSearch className='absolute -translate-x-1/2 right-1 my-2.5 text-gray-600 hover:text-black '/>
        </div>
        <Link to='/about'><li>About</li></Link>
        <Link to='/signin'><li>Signin</li></Link>
        <Link to='/signup'><li>signup</li></Link>
        <Link to='/profile'><li>Profile</li></Link>
      </ul>
    </div>
  )
}

export default Header
