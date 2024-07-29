import React,{useState} from 'react'
import { Link,Navigate, useNavigate } from 'react-router-dom'
import {BiUser} from 'react-icons/bi'
import {AiOutlineUnlock } from 'react-icons/ai'
import Avatar from '../assets/google.png'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {  auth  } from '../firebase.config';
import { motion } from 'framer-motion';
import {toast } from 'react-toastify';
import {login} from '../api'


const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin =  async(e) =>{
    e.preventDefault()
    try {
      const response = await login(email,password);
      alert('Login successfully')
      localStorage.setItem('token',response.data.token)
      navigate('/profile')
    } catch (error) {
      alert('Login failed')
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
    })
   }
    
   return (
    <div className='text-white h-[100vh] flex items-center justify-center bg-cover ' style={{ 'backgroundImage': "url('../src/assets/back.avif')" }}>
      <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className=' text-4xl text-white font-bold text-center mb-6'>Login</h1>
        <div>
          <form onSubmit={handleLogin}>
            <div className='relative my-4'>
              <input
                type='email'
                onChange={(e)=>setEmail(e.target.value)}
                className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' />
              <label htmlFor=""  className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus-text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                Your email
                </label>
                <BiUser className="absolute top-4 right-4"/>
            </div>
            <div className='relative my-4'>
              <input
                type='password'
                onChange={(e)=>setPassword(e.target.value)}
                className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' />
              <label htmlFor="" className='absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus-text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                Your password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4"/>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <input type='checkbox' id='' name='' />
                <label htmlFor='Remeber Me'>Remeber Me</label>
              </div>
              <Link to='' className='text-blue-500'>Forget Password</Link>
            </div>

            <div>
              <button 
              type='submit' 
              className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300'>
                Login</button>
            </div>
            <div>
              <span className='m-4'>New here? <Link className='text-blue-700' to="/register">Create an Account</Link></span>
            </div>
            <p className='flex justify-center items-center my-4'>--Or continue with--</p>

            <div className='relative flex items-center justify-center cursor-pointer'>
              <motion.img
                whileTap={{ scale: 0.6 }}
                src={Avatar}
                onClick={googleLogin}
                className='w-60 '
                alt='userProfile' />
                
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login