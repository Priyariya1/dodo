import React, { useState, useEffect } from 'react';
import { auth } from '../firebase.config'
import { Link } from 'react-router-dom'

function Profile() {
    const [userDetails, setUserDetails] = useState(null)
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            setUserDetails(user)
        })
    }
    useEffect(() => {
        fetchUserData()
    }, []);

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href="/"
            console.log("User logged out successfully")
        } catch (error) {
            console.error("Error logging out:", error.message)
        }
    }

    return (
        <div>
            {userDetails ? (
                <>
            
                <div className=' text-white h-[100vh] flex items-center justify-center  bg-cover '
                 style={{ 'backgroundImage': "url('../src/assets/bg1.avif')" }}>
                    <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
                    <img className=' flex items-center justify-center rounded-full w-40 p-1' src={userDetails.photoURL}></img>
                        <h3 className=' text-2xl text-white font-bold text-center mb-6 my-4'>
                            Welcome {userDetails.displayName} 
                            🙏🤗
                        </h3>
                        <div>
                            <p className=''>Email : {userDetails.email}</p>
                        </div>
                        <div className='flex items-center justify-center'>
                        <button className='btn btn-primary flex items-center justify-center  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-4'
                            onClick={handleLogout}>
                            Logout
                        </button>
                        <button className='btn btn-primary mx-4 flex items-center justify-center  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-4'> 
                       <Link to="/todo">To do</Link>
                        </button>
                    </div>
                    </div>
                </div>
                </>
            ) : (
                <p className='h-screen font-bold flex items-center justify-center'>Loading...</p>
            )}
        </div>

    );
};
export default Profile