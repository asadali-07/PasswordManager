import React, { useRef,useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const imageRef=useRef()
    const inputRef=useRef()
    const [form, setform] = useState({site:'',username:'',password:''})
    const [savedPasswords, setSavedPasswords] = useState([])
    useEffect(() => {
      const savedPasswords = JSON.parse(localStorage.getItem('passwords'))
    if(savedPasswords){
      setSavedPasswords(savedPasswords)
    }
    }, [])
    
    
    const showPassword=()=>{
        inputRef.current.type = inputRef.current.type === 'password'? 'text' : 'password';
        if(imageRef.current.src.includes("/icons/eye.png")){
            imageRef.current.src = "/icons/eyecross.png";
        }else{
            imageRef.current.src = "/icons/eye.png";
        }
    }
    const savePassword=()=>{
      if(form.site.trim()==='' || form.username.trim()==='' || form.password.trim()===''){
        toast.error("All fields are required")
        return
      }
        setSavedPasswords([...savedPasswords,{...form, id:uuidv4()}])
        localStorage.setItem("passwords",JSON.stringify([...savedPasswords,{...form, id:uuidv4()}]))
        setform({site:'',username:'',password:''})
        toast("Password Saved !")
    }
    const handleChange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const copyText=(text)=>{
      navigator.clipboard.writeText(text)
      toast("Copied to clipboard")
    }
    const editPassword=(id)=>{
    setform(savedPasswords.filter(item=>item.id===id)[0])
    setSavedPasswords(savedPasswords.filter(item=>item.id!==id))
    }
    const deletePassword=(id)=>{
      let c=confirm("Do you really want to delete password ?")
       if(c){
        setSavedPasswords(savedPasswords.filter(item=>item.id!==id))
        localStorage.setItem("passwords",JSON.stringify(savedPasswords.filter(item=>item.id!==id)))
       }
       toast("Password Deleted Successfully!")
    }
  return (
    <>
    <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] md:h-[310px] md:w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
      </div>
    </div>
    <div className="p-3 sm:p-4 md:p-0 md:mycontainer min-h-screen">
        <h1 className="font-bold text-center text-xl sm:text-2xl md:text-3xl mt-4 sm:mt-6">
        <span className='text-green-400'>&lt;</span>
          PASS
          <span className='text-green-400'>-OP&gt;</span>
        </h1>
        <p className="text-center text-green-900 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">Your own Password Manager</p>
        
        <div className="flex flex-col p-2 sm:p-4 gap-4 sm:gap-6 md:gap-8 items-center">
         <input value={form.site} name="site" onChange={handleChange} type="text" placeholder="Enter Website URL"  className="rounded-full w-full border border-green-500 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-300"/>
         
         <div className="flex flex-col lg:flex-row w-full justify-between gap-4 sm:gap-6 lg:gap-8">
         <input  value={form.username} name="username" onChange={handleChange} type="text" placeholder="Enter Username" className="rounded-full w-full border border-green-500 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-300"/>
        <div className="relative w-full">
        <input value={form.password} name="password" onChange={handleChange} ref={inputRef} type="password" placeholder="Enter Password" className="rounded-full w-full border border-green-500 px-3 py-2 sm:px-4 sm:py-2 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-300"/>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={showPassword}>
            <img  ref={imageRef} className="w-4 h-4 sm:w-5 sm:h-5" src="/icons/eye.png" alt="toggle password visibility" />
        </span>
        </div>
         </div>
         
         <button  onClick={savePassword} className="w-28 sm:w-32 md:w-36 flex justify-center items-center text-black text-sm sm:text-base md:text-lg font-semibold bg-green-400 hover:bg-green-500 px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-colors duration-200">
         <lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover"
    style={{"width":"20px","height":"20px"}}
    >
    </lord-icon>
            <span className="ml-2">Save</span></button>
        </div>
        
        <div className="passwords mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold my-3 sm:my-4">Your Passwords</h2>
        {savedPasswords.length===0&&<div className="font-semibold text-base sm:text-lg text-center py-8">No Passwords Saved Yet</div>}
        {savedPasswords.length!==0&&
        <div className="overflow-x-auto">
        <table className="table-auto rounded-md overflow-hidden w-full min-w-[600px]">
        <thead className="bg-green-600 text-white">
       <tr>
      <th className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base">Website</th>
      <th className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base">Username</th>
      <th className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base">Password</th>
      <th className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm md:text-base">Actions</th>
    </tr>
  </thead>
  <tbody className="text-center bg-green-100">
   { savedPasswords.map((item,index)=>{
    return <tr key={index} className="border-b border-green-200 hover:bg-green-50">
    <td className="py-2 px-2 sm:py-3 sm:px-4">
      <div className="flex items-center justify-center gap-1 sm:gap-2">
      <a href={item.site} className="text-blue-600 hover:underline text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px]" target="_blank" rel="noopener noreferrer">{item.site}</a>
      <div className="cursor-pointer flex-shrink-0" onClick={()=>{copyText(item.site)}}>
      <lord-icon
    style={{"width":"18px","height":"18px"}}
    src="https://cdn.lordicon.com/iykgtsbt.json"
    trigger="hover"
    >
    </lord-icon>
      </div>
      </div>
      </td>
    <td className="py-2 px-2 sm:py-3 sm:px-4">
    <div className="flex items-center justify-center gap-1 sm:gap-2">
    <div className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px]">{item.username}</div>
    <div className="cursor-pointer flex-shrink-0" onClick={()=>{copyText(item.username)}}>
      <lord-icon
    style={{"width":"18px","height":"18px"}}
    src="https://cdn.lordicon.com/iykgtsbt.json"
    trigger="hover"
    >
    </lord-icon>
      </div>
    </div>
    </td>
    <td className="py-2 px-2 sm:py-3 sm:px-4">
      <div className="flex items-center justify-center gap-1 sm:gap-2">
      <div className="text-xs sm:text-sm">{"*".repeat(item.password.length)}</div>
      <div className="cursor-pointer flex-shrink-0" onClick={()=>{copyText(item.password)}}>
      <lord-icon
    style={{"width":"18px","height":"18px"}}
    src="https://cdn.lordicon.com/iykgtsbt.json"
    trigger="hover"
    >
    </lord-icon>
      </div>
      </div>
    </td>
    <td className="py-2 px-2 sm:py-3 sm:px-4">
      <div className="flex items-center justify-center gap-1 sm:gap-2">
      <span className="cursor-pointer hover:scale-110 transition-transform" onClick={()=>{editPassword(item.id)}}>
        <lord-icon
        style={{"width":"18px","height":"18px"}}
        src="https://cdn.lordicon.com/gwlusjdu.json"
        trigger="hover"
        ></lord-icon>
      </span>
      <span className="cursor-pointer hover:scale-110 transition-transform" onClick={()=>{deletePassword(item.id)}}>
      <lord-icon
        style={{"width":"18px","height":"18px"}}
        src="https://cdn.lordicon.com/skkahier.json"
        trigger="hover"
        ></lord-icon>
      </span>
      </div>
    </td>
  </tr>
   })}
  </tbody>
</table>
</div>
}
        </div>
    </div>
    <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="text-sm"
    />
    </>
  );
};

export default Manager;