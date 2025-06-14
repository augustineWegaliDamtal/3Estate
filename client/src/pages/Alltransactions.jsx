import { useState } from 'react'
import { useEffect } from 'react'
import {useReactTable,getCoreRowModel,flexRender} from '@tanstack/react-table';

const Alltransactions = () => {
  const [transactions,setTransaction] = useState([])
  const date = new Date();
  const [filters,setFilters] = useState({
    day:date.getDate(),
    month:date.getMonth() +1,
    year:date.getFullYear(),
    agent:'',
    customerId:'',
    deposit:'',
  });
  
  useEffect(()=>{
    const fetchTransactions = async()=>{
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const res = await fetch(`/api/transact/getDeposit?${queryParams}`);
        const data = await res.json();
        setTransaction(data);
      } catch (error) {
        console.log('error fetching transactions')
      }
    }
    fetchTransactions();
  },[filters]);
  const columns = [
    {accessorKey: "day",header:"day"},
    {accessorKey: "month",header:"month"},
    {accessorKey: "year",header:"year"},
    {accessorKey: "agent",header:"agent"},
    {accessorKey: "customerId",header:"customerId"},
    {accessorKey: "deposit",header:"deposit"},
    
  ]
  const table = useReactTable({
    data:transactions,
    columns ,
    getCoreRowModel:getCoreRowModel()
  });
  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Transaction Records</h1>
            <table className='table-auto w-full border-collapse border border-gray-300 '>
        <thead>
          <tr className='bg-gray-200'>
          {table.getHeaderGroups().map(headerGroup=>( 
              headerGroup.headers.map(header=>(
                <th key={header.column.id} className='border px-4 py-2'>
                  {flexRender(header.column.id,header.getContext())}
                </th>
              ))
          ))}
          </tr>
          
          <tr>
          {table.getHeaderGroups().map(headerGroup=>( 
              headerGroup.headers.map(header=>(
                <td key={header.column.id} className='border px-4 py-2'>
                <input 
                type={['day','month','year'].includes(header.column.id)?'number':'text'}
                placeholder={`Filter ${header.column.id}`}
                value={filters[header.column.id]||''}
                onChange={(e)=>{
                  const value = e.target.value
                  setFilters({...filters,
                  [header.column.id]:['day','month','year'].includes(header.column.id)?Number(value)||'':value
                  })
                  }}
                className='border p-2 w-full'
                />
                </td>
              ))
          ))}
          </tr>

        </thead>
        <tbody>
          {table.getRowModel().rows.map(row=>(
            <tr key={row.id} className='hover:bg-gray-100'>
              {row.getVisibleCells().map(cell=>(
                <td key={cell.id} className='border px-4 py-2'>
                  {flexRender(cell.getValue(),cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Alltransactions
