// import { useState, useEffect } from 'react'
// import React from 'react';
// import { MdLogout } from "react-icons/md";
// import { motion } from "framer-motion";
// import Avatar from '../assets/avatar.jpeg'
// import { AiOutlineDelete, AiOutlineEdit, } from 'react-icons/ai';
// import { BsCheckLg } from 'react-icons/bs'
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from "../firebase.config";

// import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../context/reducer";


// function Todo() {
//   const [isCompleteScreen, setIsCompleteScreen] = useState(false)
//   const [allTodos, setTodos] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState('')
//   const [completedTodos, setCompletedTodos] = useState([])
//   const [currentEdit, setCurrentEdit] = useState("")
//   const [currentEditedItem, setCurrentEditedItem] = useState('')


//   const handleAddTodo = () => {
//     let newTodoItem = {
//       title: newTitle,
//       description: newDescription
//     }

//     let updatedTodoArr = [...allTodos];
//     updatedTodoArr.push(newTodoItem);
//     setTodos(updatedTodoArr);
//     localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
//   };

//   const handleDeleteTodo = index => {
//     let reducedTodo = [...allTodos];
//     reducedTodo.splice(index, 1);

//     localStorage.setItem('todolist', JSON.stringify(reducedTodo));
//     setTodos(reducedTodo);
//   };


//   const handleComplete = index => {
//     let now = new Date();
//     let dd = now.getDate();
//     let mm = now.getMonth() + 1;
//     let yyyy = now.getFullYear();
//     let h = now.getHours();
//     let m = now.getMinutes();
//     let s = now.getSeconds();
//     let completedOn =
//       dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

//     let filteredItem = {
//       ...allTodos[index],
//       completedOn: completedOn,
//     };

//     let updatedCompletedArr = [...completedTodos];
//     updatedCompletedArr.push(filteredItem);
//     setCompletedTodos(updatedCompletedArr);
//     handleDeleteTodo(index)
//     localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
//   }

//   const handleDeleteCompletedTodo = (index) => {
//     let reducedTodo = [...completedTodos];
//     reducedTodo.splice(index);

//     localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
//     setCompletedTodos(reducedTodo);
//   }

//   useEffect(() => {
//     let savedTodo = JSON.parse(localStorage.getItem('todolist'))
//     let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
//     if (savedTodo) {
//       setTodos(savedTodo)
//     }

//     if (savedCompletedTodo) {
//       setCompletedTodos(savedCompletedTodo);
//     }
//   }, [])

//   const handleEdit = (ind, item) => {
//     console.log(ind)
//     setCurrentEdit(ind)
//     setCurrentEditedItem(item);
//   }

//   const handleUpdateTitle = (value) => {
//     setCurrentEditedItem((prev) => {
//       return { ...prev, title: value }
//     })
//   }

//   const handleUpdateDescription = (value) => {
//     setCurrentEditedItem((prev) => {
//       return { ...prev, description: value }
//     })
//   }

//   const handleUpdateTodo = () => {
//     let newToDo = [...allTodos];
//     newToDo[currentEdit] = currentEditedItem;
//     setTodos(newToDo)
//     setCurrentEdit("")
//   }

//   const firebaseAuth = getAuth(app);
//   const provider = new GoogleAuthProvider();

//   const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

//   const [isMenu, setIsMenu] = useState(false);

//   const login = async () => {
//     if (!user) {
//       const {
//         user: { refreshToken, providerData },
//       } = await signInWithPopup(firebaseAuth, provider);
//       dispatch({
//         type: actionType.SET_USER,
//         user: providerData[0],
//       });
//       localStorage.setItem("user", JSON.stringify(providerData[0]));
//     } else {
//       setIsMenu(!isMenu);
//     }
//   };

//   const logout = () => {
//     setIsMenu(false);
//     localStorage.clear();

//     dispatch({
//       type: actionType.SET_USER,
//       user: null,
//     });
//   };

