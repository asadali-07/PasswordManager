import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-slate-800 text-white fixed bottom-0 w-full py-2 sm:py-3 px-4'>
        <div className="logo font-bold text-sm sm:text-base md:text-lg">
        <span className='text-green-400'>&lt;</span>
          PASS
          <span className='text-green-400'>-OP&gt;</span>
          </div>
          <div className='flex items-center text-xs sm:text-sm md:text-base'>
            Created with  <img className='w-4 sm:w-5 mx-1' src="/icons/heart.png" alt="heart" />
             by ASAD ALI
          </div>
    </div>
  )
}

export default Footer