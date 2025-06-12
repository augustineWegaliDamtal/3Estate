import React, { useState } from 'react'

const Home = () => {
  const currentDate = new Date();
  const [formData,setFormData] = useState({
    day:currentDate.getDate(),
    month:currentDate.getMonth() + 1,
    year:currentDate.getFullYear(),
    deposit:'',
    customerId:'',
    agent:'',
  })
  const handleFormChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  console.log(formData)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const res = await fetch('/api/transact/deposit',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success==='false'){
        setError(data.message)
        setLoading(false)
      }
      setDeposit(data)
      setLoading(false)
      setError(false)
      navigate('/home')
    } catch (error) {
      setError(error.message)
        setLoading(false)
    }
  }
  return (
    <div className='bg-gray-100   '>
      <h1 className='text-center font-bold text-slate-700 uppercase'>Deposit Form</h1>
      <div>
      
        <form onSubmit={handleSubmit} className=' mx-auto max-w-sm flex flex-col gap-4 bg-green-800 p-6'>
          <div className='flex flex-col  text-slate-300'>
          <span>Agent</span>
    <select id='agent' value={formData.agent} onChange={handleFormChange} className='outline-0 border bg-white text-black border-gray-300 p-2 rounded-lg' placeholder=''>
      <option className='text-slate-600'>Select Agent</option>
      <option>2045</option>
      <option>2012</option>
    </select>
          </div>

          <div className='flex flex-col '>
            <span className='text-slate-300'>Customer ID</span>
              <input type='text'  id='customerId' value={formData.customerId} onChange={handleFormChange}
                className='outline-0 rounded-lg bg-white border border-gray-300 p-2' />
          </div>
          <div className='flex flex-col '>
          <span className='text-slate-300' >Day</span>
            <input type='number'  id='day' value={formData.day} onChange={handleFormChange}
            className='rounded-lg bg-white outline-0 border border-gray-300 p-2' />
          </div>
          <div className='flex flex-col '>
          <span className='text-slate-300'>Month</span>
            <input type='number'  id='month' value={formData.month} onChange={handleFormChange} className='outline-0 border border-gray-300 p-2 rounded-lg bg-white' />
          </div>
          <div className='flex flex-col '>
          <span className='text-slate-300'>Year</span>
            <input type='number'  id='year' value={formData.year} onChange={handleFormChange} className='outline-0 border border-gray-300 p-2 rounded-lg bg-white' />
          </div>
          <div className='flex flex-col '>
          <span className='text-white'>Deposit Amount</span>
            <input type='number'  id='deposit' value={formData.deposit} onChange={handleFormChange} className='outline-0 border border-gray-300 p-2 bg-white rounded-lg'   />
          </div>
          <button className='bg-slate-900 text-white p-2'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Home