//   return (
//     <header>
//       <div className="absolute mb-4 p-6  top-0 right-0 h-20">
//         <motion.img
//           whileTap={{ scale: 0.6 }}
//           src={user ? user.photoURL : Avatar}
//           className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full "
//           alt="userprofile"
//           onClick={login}
//         />
//       </div>
//       <h1
//             className='font-bold text-black text-center flex items-center justify-center  text-4xl p-6 '>
//             My Todos
//           </h1>

//       <div className='text-white h-[100vh] flex items-center justify-center bg-cover'>
//         <div className=' App '>



//           <div className='todo-wrapper bg-slate-800 mx-auto w-fit mt-3% overflow-y-auto h-[80%] border border-slate-400 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative '>
//             <div className='todo-input  flex items-center justify-center pb-6 mb-6'>
//               <div className='todo-input-item flex flex-col items-start mr-6 '>
//                 <lable className="text-xl font-medium text-gray-900 dark:text-black block mb-2.5">
//                   Title
//                 </lable>
//                 <input
//                   className="shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                   type='text'
//                   value={newTitle}
//                   onChange={(e) => setNewTitle(e.target.value)}
//                   placeholder="What's the task title?">
//                 </input>
//               </div>
//               <div className='todo-input-item  flex flex-col items-start mr-6 '>
//                 <lable
//                   className=" text-xl font-medium text-gray-900 dark:text-black block mb-2">
//                   Description
//                 </lable>
//                 <input
//                   className='shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
//                   type='text'
//                   value={newDescription}
//                   onChange={(e) => setNewDescription(e.target.value)}
//                   placeholder="What's the task Description?">
//                 </input>

//               </div>
//               <div className='todo-input-item  flex flex-col items-start mr-6  '>
//                 <button
//                   type="button"
//                   onClick={handleAddTodo}
//                   className=' text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10  p-2.5' >
//                   Add
//                 </button>
//               </div>
//             </div>
//             <div className='btn-area mb-3.5'>
//               <button
//                 className='{`secondaryBtn ${isCompleteScreen === false && "active"}`} text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '
//                 onClick={() => setIsCompleteScreen(false)}
//               >
//                 To do
//               </button>
//               <button
//                 className='{`secondaryBtn ${isCompleteScreen === true && "active"}`} text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
//                 onClick={() => setIsCompleteScreen(true)}>

//                 Completed
//               </button>
//             </div>
//             <div className='todo-list flex flex-col'>

//               {isCompleteScreen === false &&
//                 allTodos.map((item, index) => {
//                   if (currentEdit === index) {
//                     return (
//                       <div
//                         key={index}
//                         className='p-5 pb-2.5 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80   flex flex-col text-black pt-2.5 mb-2.5 '>
//                         <input
//                           className='border border-solid border-gray-300 p-2.5 m-1.5 rounded-sm'
//                           placeholder='Updated Title'

//                           onChange={(e) => handleUpdateTitle(e.target.value)}
//                           value={currentEditedItem.title} />
//                         <textarea
//                           placeholder='Updated Description'
//                           rows={4}
//                           onChange={(e) => handleUpdateDescription(e.target.value)}
//                           value={currentEditedItem.description} />
//                         <div className='todo-input-item  flex items-center justify-center flex-col  mr-4  '>
//                           <button
//                             type="button"
//                             onClick={handleUpdateTodo}
//                             className=' text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6  p-2.5' >
//                             Update
//                           </button>
//                         </div>
//                       </div>
//                     )
//                   } else {

//                   }
//                   return (
//                     <div
//                       key={index}
//                       className='todo-list-item  flex justify-between items-center p-5 pb-2.5  text-white bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 pt-2.5 mb-2.5 '>
//                       <div>
//                         <h3 className='text-xl text-green-500 font-bold m-0'>
//                           {item.title}</h3>
//                         <p className='text-lg text-slate-400 mt-2'>
//                           {item.description}</p>
//                       </div>

