import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800'>
        <div className="mycontainer flex justify-between  items-center text-white py-5 h-14 ">
        <div className="logo font-bold text-lg">
        <span className='text-green-400'>&lt;</span>
          PASS
          <span className='text-green-400'>-OP&gt;</span>
          </div>
         <a className='ring-1 ring-white rounded-xl' href="https://github.com/asadali-07/CODSOFT" target='__blank'> <img  className=" w-10 invert hover:w-11 transition-all"src="/icons/github.svg" alt="github" /></a>
        </div>
    </nav>
  )
}

export default Navbar