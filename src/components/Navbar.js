
import { Link , NavLink } from 'react-router-dom'
import "../components/Main.css";
import { FaRegCalendarAlt , FaRegClock , FaRegChartBar, FaRegUser , FaLock , FaDoorOpen } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Axios from "axios";

const Navbar = ({toggle}) => {
     
     const [username,setUsername] = useState('');
     
     let buttons ;

     if(username === 0){
          buttons = (<div className="flex container-logre ">
          <Link className="p-7 text-black hover:text-red-700 text-lg font-bold flex " to="/login"> <FaLock className="mx-2 my-1"/> Login</Link>
          <Link className="p-7 text-black hover:text-red-700 text-lg font-bold flex " to="/register"> <FaRegUser className="mx-2 my-1"/> Register</Link>
     </div>)
     }else{
          const logout = () =>{
               window.location.href = '/login'
               localStorage.clear();
           }
          
          buttons = (<div className="flex container-logre ">
          <Link className=" text-black hover:text-red-700 text-lg font-bold flex " onClick={logout}> <FaDoorOpen className="mx-2 my-1"/> Logout</Link>
     </div>)
     }

     useEffect(() =>{
      const token = localStorage.getItem('token')
          Axios.post('http://localhost:3001/authen', {
      },
      {
      headers: {
        Authorization: 'Bearer ' + token
      }
      }).then((response)=>{ 
         if(response.data.status == 'error'){
          setUsername(0)
         }
      });  
      
      },[]);

      

      
 return (
  <nav className="flex items-center h-16 bg-white text-black 
  relative shadow-md" role="navigation">
   <Link to='/' className="pl-12 text-lg font-bold"> <img className=" mt-2 w-20 h-auto" src="../images/logoblue1.png" alt="logo"  /> </Link>
   
    <div className="pr-8 flex justify-center">
        <NavLink activeClassName="main-nav-active" exact className="p-7 text-gray-500 hover:text-red-700 text-lg font-bold flex" to="/todo-boxing"> <FaRegCalendarAlt className="mx-2 my-1"/>Todo-Boxing</NavLink>
        <NavLink activeClassName="main-nav-active" exact className="p-7 text-gray-500 hover:text-red-700 text-lg font-bold flex" to="/timer-boxing"> <FaRegClock className="mx-2 my-1"/> Timer-Boxing</NavLink>
        <NavLink activeClassName="main-nav-active"exact className="p-7 text-gray-500 hover:text-red-700 text-lg font-bold flex" to="/statistic"> <FaRegChartBar className="mx-2 my-1"/> Statistic</NavLink>
        <NavLink  activeClassName="main-nav-active" exact  className="p-7 text-gray-500 hover:text-red-700 text-lg font-bold flex" to="/profile"> <FaRegUser className="mx-2 my-1"/> Profile</NavLink>
   </div>

   {/* <div className="flex container-logre ">
        <Link className="p-7 text-black hover:text-red-700 text-lg font-bold flex " to="/login"> <FaLock className="mx-2 my-1"/> Login</Link>
        <Link className="p-7 text-black hover:text-red-700 text-lg font-bold flex " to="/register"> <FaRegUser className="mx-2 my-1"/> Register</Link>
        <Link className="pt-7 text-black hover:text-red-700 text-lg font-bold flex " onClick={logout}> Logout</Link>
   </div> */}
   {buttons}
  </nav>
 )
}

export default Navbar
