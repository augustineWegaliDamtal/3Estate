import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const [file,setFile] = useState(null);
  const fileRef = useRef();
  const [formData,setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(()=>{
    if(file){
      storeImges(file)
    }
  },[file])
  const storeImges = async(file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime()+ file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log('progress is '+progress+'% done')
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormData({...formData,avatar:downloadURL})
        })
      }
    )
  }
  const handleFormChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      updateUserStart()
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success==='false'){
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleFormDelete = async(e)=>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      })
      const data = await res.json();
      if(data.success==='false'){
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
      navigate('/signup')
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignOut = async(e)=>{
    try {
      const res = await fetch('/api/auth/signout',{
        method:'POST'
      })
      const data = await res.json();
      if(data.success==='false'){
        dispatch(signoutUserFailure(data.message))
        return;
      }
      dispatch(signoutUserSuccess(data))
      navigate('/signin')
    } catch (error) {
      dispatch(signoutUserFailure(error.message))
    }
  }
  return (
    <div className='bg-slate-100 h-screen '>
      <h1 className='text-slate-700 text-center  font-bold uppercase'>Profile</h1>
      <form onSubmit={handleUpdate} className='flex flex-col  mx-auto max-w-sm gap-4'>
        <div className='flex flex-col items-center'>
         <img className='rounded-full w-24 h-24' src={formData.avatar||currentUser.avatar} onClick={(e)=>fileRef.current.click()}/>
         <input type='file' hidden onChange={(e)=>setFile(e.target.files[0])} ref={fileRef}/>
        </div>
        <input type='text' className='border border-gray-300 p-2 rounded-sm bg-white outline-0'id='username' onChange={handleFormChange} defaultValue={currentUser.username} placeholder='username'/>
        <input type='text' className='border border-gray-300 p-2 rounded-sm bg-white outline-0'id='email' onChange={handleFormChange} defaultValue={currentUser.email} placeholder='email'/>
        <input type='text' className='border border-gray-300 p-2 rounded-sm bg-white outline-0'id='password' onChange={handleFormChange} placeholder='password'/>
        <button className='bg-blue-900 rounded-sm text-white p-2 hover:bg-gradient-to-tl from-blue-300 to-gray-500'>Update User Credentials</button>
        <div className='flex justify-between '>
          <button className='hover:underline text-slate-600'type='button' onClick={handleFormDelete}>Delete Account</button>
        <button className='text-red-500 hover:underline' type='button' onClick={handleSignOut}>SignOut</button>
        </div>
      </form>
    </div>
  )
}

export default Profile
