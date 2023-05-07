import React, { useEffect , useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { format } from 'date-fns'
import Calendar from 'react-calendar';
import '../components/Main.css'
import '../index.css'
import 'react-calendar/dist/Calendar.css';
import { FaList , FaRegClock , FaRegListAlt } from "react-icons/fa";
import { Link , useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';
import { Form } from 'react-bootstrap';
import * as Axios from 'axios';
import Swal from 'sweetalert2'
import set from 'date-fns/set'
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
// import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
// import 'react-clock/dist/Clock.css'
import TimeRange from 'react-time-range';
import moment from 'moment';
import { Chart } from "react-google-charts";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";

import ChangingProgressProvider from "./ChangingProgressProvider";

import 'react-circular-progressbar/dist/styles.css';

function Statistic() {


  const [getUser,setgetUser] = useState();
  const [worktimeList,setWorktimeList] = useState([]);
  const [breaktimeList,setBreaktimeList] = useState([]);
  const [calendarList,setCalendarList] = useState([]);
  let history = useHistory();
  
  
  useEffect(() =>{



    fetch("http://localhost:3001/calendar-list")
      .then(res => res.json())
      .then(
        (res) => {
        setCalendarList(res)
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

        
        
    const token = localStorage.getItem('token')
        Axios.post('http://localhost:3001/authen', {},
      {
        headers: {
            Authorization: 'Bearer ' + token
        }}).then((response)=>{ 
        if(response.data.status == 'ok'){
          const id = response.data.decoded.id
          //console.log(id)

          setgetUser(id)
          console.log(getUser)
        }else{
            history.push("/login");
        }
        });  

    },[getUser]);

    const [workTime , setWorkTime] = useState(0);

    const [breakTime , setBreakTime] = useState(0);

    const [allList , setallList] = useState(0);

    useEffect(() => {
      calendarList.map((val)=>{
        if (getUser == val.user_id){
         var countList = calendarList.length;
         setallList(countList)
         console.log(countList)
        }
      }  
      )
    },[calendarList]);


    useEffect(() => {
      worktimeList.map((val)=>{
        if (getUser == val.user_id){
         let sumhour = 0;
        for (let i = 0; i < worktimeList.length ; i++) {
          sumhour += worktimeList[i].wtime
          }
          console.log(sumhour)
          setWorkTime(sumhour)
        }
        
      }  
      )
    },[worktimeList]);

    useEffect(() => {
      breaktimeList.map((val)=>{
        if (getUser == val.user_id){
         let sumhour = 0;
        for (let i = 0; i < breaktimeList.length ; i++) {
          sumhour += breaktimeList[i].btime
          }
          console.log(sumhour)
          setBreakTime(sumhour)
        }
        
      }  
      )
    },[breaktimeList]);



  // const data = [
  //   ["DAY", "ทำงาน", "พัก"],
  //   ["จันทร์", workTime, breakTime],
  // ];


  // const options = {
  //   title: "",
  //   curveType: "function",
  //   legend: { position: "top" },
  // };

  const Statisticdata = [
    ["ชื่อ", "จำนวนนาที", { role: "style" }],
    ["เวลาทำงานทั้งหมด", workTime, "#134E6F"], // RGB value
    ["เวลาพักทั้งหมด", breakTime, "color: #FF6150"], // CSS-style declaration
  ];

  return (
    <>
     <div className="bg-blue-100 w-screen h-screen">
    <div className="container mx-auto px-14 pt-14 justify-center  z-1">
  
        <div className="grid grid-rows-1 grid-flow-col gap-4 mt-4 justify-center">
      
          

          <div className="shadow-lg container-statistic rounded-lg py-11 px-10 yel-bg">
                  <FaRegClock className=" text-white text-8xl float-left mx-7"/>
                  <h1 className=" text-white font-bold text-6xl mt-1.5 "> {workTime+breakTime} นาที </h1>
                  <h1 className=" text-white font-bold text-xl">เวลาที่ใช้ทั้งหมด</h1>
             
          </div>

          <div className="shadow-lg container-statistic rounded-lg py-11 px-10 blu-bg">
            <FaList className=" text-white text-7xl float-left mx-7"/>
            <h1 className=" text-white font-bold text-6xl mt-1.5"> {allList} รายการ</h1>
            <h1 className=" text-white font-bold text-xl">รายการทำงานทั้งหมด</h1>
          </div>
          
        </div>
        <div className="grid grid-rows-1 grid-flow-col gap-4 mt-4 justify-center">
        <div className="shadow-lg container-work-break rounded-lg bg-white">
        <h1 className=" ml-4 mt-4 blu font-bold text-2xl">เวลาในการทำงานและพัก</h1>
        {/* <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        /> */}
        <Chart  chartType="ColumnChart" width="100%" height="500px" data={Statisticdata} className="font-bold font-style m-auto "  />
        </div>
        </div>

    </div>
    </div>
    </>
  );
}

export default Statistic;
