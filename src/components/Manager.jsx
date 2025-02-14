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
       toast("Password Deleted!")
    }
  return (
    <>
    <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
      </div>
    </div>
    <div className=" p-2 md:p-0 md:mycontainer ">
        <h1 className="font-bold text-center text-2xl">
        <span className='text-green-400'>&lt;</span>
          PASS
          <span className='text-green-400'>-OP&gt;</span>
        </h1>
        <p className="text-center text-green-900 text-lg">Your own Massword Manager</p>
        <div className="flex flex-col p-4 gap-8 items-center">
         <input value={form.site} name="site" onChange={handleChange} type="text" placeholder="Enter Website URL"  className="rounded-full w-full border border-green-500  px-4 py-1"/>
         <div className="flex flex-col md:flex-row w-full justify-between gap-8">
         <input  value={form.username} name="username" onChange={handleChange} type="text" placeholder="Enter Username" className="rounded-full w-full  border border-green-500 my-3 px-4 py-1"/>
        <div className="relative">
        <input value={form.password} name="password" onChange={handleChange} ref={inputRef} type="password" placeholder="Enter Password" className="rounded-full  w-full border border-green-500 my-3 px-4 py-1"/>
        <span className="absolute right-[7px] top-[18px] cursor-pointer" onClick={showPassword}>
            <img  ref={imageRef} width={20} src="/icons/eye.png" alt="" />
        </span>
        </div>
         </div>
         <button  onClick={savePassword} className="w-32 flex text-black text-lg font-semibold bg-green-400  hover:bg-green-500 px-4 py-2 rounded-full ">
         <lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover"
    >
    </lord-icon>
            <span className=" mx-1">Save</span></button>
        </div>
        < div className="passwords">
        <h2 className="text-2xl font-bold my-3">Your password</h2>
        {savedPasswords.length===0&&<div className="font-semibold text-lg">No Password Saved Yet </div>}
        {savedPasswords.length!==0&&
        <table className="table-auto  rounded-md overflow-hidden md:w-full">
        <thead className="bg-green-600">
       <tr >
      <th className="py-2 w-40">Website</th>
      <th className="py-2 w-40">Username</th>
      <th className="py-2 w-40">Password</th>
      <th className="py-2 w-40">Actions</th>
    </tr>
  </thead>
  <tbody className="text-center bg-green-100">
   { savedPasswords.map((item,index)=>{
    return <tr key={index}>
    <td >
      <div className="flex items-center justify-center py-2">
      <a href={item.site}>{item.site}</a>
      <div className=" size-7 cursor-pointer lordcopy" onClick={()=>{copyText(item.site)}}>
      <lord-icon
    style={{"width":"25","height":"25","paddingTop":"3px","paddingLeft":"3px"}}
    src="https://cdn.lordicon.com/iykgtsbt.json"
    trigger="hover"
    >
    </lord-icon>
      </div>
      </div>
      </td>
    <td >
    <div className="flex items-center justify-center py-2">
    <div>{item.username}</div>
    <div className=" size-7 cursor-pointer lordcopy" onClick={()=>{copyText(item.username)}}>
      <lord-icon
    style={{"width":"25","height":"25","paddingTop":"3px","paddingLeft":"3px"}}
    src="https://cdn.lordicon.com/iykgtsbt.json"
    trigger="hover"
    >
    </lord-icon>
      </div>
    </div>
    </td>
    <td >
      <div className="flex items-center justify-center py-2">
      <div>{item.password}</div>
      <div className=" size-7 cursor-pointer lordcopy" onClick={()=>{copyText(item.password)}}>
      <lord-icon
    style={{"width":"25","height":"25","paddingTop":"3px","paddingLeft":"3px"}}
    src="https://cdn.lordicon.com/iykgtsbt.json"
    trigger="hover"
    >
    </lord-icon>
      </div>
      </div>
    </td>
    <td className="py-2">
      <div className="flex items-center justify-center">
      <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
        <lord-icon
        style={{"width":"20","height":"20"}}
        src="https://cdn.lordicon.com/gwlusjdu.json"
        trigger="hover"
        ></lord-icon>
      </span>
      <span className="cursor-pointer mx-1"onClick={()=>{deletePassword(item.id)}}>
      <lord-icon
        style={{"width":"20","height":"20"}}
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
}
        </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Manager;
