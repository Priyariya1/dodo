import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { AiOutlineUnlock } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase.config'
import { motion } from 'framer-motion'
import Login from './Login';
import Avatar from '../assets/google.png'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import {toast } from 'react-toastify'
import{register} from '../api'


const Register = () => {
  const [ email,setEmail] = useState('')
  const [password,setPassword]=useState('')
  const [ confirmPassword,setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async(e)=>{
    e.preventDefault()
    if(password!==confirmPassword){
      alert('Passwords do not match')
      return;
    }
    try {
      await register(email,password)
      alert('Registration sucessfully')
      navigate('/login')
    } catch (error) {
      alert('Registration failed')
    }
  }


function googleLogin(){
 const provider = new GoogleAuthProvider();
 signInWithPopup(auth, provider).then(async(result)=>{
  console.log(result)
  if(result.user){
    toast.success("User logged in Successfully",{
      position:"top-center",
    });
    window.location.href="/profile"
  }
 }).catch((error)=>{
  toast.error("Google login failed",{
  
  })
 })
}

  return (
    <div className='text-white h-[100vh] flex items-center justify-center bg-cover' style={{ 'backgroundImage': "url('../src/assets/back1.avif')" }}>
      <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className=' text-4xl text-white font-bold text-center mb-6'>Register</h1>
        <div>
          <form onSubmit={handleRegister}>
            <div className='relative my-4'>
              <input
                type='email'
                onChange={(e)=>setEmail(e.target.value)}
                className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' />
              <label htmlFor="" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus-text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                Your email
              </label>
              <BiUser className="absolute top-4 right-4" />
            </div>
            <div className='relative my-4'>
              <input
                type='password'
                onChange={(e)=>setPassword(e.target.value)}
                className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' />
              <label htmlFor="" className='absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus-text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                Your password
              </label>
              <AiOutlineUnlock className="absolute top-4 right-4" />
            </div>
            <div className='relative my-4'>
              <input
                type='password'
                onChange={(e)=>setConfirmPassword(e.target.value)}
                className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' />
              <label htmlFor="" className='absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus-text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                Your confirm password
              </label>
              <AiOutlineUnlock className="absolute top-4 right-4" />
            </div>
            <div>
              <button
                type='submit'
                className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300'>
                Register</button>
            </div>
            <div>
              <span className='m-4'>Already Created an Account? <Link className='text-blue-700' to="/login">Login</Link></span>
            </div>
            <p className='flex justify-center items-center my-4'>--Or continue with--</p>

            <div className='relative flex items-center justify-center cursor-pointer'>
              <motion.img
                whileTap={{ scale: 0.6 }}
                src={ Avatar}
                onClick={googleLogin}
                className='w-60 drop-shadow-xl'
                alt='userProfile' />
                
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register