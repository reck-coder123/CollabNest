"use client"
import React, { useState } from 'react'
import axios from 'axios';
import Input from '@mui/joy/Input';
import styles from './styles.module.css'
import Button from '@mui/joy/Button';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import { Alert } from '@mui/material';
import { toast } from "react-hot-toast";




const Signup = () => {
  const [user, setUser]= React.useState({
    name:"",
    email:"",
    password:"",
    confirm_password:"",
  })


  // const [buttonDisabled, setButtonDisabled] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);
  const [msg, setMsg]=useState("");
  const [error, setError]=useState("");

  const onSignup = async()=>{
    try {
      // setLoading(true);
      const response=await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      console.log(response.data.message);
      setMsg(response.data.message);
    } catch (error) {
      console.log("Signup failed", error);

      setError(error);

      toast.error(error.message);
      
    } finally{
      // setLoading(false);
    }
  }

  // useEffect(()=>{
  //   if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
  //     setButtonDisabled(false);
  // } else {
  //     setButtonDisabled(true);
  // }
  // },[user]);
  
  return (
    
    <div className={styles.main}>
      {msg.length>0? (
        <>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {msg}
      </Alert>
        </>
      ):(
        <></>
      )}

      {error.length>0? (
        <>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            {error}
      </Alert>
        </>
      ):(
        <></>
      )}
  <div className="nav h-auto w-full flex flex-row justify-between font-inconsolata p-10">
    <div className="title">
      <p className="text-2xl">Welcome to ...</p>
      <h1 className="text-6xl text-yellow-300">
        <span className="text-blue-900">Collab</span>Nest
      </h1>
    </div>
    <div className="icon">
      <CancelIcon />
    </div>
  </div>

  <div className="main_form w-full flex flex-row flex-grow">
    <div className="left w-1/2 h-full bg-black flex flex-col gap-3 items-center justify-center">

    <Input placeholder="Name…" 
           id='name' 
           type='text' 
           value={user.name} 
           onChange={(e)=>setUser({...user, name:e.target.value})}
           variant="solid" 
           className='w-5/6'
    />
    <Input placeholder="Email…" 
           variant="solid" 
           className='w-5/6'
           id='email'
           type='text'
           value={user.email}
           onChange={(e)=> setUser({...user, email: e.target.value})}
           />
    <Input placeholder="Password…" 
           variant="solid" 
           className='w-5/6'
           id='password'
           type='password'
           value={user.password}
           onChange={(e)=> setUser({...user, password:e.target.value})}
           />
    <Input placeholder="Confirm Password…" 
           variant="solid" 
           className='w-5/6'
           id='confirm_password'
           type='password'
           value={user.confirm_password}
           onChange={(e)=>setUser({...user, confirm_password: e.target.value})}
           />

    <Button color='success' onClick={onSignup}>sign up</Button>
    </div>
    <div className="or flex flex-col justify-center items-center">
      <span className='w-0.5 h-28 bg-white'></span>
      or
      <span className='w-0.5 h-28 bg-white'></span>
    </div>
    <div className="right w-1/2 h-full bg-black flex flex-col justify-center items-center gap-6">
      <div className="google w-52 h-10 bg-slate-500 rounded-lg flex justify-center items-center">
        <GoogleIcon />
        Sign in with Google
      </div>

      <div className="linkedin w-52 h-10 bg-slate-500 rounded-lg flex justify-center items-center">
        <LinkedInIcon />
        Sign in with Linkedin
      </div>

    </div>
  </div>
</div>

  )
}

export default Signup
