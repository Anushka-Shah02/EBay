import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth)
        {
        navigate('/');
        }
    })
    const handleLogin=async()=>{
        console.warn("Email,password",email,password)
        let result=await fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
        
     });
     result=await result.json();
     console.log(result);
     if(result.auth)
     {
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate("/");
     }else{
        alert("Please enter valid details");
     }
    }
    return (
    <div className='signup'>
      <h2 style={{marginTop:"20px",fontSize:"30px",color:"white"}}>Login</h2>
      <div className='log-box'>
      <input className='inputBox' value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter email'/>
      <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>
      <button onClick={handleLogin} type="button" className='addbtn'>Log In</button>
      </div>
    </div>
  )
}

export default Login
