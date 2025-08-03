import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
        <div className="mycontainer flex justify-between items-center text-white py-3 sm:py-5 h-12 sm:h-14 px-4 sm:px-6">
        <div className="logo font-bold text-base sm:text-lg md:text-xl">
        <span className='text-green-400'>&lt;</span>
          PASS
          <span className='text-green-400'>-OP&gt;</span>
          </div>
         <a className='rounded-xl p-1 sm:p-2 hover:ring-green-400 transition-all' href="https://github.com/asadali-07/PasswordManager" target='_blank'> 
           <img className="w-6 sm:w-8 md:w-10 invert hover:scale-110 transition-all" src="/icons/github.svg" alt="github" />
         </a>
        </div>
    </nav>
  )
}

export default Navbar