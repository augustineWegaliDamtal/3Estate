import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { signinSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
const OAuth = () => {
  const dispatch = useDispatch()
  const handleGoogleClick = async(e)=>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth,provider);
    console.log(result)
    const res = await fetch('/api/auth/google',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:result.user.displayName,
        email:result.user.email,
        photo:result.user.photoURL
      })
    })
    const data = await res.json();
    dispatch(signinSuccess(data))
  }
  return (
    <div>
      <div className='flex relative'>
        <button type='button' onClick={handleGoogleClick} className='bg-pink-900 rounded-sm w-full text-white p-2 hover:bg-gradient-to-tl from-blue-300 to-gray-500'>Continue with Google</button>
        <img src='google.png' className='absolute -translate-y-1/2 ml-15 w-8 h-8 mt-5'/>
      </div>
    </div>
  )
}

export default OAuth
