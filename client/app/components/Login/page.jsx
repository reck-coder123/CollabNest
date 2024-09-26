import React from 'react'
import Input from '@mui/joy/Input';
import styles from './styles.module.css'
import Button from '@mui/joy/Button';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CancelIcon from '@mui/icons-material/Cancel';



const Login = () => {
  
  return (
    <div className={styles.main}>
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

    
    <Input placeholder="Email…" variant="solid" className='w-5/6'/>
    <Input placeholder="Password…" variant="solid" className='w-5/6'/>
    

    <Button color='success'>Sign in</Button>
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

export default Login