//                       <div className='flex'>
//                         <AiOutlineDelete
//                           onClick={() => handleDeleteTodo(index)}
//                           className='icon text-3xl  cursor-pointer hover:text-red-700'
//                           title='Delete?' />
//                         <BsCheckLg
//                           onClick={() => handleComplete(index)}
//                           className="check-icon text-3xl font-bold  ml-2.5 text-green-500 cursor-pointer hover:text-green-600"
//                           title='Complete?' />
//                         <AiOutlineEdit
//                           onClick={() => handleEdit(index, item)}
//                           className='text-2xl font-bold  ml-2.5 text-white cursor-pointer hover:text-blue-600'
//                           title='Edit?' />
//                           <BsThreeDotsVertical  
//                           className='text-xl font-bold  ml-2.5 text-white cursor-pointer hover:text-black'
//                           title='Date & time?'/>
//                       </div>
//                     </div>
//                   )
//                 })}

//               {isCompleteScreen === true &&
//                 completedTodos.map((item, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className='todo-list-item  flex justify-between items-center p-5 pb-2.5  text-white bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 pt-2.5 mb-2.5 '>
//                       <div>
//                         <h3 className='text-xl text-green-500 font-bold m-0'>
//                           {item.title}</h3>
//                         <p className='text-lg text-slate-400 mt-2'>
//                           {item.description}</p>
//                         <p><small>Completed on:{item.completedOn}</small></p>
//                       </div>

//                       <div className='flex'>
//                         <AiOutlineDelete
//                           onClick={() => handleDeleteCompletedTodo(index)}
//                           className='icon text-4xl  cursor-pointer hover:text-red-700'
//                           title='Delete?' />

//                       </div>
//                     </div>
//                   )
//                 })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Todo


// import { useState, useEffect } from 'react';
// import React from 'react';
// import { MdLogout } from "react-icons/md";
// import { motion } from "framer-motion";
// import Avatar from '../assets/avatar.jpeg';
// import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
// import { BsCheckLg, BsThreeDotsVertical } from 'react-icons/bs';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from "../firebase.config";
// import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../context/reducer";
// import empty from '../assets/empty.png'
// import DatePicker from './DateTimePicker'

// function Todo() {
//   const [isCompleteScreen, setIsCompleteScreen] = useState(false);
//   const [allTodos, setTodos] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState('');
//   const [completedTodos, setCompletedTodos] = useState([]);
//   const [currentEdit, setCurrentEdit] = useState("");
//   const [currentEditedItem, setCurrentEditedItem] = useState('');
//   const [dateTime, setDateTime] = useState(new Date()); 


//   const handleAddTodo = () => {
//     let newTodoItem = {
//       title: newTitle,
//       description: newDescription,
//       dateTime: dateTime
//     };

//     let updatedTodoArr = [...allTodos];
//     updatedTodoArr.push(newTodoItem);
//     setTodos(updatedTodoArr);
//     localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
//   };

//   const handleDeleteTodo = index => {
//     let reducedTodo = [...allTodos];
//     reducedTodo.splice(index, 1);

//     localStorage.setItem('todolist', JSON.stringify(reducedTodo));
//     setTodos(reducedTodo);
//   };

//   const handleComplete = index => {
//     let now = new Date();
//     let dd = now.getDate();
//     let mm = now.getMonth() + 1;
//     let yyyy = now.getFullYear();
//     let h = now.getHours();
//     let m = now.getMinutes();
//     let s = now.getSeconds();
//     let completedOn =
//       dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

//     let filteredItem = {
//       ...allTodos[index],
//       completedOn: completedOn,
//     };

//     let updatedCompletedArr = [...completedTodos];
//     updatedCompletedArr.push(filteredItem);
//     setCompletedTodos(updatedCompletedArr);
//     handleDeleteTodo(index);
//     localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
//   };

//   const handleDeleteCompletedTodo = (index) => {
//     let reducedTodo = [...completedTodos];
//     reducedTodo.splice(index,1);

//     localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
//     setCompletedTodos(reducedTodo);
//   };

//   useEffect(() => {
//     let savedTodo = JSON.parse(localStorage.getItem('todolist'));
//     let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
//     if (savedTodo) {
//       setTodos(savedTodo);
//     }

//     if (savedCompletedTodo) {
//       setCompletedTodos(savedCompletedTodo);
//     }
//   }, []);

//   const handleEdit = (ind, item) => {
//     setCurrentEdit(ind);
//     setCurrentEditedItem(item);
//   };

