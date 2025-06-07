import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const [file,setFile] = useState(null);
  const fileRef = useRef();
  console.log(file)
  return (
    <div className='bg-slate-100 h-screen '>
      <h1 className='text-slate-700 text-center  font-bold uppercase'>Profile</h1>
      <form className='flex flex-col  mx-auto max-w-sm gap-4'>
        <div className='flex flex-col items-center'>
         <img className='rounded-full w-24 h-24' src={currentUser.avatar} onClick={(e)=>fileRef.current.click()}/>
         <input type='file' hidden onChange={(e)=>setFile(e.target.files[0])} ref={fileRef}/>
        </div>
        <input type='text' className='border border-gray-300 p-2 rounded-sm bg-white outline-0'id='username' defaultValue={currentUser.username} placeholder='username'/>
        <input type='text' className='border border-gray-300 p-2 rounded-sm bg-white outline-0'id='email' defaultValue={currentUser.email} placeholder='email'/>
        <input type='text' className='border border-gray-300 p-2 rounded-sm bg-white outline-0'id='password' placeholder='password'/>
        <button className='bg-blue-900 rounded-sm text-white p-2 hover:bg-gradient-to-tl from-blue-300 to-gray-500'>Update User Credentials</button>
      </form>
    </div>
  )
}

export default Profile
