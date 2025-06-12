import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaSearch,FaHome} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { MdMenu } from 'react-icons/md'
import Modal from 'react-modal';
const Header = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const navigate = useNavigate();
const [modalIsOpen,setModalIsOpen] = useState(false)
const handleIconClick = ()=>{
  setModalIsOpen(true)
}
const handleModalIsClosed = ()=>{
  setModalIsOpen(false)
}
const handleChange = (e)=>{
  if(e.target.value) {
    window.location.href=e.target.value
  } }

  return (
    <div className='p-2 flex justify-between '>
     <Link to='/home'><li><FaHome className='text-blue-900 h-6 w-6'/></li></Link>
      <ul className='flex justify-center gap-10'>
       
        <div className='flex relative'>
            <input type='text' className='border border-gray-300 outline-0 p-1.5 rounded-lg' placeholder='search... '/>
            <FaSearch className='absolute -translate-x-1/2 right-1 my-2.5 text-gray-600 hover:text-black '/>
        </div>
        <Link to='/about'><li>About</li></Link>
    
        {currentUser?<Link to='/profile'><li><img className='w-8 h-8 rounded-full' alt='Profile' src={ currentUser.avatar}/></li></Link>:<Link to='/signin'><li>Signin</li></Link>}

      </ul>
      <div>
        <MdMenu className='w-10 h-10' onClick={handleIconClick} />
        <Modal isOpen={modalIsOpen}
        onRequestClose={handleModalIsClosed}
        contentLabel=' Menu'>
          <ul className='bg-black h-screen text-white flex flex-col gap-4 overflow-hidden '>
          <span className='text-right p-2 hover:underline font-bold'>Manu</span>
            <select className='w-full border border-gray-700 p-2 outline-0 text-pink-700 font-extrabold '  onChange={handleChange}>
            <option value='' className='text-slate-800 font-bold border'>ENTER RECORDS</option>
              <option value="/home" className='text-slate-600 hover:underline'>Deposit Form </option>
              <option value='/withdraw' className='text-slate-600'> Withdrawal Form </option>
              <option value='' className='text-slate-600'>Loan Form </option>
            </select>
            <select className='w-full border border-gray-700 outline-0 p-2  font-extrabold text-pink-700 '  onChange={handleChange}>
            <option value='' className='text-slate-700 font-bold border '>VIEW RECORDS</option>
              <option value="/allTransactions" className='text-slate-600'>All Transactions </option>
              <option value='/about' className='text-slate-600'> All Withdrawals Made </option>
              <option value='/profile' className='text-slate-600 '>Loan Repayment</option>
            </select>
          </ul>
        </Modal>
      </div>
      
    </div>
  )
}

export default Header
