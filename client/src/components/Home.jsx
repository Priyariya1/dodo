import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../assets/images.jpeg'
import '../components/style.css'


const Header = () => {
  return (
    <header>
    <div className="absolute mb-4 p-6  top-0 left-0 h-20">
   <img src={logo} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full "/>
   </div>
   

<div className=" grid w-full grid-cols-1 gap-2 md:grid-cols-2  mx-4"
      id="home">
        <div className="flex flex-col items-start justify-center flex-1 gap-4 py-2">
        <p className="text-[2rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
          Shedule Your Daily Tasks With {' '}
          <span className="text-blue-600 text-[3rem] lg:text-[5rem]">
             My Todos!! {''}
          </span>
         
        </p>
        <div className='btn-area p-4 mb-4 space-x-4 mx-6'>
            <button
              className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-l px-5 py-2.5 text-center me-2 mb-2 '>
             <Link to='/register'> Register</Link>
            </button>
            <button
              className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-l px-5 py-2.5 text-center me-2 mb-2'>
              <Link to ='/login'>Login</Link>
            </button>
          </div>
        </div>
      <div className='text-black h-[100vh] ml-auto absoulte inset-0 w-full max-w-2xl bg-opacity-75 bg-no-repeat  slide-down'  style={{ 'backgroundImage': "url('../src/assets/cartoon4.avif')" }}>
          
          </div>
          </div>
        
      </header>
  );
};

export default Header;

