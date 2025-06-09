import React from 'react'
import { useState } from 'react'
import OAuth from '../Components/OAuth'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
  const [formData,setFormData] = useState({})
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const handleFormData = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  console.log(formData)
  const handleFormSubmit = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await  fetch('/api/auth/signup',{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success==='false'){
        setLoading(false)
        setError(data.message)
        return;
      }
      setLoading(false)
      setError(false)
     navigate('/home')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    
    <div style={{backgroundImage:'url(/london.jpg) ' }} className='bg-cover bg-center h-screen p-4'>
    <h1 className='text-white text-center font-bold p-4 bg-black '>SignUp</h1>
    <div className=' flex flex-col gap-6 mx-auto max-w-sm bg-grad border border-white p-2 rounded-lg'>
     <form onSubmit={handleFormSubmit} className='flex flex-col gap-6 '>
        <input type='text' className='border-b border-gray-300 p-2 rounded-lg outline-0 text-white' placeholder='username' id='username' onChange={handleFormData} />
        <input type='text' className='border-b border-gray-300 p-2 rounded-lg outline-0 text-white ' placeholder='email' id='email' onChange={handleFormData} />
        <input type='text' className='border-b border-gray-300 p-2 rounded-lg outline-0 text-white' placeholder='pasword' id='password' onChange={handleFormData} />
        <button disabled={loading} className='bg-blue-900 rounded-sm text-white p-2 hover:bg-gradient-to-tl from-blue-300 to-gray-500'>{loading?'...loading':'SignUp'}</button>
        <OAuth/>
        {error && <div className='text-red-500 bg-black'>{error}</div>}
        <p className='text-white bg-black pl-2   '>Have an account ?<Link to='/signin'><span className='font-semibold hover:underline pl-2'>Signin</span></Link></p>
     </form>
     </div>
    </div>
  )
}

export default Signup