//   const handleUpdateTitle = (value) => {
//     setCurrentEditedItem((prev) => {
//       return { ...prev, title: value };
//     });
//   };

//   const handleUpdateDescription = (value) => {
//     setCurrentEditedItem((prev) => {
//       return { ...prev, description: value };
//     });
//   };

//   const handleUpdateTodo = () => {
//     let newToDo = [...allTodos];
//     newToDo[currentEdit] = currentEditedItem;
//     setTodos(newToDo);
//     setCurrentEdit("");
//   };

//   const firebaseAuth = getAuth(app);
//   const provider = new GoogleAuthProvider();

//   const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

//   const [isMenu, setIsMenu] = useState(false);

//   const login = async () => {
//     if (!user) {
//       const {
//         user: { refreshToken, providerData },
//       } = await signInWithPopup(firebaseAuth, provider);
//       dispatch({
//         type: actionType.SET_USER,
//         user: providerData[0],
//       });
//       localStorage.setItem("user", JSON.stringify(providerData[0]));
//     } else {
//       setIsMenu(!isMenu);
//     }
//   };

//   const logout = () => {
//     setIsMenu(false);
//     localStorage.clear();

//     dispatch({
//       type: actionType.SET_USER,
//       user: null,
//     });
//   };

//   return (
//     <header>
//       <div className='min-h-screen flex flex-col bg-cover 'style={{ 'backgroundImage': "url('../src/assets/bg6.webp')" }}>
//       <div className="absolute mb-4 p-6  top-0 right-0 h-20 ">
//         <motion.img
//           whileTap={{ scale: 0.6 }}
//           src={user ? user.photoURL : Avatar}
//           className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full "
//           alt="userprofile"
//           onClick={login}
//         />
//       </div>
//       <h1 className='font-bold text-black text-center flex items-center justify-center text-4xl p-6 '>
//         My Todos
//       </h1>


//       <div className='text-white min-h-screen h-[100vh] flex items-center justify-center  '>
//         <div className='App flex items-center justify-center '>

//           <div className='todo-wrapper  bg-slate-800 mx-auto w-fit mt-[3%] overflow-y-auto   h-[80%] border border-slate-400 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
//             <div className='todo-input flex items-center justify-center pb-6 mb-6'>
//               <div className='todo-input-item flex flex-col items-start mr-6'>
//                 <label className="text-xl font-medium text-gray-900 dark:text-black block mb-2.5">
//                   Title
//                 </label>
//                 <input
//                   className="shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//                   type='text'
//                   value={newTitle}
//                   onChange={(e) => setNewTitle(e.target.value)}
//                   placeholder="What's the task title?"
//                 />
//               </div>
//               <div className='todo-input-item flex flex-col items-start mr-6'>
//                 <label className="text-xl font-medium text-gray-900 dark:text-black block mb-2">
//                   Description
//                 </label>
//                 <input
//                   className='shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
//                   type='text'
//                   value={newDescription}
//                   onChange={(e) => setNewDescription(e.target.value)}
//                   placeholder="What's the task description?"
//                 />
//               </div>

//               <div className='todo-input-item flex flex-col items-start mr-6'>
//                 <button
//                   type="button"
//                   onClick={handleAddTodo}
//                   className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10 p-2.5'>
//                   Add
//                 </button>
//               </div>
//             </div>
//             <div className='btn-area mb-3.5'>
//               <button
//                 className='{`secondaryBtn ${isCompleteScreen === false && "active"}`} text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
//                 onClick={() => setIsCompleteScreen(false)}>
//                 All todos
//               </button>
//               <button
//                 className='{`secondaryBtn ${isCompleteScreen === true && "active"}`} text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
//                 onClick={() => setIsCompleteScreen(true)}>
//                 Completed todos
//               </button>
//             </div>
//             <div>
//               {isCompleteScreen ? (
//                 <ul>
//                   {completedTodos.map((item, ind) => {
//                     return (
//                       <div key={ind} className='text-white'>
//                         <div className='border-solid border-2 rounded-lg border-white mb-2 p-2'>
//                           <div className='float-right ml-1'>
//                             <button
//                               onClick={() => handleDeleteCompletedTodo(ind)}
//                               className="text-red-500">
//                               <AiOutlineDelete className='text-2xl' />
//                             </button>
//                           </div>
//                           <h1 className='text-black text-2xl mb-2'>
//                             {item.title}
//                           </h1>
//                           <p className='text-gray-800 text-xl mb-2'>
//                             {item.description}
//                           </p>
//                           <h3 className='text-gray-600 text-sm'>
//                             Completed on: {item.completedOn}
//                           </h3>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </ul>
//               ) : (
//                 <ul>
//                   {allTodos.map((item, ind) => {
//                     return (
//                       <div key={ind} className=''>


