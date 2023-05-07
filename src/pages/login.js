
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from 'sweetalert2'
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus,setLoginStatus] = useState("");


    const login = () =>{
      Axios.post("http://localhost:3001/login",{
        username:username,
        password:password
      }).then((response)=>{
        if(response.data.status == 'ok'){
          Swal.fire({
            title: 'Success!',
            text: 'ล้อกอินสำเร็จ',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          localStorage.setItem('token', response.data.token);
          window.location.href = '/todo-boxing'
        }else{
          Swal.fire({
            title: 'Failed!',
            text: 'ไอดีหรือพาสเวิร์ดผิด',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          //setLoginStatus(response.data[0].username);
          
        }
      });
    };

    const register = () =>{
      window.location.href = '/register'
    };


    return (
      
       <div className="grid grid-rows-1 grid-flow-col gap-4 mt-40 justify-center">
        <div className="shadow-lg container-login rounded-lg py-4 px-4 bg-white grid grid-rows-5 grid-flow-col gap-4">
          <h1 className="blu font-bold text-2xl p-2.5 m-auto">ล็อกอิน</h1>
          <input className="shadow-lg rounded-sm p-2 w-80 h-12 m-auto " type="text" placeholder="ไอดี..." onChange={(e) => {setUsername(e.target.value);}}/>
          <input className="shadow-lg rounded-sm p-2 w-80 h-12 m-auto" type="password" placeholder="พาสเวิร์ด..." onChange={(e) => { setPassword(e.target.value);}}/>
          <button className="blu-bg w-24 h-10 cursor-pointer p-2 text-center rounded-lg m-auto text-white" onClick={login}> ล็อกอิน </button>
          <h1 onClick={register} className="cursor-pointer m-auto" >สมัครสมาชิก</h1>
        </div> 
      </div>
        
   
    )
}

export default Login

