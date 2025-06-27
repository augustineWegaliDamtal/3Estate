import { useState } from 'react'
import { useEffect } from 'react'
import {useReactTable,getCoreRowModel,flexRender} from '@tanstack/react-table';
import { Link } from 'react-router-dom';

const Alltransactions = () => {
 
  const date = new Date();
  const [filters,setFilters] = useState({
    day:'',
    month:'',
    year:'',
    agent:'',
    customerId:'',
    deposit:'',
    withdrawalAmount:"",
  }); 
   const [transactions,setTransactions] = useState([]);
   const [allData,setAllData] = useState([])
   const [totalWithdrawal,setTotalWithdrawal] = useState(0)
   const [balance,setBalance] = useState(0)
   const [totalDeposit,setTotalDeposit ] = useState(0)
 const handleDelete = async(id)=>{
  console.log('Frontrnd deleting ID:',id)
  try {
    const res = await fetch(`/api/transact/deleteTransactions/${id}`,{
      method:'DELETE',
    })
    const data = await res.json();
    console.log('server replied:',data.message)
    if(res.ok){
      setAllData(prev=>prev.filter(item=>item._id!==id));
    }else{
      console.error('delete request failed',data.message)
    }
  
  } catch (err) {
    console.error('error deleting transactions',err)
  }
  }
  useEffect(()=>{
    const fetchTransactions = async()=>{
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const resTx = await fetch(`/api/transact/getDeposit?${queryParams}`);
        const transactionss = await resTx.json();

        const resWd = await fetch('/api/transact/getwithdrawal');
        const withdrawals = await resWd.json();
        console.log('withdrawals:',withdrawals.map(wd=>wd.customerId))
        console.log('Transactions:',transactionss.map(tx=>tx.customerId))
        console.log('Withdrawals dataset:',withdrawals)

        const summedWithdrawals = withdrawals.reduce((acc,wd)=>{
          const key = `${wd.customerId}_${wd.day}_${wd.month}`;
          const amount = Number(wd.amount)||wd.withdrawal||0;
          if(!acc[key]){
            acc[key] = {
              customerId:wd.customerId,
              day:wd.day,
              month:wd.month,
              totalWithdrawal:amount
            };
          }else{
            acc[key].totalWithdrawal+=amount;
          }
          return acc;
        },{});
        const usedWithdrawalKeys = new Set();

        const merged = transactionss.map(tx=>{
const key = `${tx.customerId}_${tx.day}_${tx.month}`;
          const match = summedWithdrawals[key]
         let withdrawalAmount = 0;
         if(match&& !usedWithdrawalKeys.has(key)) {
          withdrawalAmount = match.totalWithdrawal;
          usedWithdrawalKeys.add(key)
         }
         return{
          ...tx,withdrawalAmount
         }
        }) 
        setAllData(merged);
      } catch (error) {
        console.log('error fetching transactions')
      }
   
    }
    fetchTransactions();
  },[]);
            useEffect(()=>{
              const filtered = allData.filter(item=>{

                const matchesWithdrawal = filters.withdrawalAmount
                ? Number(item.withdrawalAmount)=== Number(filters.withdrawalAmount) : true;

                const matchesMonth = filters.month
                ? Number(item.month)=== Number(filters.month) : true;

                const matchesDay = filters.day
                ? Number(item.day)=== Number(filters.day) : true;

                const matchesId = filters.customerId
                ? String(item.customerId).trim().toLowerCase()=== String(filters.customerId).trim().toLowerCase() : true;
                return matchesWithdrawal && matchesMonth && matchesDay && matchesId;
              });
              setTransactions(filtered)
            },[filters,allData])
   useEffect(()=>{
        if(!transactions.length) {
          setTotalDeposit(0);
          setTotalWithdrawal(0);
          setBalance(0);
          return;
        }
        const customerId = String(filters.customerId||'').trim();
        const filteredTransactions = customerId
        ?transactions.filter(tx=>String(tx.customerId).trim()===String(filters.customerId).trim()):transactions;

         const totalWithdrawal= filteredTransactions.reduce((sum,tx)=>sum + Number(tx.withdrawalAmount||0),0)
         const totalDeposit = filteredTransactions.reduce((sum,tx)=>sum + Number(tx.deposit||0),0)
        
         setTotalWithdrawal(totalWithdrawal);
         setTotalDeposit(totalDeposit);
        setBalance(totalDeposit-totalWithdrawal)
   },[transactions,filters.customerId])
  const columns = [
    {accessorKey: "day",header:"Day"},
    {accessorKey: "month",header:"Month"},
    {accessorKey: "year",header:"Year"},
    {accessorKey: "agent",header:"Agent"},
    {accessorKey: "customerId",header:"CustomerId"},
    {accessorKey: "deposit",header:"Deposit",
        footer:()=>`Total:${totalDeposit }`,
    },
    {accessorKey: "withdrawalAmount",header:"Withdrawal",
      footer:()=>`Total:${totalWithdrawal }`,
    },
    {
      header:'Actions',
      id:'actions',
      cell:({row})=>{
          console.log('Row data:',row.original)
          console.log('Row being deleted:',row.original)
        return(
        <button  onClick={()=>handleDelete(row.original._id)}>Delete</button>
        )

      },
    },
   
  ]
  
  const table = useReactTable({
    data:transactions,
    columns,
    getCoreRowModel:getCoreRowModel()
  });
  console.log('transaction',transactions)
 
  return (
    <div className='p-4 bg-gray-100 h-screen '>
      <h1 className='text-xl font-bold mb-4 text-center text-gray-700'>All Transaction Records</h1>
            <table className='table-auto w-full border-collapse border border-gray-300 '>
        <thead>
          <tr className='bg-gray-200'>
          {table.getHeaderGroups()[0].headers.map(header=>( 
                <th key={header.id} className='border px-4 py-2 border-gray-300 text-white bg-black'>
                  {flexRender(header.column.columnDef.header,header.getContext())}
                </th>
            ))}
          </tr>
          
          <tr>
          {table.getHeaderGroups().map(headerGroup=>( 
              headerGroup.headers.map(header=>(
                <td key={header.column.id} className='border px-4 py-2 border-gray-500 '>
                <input 
                type={['day','month','year','withdrawalAmount','customerId'].includes(header.column.id)?'number':'text'}
                placeholder={` ${header.column.id}`}
                value={filters[header.column.id]||''}
                onChange={(e)=>{
                  const value = e.target.value
                  setFilters({...filters,
                  [header.column.id]:['day','month','year','withdrawalAmount'].includes(header.column.id)?
                  Number(value)||'':value
                  })

                  }}
                className='border p-2 w-full border-gray-500 outline-blue-300 bg-white '
                style={{width:'100px'}}
                />
                </td>
              ))
          ))}
          </tr>

        </thead>
        <tbody>
          {table.getRowModel().rows.map(row=>(
            <tr key={row.id} className='hover:bg-gray-200'>
              {row.getVisibleCells().map(cell=>(
                <td key={cell.id} className='border px-4 py-2 border-gray-300 bg-black  text-white'
                style={{
                  backgroundColor: cell.column.id==='deposit' ? '#006400':
                  cell.column.id==='withdrawalAmount'?'#DC2626':'undefined',
                }}
                >
                  {flexRender(cell.column.columnDef.cell,cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
       
      </table>
       <div className='flex  gap-4 bg-black text-white font-bold w-full p-3 justify-between'>
            <span className='text-green-600 flex flex-row border p-2'>Total Deposit:   {totalDeposit}</span>
            <span className='text-blue-600 flex flex-row border p-2'>Balance: {balance}</span>
            <span className='text-red-600 flex flex-row border p-2 '> Withdrawals:    -{totalWithdrawal}</span>
            
          </div>
           <div className='flex justify-between hover:underline text-slate-600 '>
           <Link to='/home ' className=' hover:underline'>Deposit Form</Link>
            <Link to='/withdraw' className=' hover:underline'>Withdraws Form</Link>
         </div>
    </div>
  )
}

export default Alltransactions
