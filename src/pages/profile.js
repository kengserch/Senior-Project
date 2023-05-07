import React, { useEffect , useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { format } from 'date-fns'
import Calendar from 'react-calendar';
import '../components/Main.css'
import '../index.css'
import 'react-calendar/dist/Calendar.css';
import { FaList , FaRegClock , FaRegListAlt , FaStar , FaRegKeyboard , FaBed , FaSpellCheck } from "react-icons/fa";
import { Link , useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';
import { Form } from 'react-bootstrap';
import * as Axios from 'axios';
import Swal from 'sweetalert2'
import set from 'date-fns/set'
import { Line, Circle } from 'rc-progress';

function Profile() {
            const [userList,setUserList] = useState([]);
            const [worktimeList,setWorktimeList] = useState([]);
            const [breaktimeList,setBreaktimeList] = useState([]);
            const [getUser,setgetUser] = useState();
            let history = useHistory();
            useEffect(() =>{
                const token = localStorage.getItem('token')
                Axios.post('http://localhost:3001/authen', {
            },
            {
            headers: {
              Authorization: 'Bearer ' + token
            }
            }).then((response)=>{ 
            if(response.data.status == 'ok'){
              const id = response.data.decoded.id
          //console.log(id)
              setgetUser(id)
              console.log(getUser)
            }else{
              history.push("/login");
            }

            });  

            fetch("http://localhost:3001/getuser")
          .then(res => res.json())
          .then(
            (res) => {
              setUserList(res)
            },
          )

          fetch("http://localhost:3001/worktime-list")
        .then(res => res.json())
        .then(
          (res) => {
            setWorktimeList(res)
          },
        )

        fetch("http://localhost:3001/breaktime-list")
        .then(res => res.json())
        .then(
          (res) => {
            setBreaktimeList(res)
          },
        )


       },[getUser]);


      const [allPoint , setPoint] = useState(0);

      const [workCheckpoint , setWorkCheckpoint] = useState(0);
      const [breakCheckpoint , setBreakCheckpoint] = useState(0);


       useEffect(() => {
        worktimeList.map((val)=>{
          if (getUser == val.user_id){
           var countWorkCheck = worktimeList.length;
           setWorkCheckpoint(countWorkCheck)
           console.log(countWorkCheck)
          }
        }  
        )
      },[worktimeList]);


      useEffect(() => {
        breaktimeList.map((val)=>{
          if (getUser == val.user_id){
           var countBreakCheck = breaktimeList.length;
           setBreakCheckpoint(countBreakCheck)
           console.log(countBreakCheck)
          }
        }  
        )
      },[breaktimeList]);


      useEffect(() => {
        worktimeList.map((val)=>{
          if (getUser == val.user_id){
           let point = 0;
          for (let i = 0; i < worktimeList.length ; i++) {
            point += worktimeList[i].point
            }
            console.log(point)
            setPoint(point)
          }
          
        }  
        )
      },[worktimeList]);

      const [allWork , setallwork] = useState(0);

      useEffect(() => {
        worktimeList.map((val)=>{
          if (getUser == val.user_id){
           let sumwork = 0;
          for (let i = 0; i < worktimeList.length ; i++) {
            sumwork += worktimeList[i].wtime
            }
            console.log(sumwork)
            setallwork(sumwork)
          }
          
        }  
        )
      },[worktimeList]);


      const [allBreak , setallBreak] = useState(0);

      useEffect(() => {
        breaktimeList.map((val)=>{
          if (getUser == val.user_id){
           let sumbreak = 0;
          for (let i = 0; i < breaktimeList.length ; i++) {
            sumbreak += breaktimeList[i].btime
            }
            console.log(sumbreak)
            setallBreak(sumbreak)
          }
          
        }  
        )
      },[worktimeList]);



     

            
        



  return (
    <div className="bg-blue-100 w-screen h-screen">
    <div className="container mx-auto px-14 pt-14 justify-center  z-1">
  
        <div className="grid grid-rows-1 grid-flow-col gap-4 mt-4 justify-center">
        <div className="shadow-lg container-pro rounded-lg row-start-1 row-end-3 bg-white">
          <div className="grid grid-rows-1 grid-flow-col gap-1 mt-4">
            <img className=" m-auto profile mt-10" src="../images/profile1.png" alt="" srcset="" />
          <div className=" mt-7">
          {userList.map((val)=>{
              if (getUser == val.id){
               
            return (
                <div>
                <h1 className=" text-2xl blu font-extrabold">{val.firstname} {val.lastname}</h1>
                <h1 className="font-regular text-xl">อาชีพ {val.job}</h1>
            </div>
              )} 
            }  
            )} 
            <h1 className="text-2xl blu font-extrabold mt-8">รางวัลความสำเร็จของคุณ</h1>
            {/* <div className="mt-2">
               <div className=" mx-6 w-14 h-14 blu-bg rounded-full"> <FaRegKeyboard className="text-white pt-3 m-auto w-8 h-auto"/></div>
               <h1 className="  blu text-sm ml-2 mt-2.5">คีย์บอร์ดทองคำ</h1>
               <h1 className="  blu text-sm">ทำงานครบ 300 ชม.</h1>
            </div> */}
            
          </div>
          
          </div>
          
        </div>
          <div className="row-start-1 row-end-2">

          <div className="shadow-lg w-96 h-36 rounded-lg py-9 blu-bg">
           <FaRegClock className=" text-white text-7xl float-left mx-7"/>
            <h1 className=" text-white font-bold text-3xl mt-5"> {allPoint} พ้อยสะสม</h1>
          </div>

          <div className="shadow-lg w-96 h-36 mt-6 rounded-lg py-9 yel-bg">
            <FaStar className=" text-white text-7xl float-left mx-7"/>
            <h1 className=" text-white font-bold text-3xl mt-5"> {workCheckpoint+breakCheckpoint} เช็คพ้อย</h1>
          </div>
          </div>
        </div>
        <div className="grid grid-rows-1 grid-flow-col gap-4 mt-2 justify-center">
        <div className="shadow-lg container-achievement rounded-lg bg-white">
          <h1 className=" text-center my-3.5 blu font-bold text-2xl ">รางวัลความสำเร็จทั้งหมด</h1>

          <div className="grid grid-rows-1 grid-flow-col gap-4 mt-8">
            <div className="grid grid-cols-4">
              <div className="col-start-1 ml-5">
               <div className=" mx-6 w-14 h-14 blu-bg rounded-full"> <FaRegKeyboard className="text-white pt-3.5 m-auto w-8 h-auto"/></div>
               </div>
               <div className="col-start-2 col-end-4">
               <h1 className="  blu text-lg">คีย์บอร์ดทองคำ</h1>
               <h1 className="  blu text-sm">ทำงานไปแล้ว {allWork} นาที</h1>
               </div>
               <div className="col-start-4">
               <h1 className="  blu text-sm mt-1">ทำงานครบ 1000 นาที</h1>
               </div>
               <div className="col-start-2 col-end-4">
               <Line percent={(allWork/1000)*100} strokeWidth="4" strokeColor="#FFA822" trailWidth="4" />
               </div>
            </div>
          </div>

          <div className="grid grid-rows-1 grid-flow-col gap-4 mt-8">
            <div className="grid grid-cols-4">
              <div className="col-start-1 ml-5">
               <div className=" mx-6 w-14 h-14 blu-bg rounded-full"> <FaBed className="text-white pt-3.5 m-auto w-8 h-auto"/></div>
               </div>
               <div className="col-start-2 col-end-4">
               <h1 className="  blu text-lg">พักผ่อนหย่อนใจ</h1>
               <h1 className="  blu text-sm">พักไปแล้ว {allBreak} นาที</h1>
               </div>
               <div className="col-start-4">
               <h1 className="  blu text-sm mt-1">พักครบ 1000 นาที</h1>
               </div>
               <div className="col-start-2 col-end-4">
               <Line percent={(allBreak/1000)*100} strokeWidth="4" strokeColor="#FFA822" trailWidth="4" />
               </div>
            </div>
          </div>

          <div className="grid grid-rows-1 grid-flow-col gap-4 mt-8">
            <div className="grid grid-cols-4">
              <div className="col-start-1 ml-5">
               <div className=" mx-6 w-14 h-14 blu-bg rounded-full"> <FaSpellCheck className="text-white pt-3.5 m-auto w-8 h-auto"/></div>
               </div>
               <div className="col-start-2 col-end-4">
               <h1 className="  blu text-lg">จอมเช็คพ้อย</h1>
               <h1 className="  blu text-sm">เช็กพ้อยไปแล้ว {workCheckpoint+breakCheckpoint} ครั้ง</h1>
               </div>
               <div className="col-start-4">
               <h1 className="  blu text-sm mt-1">เช็คพ้อยครบ 100 ครั้ง</h1>
               </div>
               <div className="col-start-2 col-end-4">
               <Line percent={((workCheckpoint+breakCheckpoint)/100)*100} strokeWidth="4" strokeColor="#FFA822" trailWidth="4" />
               </div>
            </div>
          </div>

        </div>
        <div className="shadow-lg container-reward rounded-lg bg-white">
        <h1 className=" text-center my-3.5 blu font-bold text-2xl">พ้อยแลกลุ้นรางวัลประจำเดือน</h1>
        <h1 className=" mx-6 font-bold text-lg">แลกลุ้นรับคูปองส่วนลดประจำเดือน ตุลาคม</h1>
        <h1 className=" text-center my-4 yel font-bold text-lg">คูปองส่วนลดเก้าอี้เพื่อสุขภาพ 50 พ้อย</h1>
        <img src="https://cf.shopee.co.th/file/63566aefd388081f864b7f3e86a0810c" alt="" className=" w-40 h-40 shadow-md m-auto"  />
        <div className="flex justify-center"><h1 className="blu-bg w-32 h-12 cursor-pointer p-2.5 mt-4 text-center rounded-3xl text-white font-bold text-lg">แลกด้วยพ้อย</h1></div>
        </div>
        </div>

    </div>
    </div>
  );
}

export default Profile;