//                          <div className='border-solid border-2  rounded-lg border-white mb-2 p-2'>
//                             <div className='float-right ml-1 flex'>

//                               <button
//                                 onClick={() => handleComplete(ind)}
//                                 className="text-2xl text-green-500">
//                                 <BsCheckLg />
//                               </button>
//                             </div>
//                             <div className='float-right ml-1 flex'>
//                               <button
//                                 onClick={() => handleEdit(ind, item)}
//                                 className="text-2xl text-blue-500">
//                                 <AiOutlineEdit />
//                               </button>
//                             </div>
//                             <div className='float-right flex'>
//                               <button
//                                 onClick={() => handleDeleteTodo(ind)}
//                                 className=" text-2xl text-red-500">
//                                 <AiOutlineDelete />
//                               </button>
//                             </div>
//                             <div className='float-right flex text-black'>
//                              <button>
//                              <DatePicker />
//                              </button>

//                             </div>

//                             <h1 className='text-black text-2xl mb-2'>
//                               {item.title}
//                             </h1>
//                             <p className='text-gray-800 text-xl mb-2'>
//                               {item.description}
//                             </p>
//                             <h3 className='text-gray-600 text-sm'>
//                               Scheduled for: {new Date(item.dateTime).toLocaleString()}
//                             </h3>
//                           </div>



//                         {currentEdit === ind ? (
//                           <div className='border-solid border-2 rounded-lg border-white mb-2 p-2'>
//                             <h1 className='text-black text-3xl mb-2'>
//                               <input
//                                 className='shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
//                                 type="text"
//                                 value={currentEditedItem.title}
//                                 onChange={(e) => handleUpdateTitle(e.target.value)}
//                               />
//                             </h1>
//                             <p className='text-black text-xl mb-2'>
//                               <input
//                                 className='shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
//                                 type="text"
//                                 value={currentEditedItem.description}
//                                 onChange={(e) => handleUpdateDescription(e.target.value)}
//                               />
//                             </p>
//                             <button
//                               type="button"
//                               className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10 p-2.5"
//                               onClick={handleUpdateTodo}>
//                               Update
//                             </button>
//                           </div>
//                         ) : null}
//                       </div>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>
//     </header>
//   );
// }

// export default Todo;

import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg, BsThreeDotsVertical } from 'react-icons/bs';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import empty from '../assets/empty.png'
import { IoIosTimer } from "react-icons/io";
import Avatar from '../assets/avatar.jpeg';
import DatePicker from './DateTimePicker'

const API_URL = 'http://localhost:5000/todos'; // Add your API URL here

