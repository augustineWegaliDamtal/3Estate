import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signinFailure, signinStart, signinSuccess } from '../redux/user/userSlice.js'
import OAuth from '../Components/OAuth.jsx'
const Signin = () => {
   const [formData,setFormData] = useState({})
   const {error,loading} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormData = (e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }
    console.log(formData)
    const handleFormSubmit = async(e)=>{
      e.preventDefault()
      try {
        dispatch(signinStart())
        const res = await  fetch('/api/auth/signin',{
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })
        const data = await res.json();
        if(data.success===false){
          dispatch(signinFailure(data.message))
        }
        dispatch(signinSuccess(data))
        navigate('/home')
      } catch (error) {
        dispatch(signinFailure(error.message))
      }
    }
    return (
      
      <div style={{backgroundImage:'url(/london.jpg) ' }} className='bg-cover bg-center h-screen p-4'>
      <h1 className='text-white text-center font-bold p-4 bg-black '>SignIn</h1>
      <div className=' flex flex-col gap-6 mx-auto max-w-sm bg-grad border border-white p-2 rounded-lg'>
       <form onSubmit={handleFormSubmit} className='flex flex-col gap-6 '>
          <input type='text' className='border-b border-gray-300 p-2 rounded-lg outline-0 text-white ' placeholder='email' id='email' onChange={handleFormData} />
          <input type='text' className='border-b border-gray-300 p-2 rounded-lg outline-0 text-white' placeholder='password' id='password' onChange={handleFormData} />
          <button disabled={loading} className='bg-blue-900 rounded-sm text-white p-2 hover:bg-gradient-to-tl from-blue-300 to-gray-500'>{loading?'...loading':'Signin'}</button>
          <OAuth/>
          {error && <div className='text-red-500 bg-black'>{error}</div>}
          <p className='text-white bg-black pl-2   '>Don't have an account ?<Link to='/signup'><span className='font-semibold hover:underline pl-2'>SignUp</span></Link></p>
       </form>
       </div>
      </div>
    )
}

export default Signin
