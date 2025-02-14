import React from 'react'

const Footer = () => {
  return (
    <div className=' flex flex-col items-center justify-center bg-slate-800 text-white fixed bottom-0 w-full'>
        <div className="logo font-bold text-lg">
        <span className='text-green-400'>&lt;</span>
          PASS
          <span className='text-green-400'>-OP&gt;</span>
          </div>
          <div className='flex'>
            Created with  <img className='w-5 mx-1' src="/icons/heart.png" alt="" />
             by ASAD ALI
          </div>
    </div>
  )
}

export default Footer