function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState('');
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState({});
  const [dateTime, setDateTime] = useState(new Date());
  const [newDeadline, setNewDeadline] = useState('');
  const [showCard, setShowCard] = useState(false);


  const toggleCard = () => {
    setShowCard(!showCard);
  };

  const handleAddTodo = async () => {
    const newTodo = {
      title: newTitle,
      description: newDescription,
      dateTime: new Date(),
      deadline: newDeadline
    };
    console.log('New Todo:', newTodo)
    try {
      const response = await axios.post('http://localhost:5000/todos', newTodo);
      setTodos([...todos, response.data]);
      setNewTitle('');
      setNewDescription('');
      setNewDeadline('');
      setDateTime('')
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const handleUpdateTodo = async () => {
    const updatedTodo = {
      title: currentEditedItem.title,
      description: currentEditedItem.description,
      completed: currentEditedItem.completed,
      deadline: currentEditedItem.deadline

    };

    try {
      const response = await axios.patch(`${API_URL}/${currentEdit}`, updatedTodo);
      setTodos(todos.map(todo => (todo._id === currentEdit ? response.data : todo)));
      setCurrentEdit(null);
      setCurrentEditedItem({});
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleComplete = async (id) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    try {
      const response = await axios.patch(`${API_URL}/${id}`, { completed: true, completedOn: completedOn });
      setCompletedTodos([...completedTodos, response.data]);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };


  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleDeleteCompletedTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting completed todo:', error);
    }
  };


  const deleteTodo = (id, completed) => {
    if (completed) {
      handleDeleteCompletedTodo(id);
    } else {
      handleDeleteTodo(id);
    }
  };

  const handleEditChange = (field, value) => {
    setCurrentEditedItem({ ...currentEditedItem, [field]: value });
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, currentEditedItem);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      setCurrentEdit(null);
      setCurrentEditedItem({});
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const cancelEdit = () => {
    setCurrentEdit(null);
    setCurrentEditedItem({});
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        if (Array.isArray(response.data)) {
          setTodos(response.data);
        } else {
          console.error('Unexpected data format for todos:', response.data);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const fetchCompletedTodos = async () => {
      try {
        const response = await axios.get(`${API_URL}/completed`);
        if (Array.isArray(response.data)) {
          setCompletedTodos(response.data);
        } else {
          console.error('Unexpected data format for completed todos:', response.data);
        }
      } catch (error) {
        console.error('Error fetching completed todos:', error);
      }
    };


    fetchTodos();
    fetchCompletedTodos();
    
  }, []);

  const formatDateTime = (isoString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };



  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      try {
        const result = await signInWithPopup(firebaseAuth, provider);
        const { user: loggedInUser } = result;

        dispatch({
          type: actionType.SET_USER,
          user: loggedInUser,
        });
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      setIsMenu(false);
      localStorage.clear();
      dispatch({
        type: actionType.SET_USER,
        user: null,
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  return (
    <header>
      <div className='min-h-screen flex flex-col bg-cover ' style={{ 'backgroundImage': "url('../src/assets/bg6.webp')" }}>

        <div className="absolute mb-4 p-6  top-0 right-0 h-20 ">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full "
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">
              <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logout}>Logout</p>
            </motion.div>
          )}
        </div>
        <h1 className='font-bold text-black text-center flex items-center justify-center text-4xl p-6'>
          My Todos
        </h1>

        <div className='text-white min-h-screen h-[100vh] flex items-center justify-center'>
          <div className='App flex items-center justify-center'>
            <div className='todo-wrapper bg-slate-800 mx-auto w-fit mt-[3%] overflow-y-auto h-[80%] border border-slate-400 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
              <div className='todo-input flex items-center justify-center pb-6 mb-6'>
                <div className='todo-input-item flex flex-col items-start mr-6'>
                  <label className="text-xl font-medium text-gray-900 dark:text-black block mb-2.5">
                    Title
                  </label>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    type='text'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="What's the task title?"
                  />
                </div>
                <div className='todo-input-item flex flex-col items-start mr-6'>
                  <label className="text-xl font-medium text-gray-900 dark:text-black block mb-2">
                    Description
                  </label>
                  <input
                    className='shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                    type='text'
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What's the task description?"
                  />
                </div>
                <div className='todo-input-item flex flex-col items-start mr-6'>
                  <label className="text-xl font-medium text-gray-900 dark:text-black block mb-2">
                    Deadline
                  </label>
                  <input
                    className='shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                    type='datetime-local'
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    placeholder="Set a deadline"
                  />
                </div>

                <div className='todo-input-item flex flex-col items-start mr-6'>
                  <button
                    type="button"
                    onClick={handleAddTodo}
                    className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10 p-2.5'>
                    Add
                  </button>
                </div>
              </div>
              <div className='btn-area mb-3.5'>
                <button
                  className={`secondaryBtn ${isCompleteScreen === false && "active"} text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
                  onClick={() => setIsCompleteScreen(false)}>
                  All todos
                </button>
                <button
                  className={`secondaryBtn ${isCompleteScreen === true && "active"} text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
                  onClick={() => setIsCompleteScreen(true)}>
                  Completed todos
                </button>
              </div>

              <div className='todo-list mt-5'>
                <ul>
                  {todos.length === 0 && completedTodos.length === 0 && (
                    <div className='flex items-center justify-center text-center flex-col'>
                      <img className='w-[20%] mx-auto mt-10 mb-10' src={empty} />
                      <h3 className='font-medium text-gray-500 text-2xl'>
                        No todo items!
                      </h3>
                    </div>
                  )}

                  {isCompleteScreen === false &&
                    todos.map((todo) => (
                      <li
                        className='todo-item relative mb-4 p-4 border border-gray-200 rounded-lg shadow-md'
                        key={todo._id}>
                        <div>
                          <div className='todo-item-header flex items-center justify-between'>
                            <h3 className='font-medium text-gray-800'>{todo.title}</h3>
                            <span className='font-small text-gray-500'>{new Date(todo.deadline).toLocaleString()}</span>
                          </div>
                          <div className='todo-item-body flex items-center justify-between'>
                            <p className='font-small text-gray-600'>{todo.description}</p>
                            <div className='todo-item-actions flex items-center'>
                            <div className='float-right flex text-black'>
                              <button>
                              <DatePicker />
                              </button>

                           </div>
                              {showCard && (
                                <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }}className='bg-white text-black'>
                                  <h2>Timer Card</h2>
                                  <p>This is the content of the timer card.</p>
                                </div>
                              )}
                              <AiOutlineEdit
                                className='mr-3 cursor-pointer text-xl text-yellow-700'
                                onClick={() => {
                                  setCurrentEdit(todo._id);
                                  setCurrentEditedItem(todo);
                                }}

                              />
                              <AiOutlineDelete
                                className='mr-3 cursor-pointer text-xl text-red-500'
                                onClick={() => deleteTodo(todo._id)}
                              />
                              <BsCheckLg
                                className='cursor-pointer text-xl text-green-500'
                                onClick={() => handleComplete(todo._id)}
                              />

                            </div>


                          </div>
                        </div>
                        {currentEdit === todo._id && (
                          <div className='edit-todo flex flex-col items-start'>
                            <label className="text-xl font-medium text-gray-900 dark:text-black block mb-2.5">
                              Edit Title
                            </label>
                            <input
                              className='shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                              type='text'
                              value={currentEditedItem.title || ''}
                              onChange={(e) => handleEditChange('title', e.target.value)}
                            />
                            <label className="text-xl font-medium text-gray-900 dark:text-black block mb-2.5">
                              Edit Description
                            </label>
                            <input
                              className='shadow-sm bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                              type='text'
                              value={currentEditedItem.description || ''}
                              onChange={(e) => handleEditChange('description', e.target.value)}
                            />
                                <div className='todo-input flex items-center justify-center pb-6 mb-6'>
                            <button
                              className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10 p-2.5'
                              onClick={() => saveEdit(todo._id)}>Save</button>
                            <button
                              className='text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10 p-2.5'
                              onClick={() => cancelEdit()}>Cancel</button>
                              </div>
                           
                          </div>
                        )}
                      </li>
                    ))}

                  {isCompleteScreen === true &&
                    completedTodos.map((todo) => (
                      <li
                        className='todo-item relative mb-4 p-4 border border-gray-200 rounded-lg shadow-md'
                        key={todo._id}>
                        <div className='todo-item-header flex items-center justify-between'>
                          <h3 className='font-medium text-black'>{todo.title}</h3>
                          <span className='font-small text-green-600'>Completed on {todo.completedOn}</span>


                          {/* <span className='font-small text-gray-300'>{new Date(todo.deadline).toLocaleString()}</span> */}
                        </div>
                        <div className='todo-item-body flex items-center justify-between'>
                          <p className='font-small text-gray-600'>{todo.description}</p>
                          <span>
                            <AiOutlineDelete
                              className='mr-3 cursor-pointer text-xl text-red-500'
                              onClick={() => deleteTodo(todo._id)}
                            />
                          </span>

                        </div>

                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Todo;
