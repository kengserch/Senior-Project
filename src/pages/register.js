
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap';
function Register() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [firstnameReg, setfirstnameReg] = useState("");
    const [lastnameReg, setlastnameReg] = useState("");
    const [emailReg, setemailReg] = useState("");
    const [jobReg, setJob] = useState("");


    const register = () =>{
      if( !usernameReg || !passwordReg || !firstnameReg || !lastnameReg || !jobReg || !emailReg){
        Swal.fire({
          title: 'Failed!',
          text: 'กรุณากรอกให้ครบ',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
      else{
        Swal.fire({
          title: 'Success Add!',
          text: 'เพิ่มรายการสำเร็จ',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        window.location.href = '/login'
      Axios.post("http://localhost:3001/register",{
        username:usernameReg,
        password:passwordReg,
        firstname:firstnameReg,
        lastname:lastnameReg,
        email:emailReg,
        job:jobReg,
      })
    }
    };

    const login = () =>{
      window.location.href = '/login'
    };

    return (
    
    <div className="grid grid-rows-1 grid-flow-col gap-4 mt-40 justify-center">
    <div className="shadow-lg container-register rounded-lg py-4 px-4 bg-white grid grid-rows-6 grid-flow-col gap-4">
    <h1 className="blu font-bold text-2xl p-2.5 m-auto">สมัครสมาชิก</h1>
       <div className="grid grid-cols-2 gap-4">
        <input className="shadow-lg rounded-sm p-4 w-72 h-12 m-auto"  type="text" placeholder="ไอดี..." onChange={(e) => {setUsernameReg(e.target.value);}}/>
        <input className="shadow-lg rounded-sm p-4 w-72 h-12 m-auto" type="password" placeholder="พาสเวิร์ด..." onChange={(e) => { setPasswordReg(e.target.value);}}/>
        <input className="shadow-lg rounded-sm p-4 w-72 h-12 m-auto mt-3" type="text" placeholder="ชื่อจริง..." onChange={(e) => { setfirstnameReg(e.target.value);}}/>
        <input className="shadow-lg rounded-sm p-4 w-72 h-12 m-auto mt-3" type="text" placeholder="นามสกุล..." onChange={(e) => { setlastnameReg(e.target.value);}}/>
        <input className="shadow-lg rounded-sm p-2 w-72 h-12 m-auto" type="text" placeholder="อีเมล..." onChange={(e) => { setemailReg(e.target.value);}}/>
        <Form.Select className="shadow-lg rounded-sm p-1 mt-3" onChange={(event) =>  setJob(event.target.value)} aria-label="Default select example">
          <option value="โปรแกรมเมอร์">โปรแกรมเมอร์</option>
          <option value="นักศึกษา">นักศึกษา</option>
        </Form.Select>
        <div></div>
        
        </div>
        <button className="blu-bg w-52 h-10 cursor-pointer p-2 text-center rounded-2xl text-white m-auto mt-36" onClick={register}> สมัครสมาชิก </button>
        <h1 onClick={login} className="cursor-pointer m-auto mt-36" >ล้อกอิน</h1>
    </div> 
  </div>
    )
}

export default Register

