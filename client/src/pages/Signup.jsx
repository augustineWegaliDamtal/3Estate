import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    
    <div style={{backgroundImage:'url(/london.jpg) ' }} className='bg-cover bg-center h-screen p-4'>
    <h1 className='text-white text-center font-bold p-4 bg-black '>SignUp</h1>
    <div className=' flex flex-col gap-6 mx-auto max-w-sm bg-grad border border-white p-2 rounded-lg'>
     <form className='flex flex-col gap-6 '>
        <input type='text' className='border-b border-gray-300 p-2 rounded-lg outline-0 text-white' placeholder='username' id='username'/>
        <input type='text' className='border-b border-gray-300 p-2 rounded-lg outline-0 text-white ' placeholder='email' id='email'/>
        <input type='text' className='border-b border-gray-300 p-2 rounded-lg outline-0 text-white' placeholder='pasword' id='password'/>
        <button className='bg-blue-900 rounded-sm text-white p-2 hover:bg-gradient-to-tl from-blue-300 to-gray-500'>SignUp</button>
        <p className='text-white bg-black pl-2   '>Have an account ?<Link to='/signin'><span className='font-semibold hover:underline pl-2'>Signin</span></Link></p>
     </form>
     </div>
    </div>
  )
}

export default Signup
