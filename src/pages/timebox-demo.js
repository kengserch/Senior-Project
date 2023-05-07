import React, { useEffect, useState, useRef } from "react";

import "../components/Main.css";
import styled from "styled-components";
import tw from "twin.macro";
import '../index.css'
import { FaList , FaRegClock , FaRegListAlt , FaCloudShowersHeavy, FaFire , FaWind , FaTree , FaKeyboard , FaBusinessTime , FaRegGem } from "react-icons/fa";
import {Howl, Howler} from 'howler';
import Axios from "axios";
import { useTimer } from 'react-timer-hook';
import { Link , NavLink, useHistory } from "react-router-dom";
import { format } from 'date-fns'
import Calendar from 'react-calendar';
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import Popup from 'reactjs-popup';
import Countdown from 'react-countdown';
import useTypingGame from 'react-typing-game-hook';
import OTPInput, { ResendOTP } from "otp-input-react";
import Popuptest from '../components/Popup'
import ReactPaginate from 'react-paginate';

function TimerboxingDemo() {

  const [calendar, setCalendar] = useState(new Date());
  let history = useHistory();
  let [date , setDate] = useState();
  const [calendarList,setCalendarList] = useState([]);
  const [historyList,setHistoryList] = useState([]);
  // let [allHour , setallHour] = useState(0);
  // let [allList , setallList] = useState(0);
  const [getUser,setgetUser] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 2
  const pageVisited = pageNumber * userPerPage

  const displayUsers = calendarList.slice(pageVisited, pageVisited + userPerPage)
                        .map(val =>{
                          if (date == val.date && getUser == val.user_id){
                            return (
                              <div className="list-timebox mt-2.5 shadow-lg rounded-lg bg-white  p-1 cursor-pointer ">
                              <div className="grid grid-cols-3 gap-4 p-1">
                              <h1 className=" text-md font-bold break-words  my-auto" >{val.name} </h1>
                              <h1 className=" text-md font-bold   my-auto">{val.start}.00 - {val.end}.00 </h1>
                              <h1 className=" text-md font-bold  my-auto ml-2 flex" > <FaRegClock className="mt-1 mr-2 blu"/>{val.hour} hours</h1>
                             </div>
                             </div> 
                            )};
                        });
  const pageCount = Math.ceil(calendarList.length / userPerPage);

  const changePage = ({ selected }) =>{
    setPageNumber(selected)
  }
  
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
          setHistoryList(res)
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


      setDate(format(calendar,'dd/MM/yyyy'));

  },[getUser]);

  

  const [allHour , setallHour] = useState(null);
  const [allList , setallList] = useState(null);


  useEffect(() => {

    calendarList.map((val)=>{
      if (date == val.date && getUser == val.user_id){
        let countList = calendarList.filter(e => e.date === date).length;
        let countList1 = calendarList.filter(e => e.date === date)
        let sumhour = 0;
        for (let i = 0; i < countList; i++) {
          // console.log(countList1[i].hour);
          sumhour += countList1[i].hour
          }
        setallHour(sumhour)
        setallList(countList)
      } 
    }  
    )
  },[calendarList]);
 
  




    const Ref = useRef(null);
    const [worktimer, setworkTimer] = useState('00:00');
    const [breaktimer, setbreakTimer] = useState('00:00');



//  const desktime =  () => {
//   const deadline = new Date();
//   setworkTimer('52:00');
//   setbreakTimer('17:00');
//   deadline.setMinutes(deadline.getMinutes() + 52);
//   return deadline;
// }; 
// const pulsepause =  () => {
//   const deadline = new Date();
//   setworkTimer('90:00');
//   setbreakTimer('90:00');
//   deadline.setMinutes(deadline.getMinutes() + 90);
//   return deadline;
// }; 

// const pomodoro = () =>{
//     const deadline = new Date();
//     setworkTimer('15:00');
//     setbreakTimer('15:00');
//     deadline.setMinutes(deadline.getMinutes() + 15);
//     return deadline;

// }

  // let [worktime , setWorktime] = useState(0);
  // let [breaktime , setBreaktime] = useState(0);
  // const [selectedNumber, setSelectedNumber] = useState(0);
 // const [timeH, setTimeH] = useState(0);

 const [time, setTime] = useState(0);
 const [time1, setTime1] = useState(0);


  const selectNumber = numberSelected => {
    const deadline = new Date();
    //const deadline1 = new Date();
    // let time = 0;
    if(numberSelected === "1"){
    setworkTimer('15:00');
    setTime(5)
   
    }
    else if(numberSelected === "2"){
      setworkTimer('52:00');
      setTime(52)
      }
    else if(numberSelected === "3"){
        setworkTimer('90:00');
        setTime(90)
    }
    //deadline.setMinutes(deadline.getMinutes() + time);
    deadline.setSeconds(deadline.getSeconds() + time);
    return deadline ;
  }




  const selectNumber1 = numberSelected => {
    const deadline = new Date();
    //const deadline1 = new Date();
    // let time = 0;
    if(numberSelected === "1"){
    setbreakTimer('15:00');
    setTime1(20)
   
    }
    else if(numberSelected === "2"){
    setbreakTimer('17:00');
      setTime1(52)
      }
    else if(numberSelected === "3"){
     setbreakTimer('90:00');
      setTime1(90)
    }
    //deadline.setMinutes(deadline.getMinutes() + time);
    deadline.setSeconds(deadline.getSeconds() + time1);
    return deadline ;
    
  }

  



  

 // let [hourtime , setHourtime] = useState(0);
  const [mintime , setMintime] = useState(0);
  const [btime , setBtime] = useState(0);



  const setCustomTime = () =>{
    const deadline = new Date();
    setworkTimer( `${mintime}:00`);
    setbreakTimer( `${btime}:00`);
    setTime(mintime)
    deadline.setSeconds(deadline.getSeconds() + time);
    return deadline ;
   
  } 

  async function getTimeRemaining (e)  {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
        total, minutes, seconds 
    };
  }

  async function getTimeRemaining1 (e)  {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
        total, minutes, seconds 
    };
  }
  
  
  

  //const timerRef = useRef(null);
  
  var timeOut;

  async function  startTimer  (e)  {
    let { total ,minutes, seconds  } = await getTimeRemaining(e);
    if (total >= 0) {
        setworkTimer(
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
        if(total == 0){
          await alert.play()
          alert.volume = 0.4
          setPopup(true);

          timeOut = setTimeout(() => {
            const point = 0
            const status = 0
            toast.error("เช็คพ้อยไม่ทันเวลา",wordTyping)
            Axios.post("http://localhost:3001/create-worktime" , {
            worktime:time,
            point:point,
            status:status,
            user_id:getUser
            })
          setPopup(false)
          }, 11000);

          clearTimer1(selectNumber1())
          // timeOut = setTimeout(() => {
          // toast.error("เช็คพ้อยไม่ทันเวลา",wordTyping)
          // setPopup(false)
          // }, 11000);           
          
        }
    }
  }


  async function  startTimer1  (e)  {
    let { total ,minutes, seconds  } = await getTimeRemaining1(e);
    if (total >= 0) {
      setbreakTimer(
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
        if(total == 0){
          await alert.play()
          alert.volume = 0.4
          setPopup1(true);

          timeOut = setTimeout(() => {
            const point = 0
            const status = 0
            toast.error("เช็คพ้อยไม่ทันเวลา",wordTyping)
            Axios.post("http://localhost:3001/create-breaktime" , {
            breaktime:time1,
            point:point,
            status:status,
            user_id:getUser
            })
          setPopup1(false)
          }, 11000);
          // timeOut = setTimeout(() => {
          // toast.error("เช็คพ้อยไม่ทันเวลา",wordTyping)
          // setPopup(false)
          // }, 11000);           
        }
    }
  }

async function clearTimer  (e)  {
  if (Ref.current) clearInterval(Ref.current);

  const id = setInterval(() => {
    startTimer(e);
  }, 1000)

  Ref.current = id;
}

async function clearTimer1  (e)  {
  if (Ref.current) clearInterval(Ref.current);

  const id = setInterval(() => {
    startTimer1(e);
  }, 1000)

  Ref.current = id;
}

async function onClickStartTime() {
  await clearTimer(selectNumber())
   //clearTimer(setCustomTime())
 }
  

 const [randomID, setRandomID] = useState(null);
 const [randomID1, setRandomID1] = useState(null);


  useEffect(() => {
    let keyword = ["float","double","integer","date" ,"varchar" , "text" , "string" ,"boolean" , "image" , "timestamp" , "char"];
    setRandomID(keyword[Math.floor(Math.random()*keyword.length)])

    let keyword1 = ["float","double","integer","date" ,"varchar" , "text" , "string" ,"boolean" , "image" , "timestamp" , "char"];
    setRandomID1(keyword1[Math.floor(Math.random()*keyword1.length)])
 },[]);
  
  
  const [wordTyping, setWordTyping] = useState("");
  const [wordTyping1, setWordTyping1] = useState("");

  
  // let keyword = ["float"];
  // randomWord = keyword[Math.floor(Math.random()*keyword.length)];
  //  console.log(randomWord)

  function checkWord () {
    //clearTimeout(myVar);
      clearTimeout(timeOut);
      //setTimeout(timeOut, 0)
      console.log(wordTyping)
   if ( wordTyping == randomID){
        setPopup(false)
        
        const point = 15
        const status = 1
        toast.success('กรอกคำศัพท์ถูกต้อง',wordTyping)
        Axios.post("http://localhost:3001/create-worktime" , {
          worktime:time,
          point:point,
          status:status,
          user_id:getUser
        })
          
   }else if (wordTyping != randomID){
        setPopup(false)
        const point = 0
        const status = 0
        toast.error("กรอกคำศัพท์ผิด",wordTyping)
        Axios.post("http://localhost:3001/create-worktime" , {
          worktime:time,
          point:point,
          status:status,
          user_id:getUser
        })
       
   }
  };


  function checkWord1 () {
    //clearTimeout(myVar);
      clearTimeout(timeOut);
      //setTimeout(timeOut, 0)
      console.log(wordTyping1)
   if ( wordTyping1 == randomID1){
        setPopup1(false)
        
        const point = 15
        const status = 1
        toast.success('กรอกคำศัพท์ถูกต้อง',wordTyping)
        Axios.post("http://localhost:3001/create-breaktime" , {
          breaktime:time1,
          point:point,
          status:status,
          user_id:getUser
        })
          
   }else if (wordTyping1 != randomID1){
        setPopup1(false)
        const point = 0
        const status = 0
        toast.error("กรอกคำศัพท์ผิด",wordTyping)
        Axios.post("http://localhost:3001/create-breaktime" , {
          breaktime:time1,
          point:point,
          status:status,
          user_id:getUser
        })
       
   }
  };

  

 

let alert = new Audio("/sound/alert.mp3")


const [isPopup, setPopup] = useState(false);
const [isPopup1, setPopup1] = useState(false);



// useEffect(() => {
//   setTimeout(() => {
//     setPopup(false)
//   }, 10000);
// },[])




async function popUp  () {
  // await alert.play()
  // alert.volume = 0.4
//    toast.custom(
//    (
//      <div className=" mt-32 popup-minigame rounded-lg shadow-lg">
//        <h1 className=" font-bold text-3xl text-center text-white mt-12">หมดเวลาทำงานแล้วไปพักผ่อนสักหน่อย</h1>
//        <h1 className=" font-bold text-2xl text-center text-white mt-7">เหลือเวลาเช็คพ้อย</h1>
//        <h1 className=" font-bold text-2xl text-center text-white mt-2"> <Countdown date={Date.now() + 10000} /> </h1>
//        <h1 className=" font-regular text-xl text-center text-white mt-2"> <FaKeyboard className="m-auto"/></h1>
//        <h1 className=" font-regular text-xl text-center text-white mt-2">พิมพ์คำศัพท์ตามที่กำหนด</h1>
//        <div className="flex mt-7">
//            <h1 className=" text-white rounded-md m-auto px-7 py-5 text-5xl font-bold">{randomID}</h1>
//        </div>
//        {/* <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="alpha" disabled={false} />
//        <button className="bg-white w-24 h-10 cursor-pointer p-2 text-center rounded-lg ml-10 text-black" onClick={checkWord} > ยืนยัน </button> */}
//          <div><input className="shadow-lg rounded-sm p-2 w-80 h-12 mt-6 ml-14 " type="text" placeholder="พิมพ์คำศัพท์" onChange={(event) =>  setWordTyping(event.target.value)}/>
//          <button className="bg-white w-24 h-10 cursor-pointer p-2 text-center rounded-lg ml-10 text-black" onClick={checkWord()} > ยืนยัน </button></div>
//        <h1 className=" font-regular text-xl text-center text-white mt-3">ชนิดประเภทตัวแปร</h1>
//      </div>
//    ),
//    {
//    duration: 10000,
//    }
//  )  
 
}



    const rain =  useRef(new Audio("/sound/rain1.mp3"))
    const fire = useRef(new Audio("/sound/fire1.mp3"))
    const wind = useRef(new Audio("/sound/wind.mp3"))
    const forest = useRef(new Audio("/sound/forest1.mp3"))




    //const [musicActive1, setmusicActive1] = useState(false);
    //const [musicActive2, setmusicActive2] = useState(false);
    const [playingRain, setPlayingRain] = useState(false);
    const [playingFire, setPlayingFire] = useState(false);
    const [playingWind, setPlayingWind] = useState(false);
    const [playingForest, setPlayingForest] = useState(false);


    // const play = (btnselect) => {
    //   if(btnselect == "1") {
    //     setmusicActive1(!musicActive1);
    //     setmusicActive2(false);
    //     rain.current.play();
    //     rain.current.volume = 0.2;
    //     setPlaying(true)
    //   }
    //   if(btnselect == "2") {
    //     setmusicActive2(!musicActive2);
    //     setmusicActive1(false);
    //     fire.current.play();
    //     fire.current.volume = 0.2;
    //     setPlaying(true)
    //   }
    //   if(btnselect == "stop"){
    //     console.log("stop")
    //     rain.current.pause();
    //     rain.current.currentTime = 0;
    //     fire.current.pause();
    //     fire.current.currentTime = 0;
    //     setPlaying(false)
    //   }
    // };
    
    const playRain = () => {
      setPlayingRain(true);
      rain.current.play();
      rain.current.volume = 0.1
      //Fire
      setPlayingFire(false)
      fire.current.pause();
      fire.current.currentTime = 0;
      //Wind
      setPlayingWind(false)
      wind.current.pause();
      wind.current.currentTime = 0;
      //Forest
      setPlayingForest(false)
      forest.current.pause();
      forest.current.currentTime = 0;
    };

    const pauseRain = () => {
      rain.current.pause();
      rain.current.currentTime = 0;
      setPlayingRain(false)
    };

    const playFire = () => {
      setPlayingFire(true);
      fire.current.play();
      fire.current.volume = 0.1
      //Rain
      setPlayingRain(false)
      rain.current.pause();
      rain.current.currentTime = 0;
      //Wind
      setPlayingWind(false)
      wind.current.pause();
      wind.current.currentTime = 0;
      //Forest
      setPlayingForest(false)
      forest.current.pause();
      forest.current.currentTime = 0;
    };

    const pauseFire = () => {
      fire.current.pause();
      fire.current.currentTime = 0;
      setPlayingFire(false)
    };

    const playWind = () => {
      setPlayingWind(true);
      wind.current.play();
      wind.current.volume = 0.3
      //Rain
      setPlayingRain(false)
      rain.current.pause();
      rain.current.currentTime = 0;
      //Fire
      setPlayingFire(false)
      fire.current.pause();
      fire.current.currentTime = 0;
      //Forest
      setPlayingForest(false)
      forest.current.pause();
      forest.current.currentTime = 0;
    };

    const pauseWind = () => {
      wind.current.pause();
      wind.current.currentTime = 0;
      setPlayingWind(false)
    };

    const playForest = () => {
      setPlayingForest(true);
      forest.current.play();
      forest.current.volume = 0.3
      //Rain
      setPlayingRain(false)
      rain.current.pause();
      rain.current.currentTime = 0;
      //Fire
      setPlayingFire(false)
      fire.current.pause();
      fire.current.currentTime = 0;
      //Wind
      setPlayingWind(false)
      wind.current.pause();
      wind.current.currentTime = 0;
    };

    const pauseForest = () => {
      forest.current.pause();
      forest.current.currentTime = 0;
      setPlayingForest(false)
    };



    



    const [isActive1, setActive1] = useState(false);
    const [isActive2, setActive2] = useState(false);
    const [isActive3, setActive3] = useState(false);

    const toggleClass = (btnselect) => {
      if(btnselect === "1") {
        setActive1(!isActive1);
        setActive2(false);
        setActive3(false);
      }
      if(btnselect === "2") {
        setActive2(!isActive2);
        setActive1(false);
        setActive3(false);
      }
      if(btnselect === "3"){
       setActive3(!isActive3);
       setActive1(false);
        setActive2(false);
      }
    };

    
    

return (
<div className="bg-blue-100 w-screen  ">
  <main>
<div className="container mx-auto px-14 pt-14 justify-center  z-1 ">
<Toaster/>
    <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4 justify-center ">
        <div className="shadow-lg row-span-3 container-boxing rounded-lg p-6 bg-white">
           <h1 className="font-regular text-xl font-bold" >รายการวันที่  {format(calendar,'dd/MM/yyyy') }</h1>
           <div className="flex mt-2 p-2">
            <h1 className=" ml-2 mt-2 blu font-bold text-xl flex"> <FaList className="mr-2"/> {allList} รายการ   </h1>
            <h1 className=" ml-40 mt-2  blu font-bold text-xl flex"> <FaRegClock className="mr-2"/> {allHour} ชั่วโมง</h1>
          </div>
          <div className="mt-2">
              {displayUsers}
              <ReactPaginate
                previousLabel={"ก่อนหน้า"} 
                nextLabel={"ถัดไป"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
          </div>
        </div>

      <div className="row-start-1 row-end-4">
        <div className="shadow-lg container-time rounded-lg py-6 bg-white">
        <h1 className=" rd font-bold ml-4 text-xl">นาฬิกาจับเวลาในการทำงานและพัก</h1>
        <div className="grid grid-rows-2 grid-flow-col gap-0 p-5 mt-2">
          <div>
          <h1 className=" font-regular underline">เวลาทำงาน</h1>
          <h1 className=" blu font-bold text-5xl mt-4 text-center"> {worktimer} นาที </h1> 
          </div>
          <div >
          <h1 className=" font-regular underline mt-4 ">เวลาพัก</h1>
          <h1 className=" blu font-bold text-4xl mt-4 text-center"> {breaktimer} นาที</h1>
          </div>
          </div>
        </div>

      
        <div className="shadow-lg container-body rounded-lg py-4 px-4 bg-white mt-4">
          <h1 className=" rd font-bold text-xl mt-2">ตั้งเวลาทำงานด้วยเทคนิคที่แนะนำ</h1>
          <div className="flex mt-7 px-6" >
            <button onClick={() =>{selectNumber('1');  selectNumber1('1'); toggleClass('1') } }   className={`mx-6 w-36 h-11 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold" ${isActive1 ? 'rd-bg text-white': 'bg-white mx-6 w-28 h-10 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold'}` }  >Pomodoro</button>
            <button onClick={() =>{selectNumber('2'); selectNumber1('2'); toggleClass('2') } }  className={`mx-6 w-36 h-11 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold" ${isActive2 ? 'rd-bg text-white': 'bg-white mx-6 w-28 h-10 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold'}` }>Desktime</button>
            <button onClick={() =>{selectNumber('3'); selectNumber1('3'); toggleClass('3') } }  className={`mx-6 w-36 h-11 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold" ${isActive3 ? 'rd-bg text-white': 'bg-white mx-6 w-28 h-10 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold'}` }>Pulse&Pause</button>
          </div>
          <div className="flex my-2 px-6">
            <div className=" ml-10">
              <h1 className="  text-center text-sm">ทำงาน 15 นาที </h1>
              <h1 className="  text-center text-sm">พัก 15 นาที</h1>
            </div>
            <div className=" ml-16">
              <h1 className="  text-center text-sm">ทำงาน 52 นาที</h1>
              <h1 className="  text-center text-sm">พัก 17 นาที</h1>
            </div>
            <div className=" ml-20">
              <h1 className="  text-center text-sm">ทำงาน 90 นาที</h1>
              <h1 className="  text-center text-sm">พัก 90 นาที</h1>
            </div>   
           </div>
        </div>

        {/* <div className="container-body rounded-lg">
            <div className="container-custom shadow-lg rounded-lg py-4 px-4 bg-white mt-4">
            <h1 className=" rd font-bold mt-2 text-xl">ตั้งเวลาด้วยตนเอง</h1>
          <div class="grid grid-cols-3 mt-3 p-3" >
            <div>
              <h1 className="blu mt-2 font-bold">เวลาทำงาน</h1>
                <div className="flex">
                <input  onChange={(event) =>  setMintime(event.target.value)} className="ml-1 mt-1 w-20 shadow-md p-2 text-center rounded-lg blu" type="text" placeholder="นาที"/>
                <h1  className="blu mt-3 ml-4">นาที</h1>
                </div>
            </div>
            <div>
              <h1 className="blu mt-2 font-bold">เวลาพัก</h1>
                <div className="flex">
                   <input  onChange={(event) =>  setBtime(event.target.value)} className="ml-1 mt-1 w-20 shadow-md p-2 text-center rounded-lg" type="text" placeholder="นาที"/>
                   <h1 className="blu mt-3 ml-4" >นาที</h1>
                </div>
            </div>

            <div>
             <button onClick={setCustomTime} className="ml-4 w-20 shadow-md p-2 mt-8 text-center rounded-lg blu-bg text-white cursor-pointer  ">ตั้งเวลา</button>
            </div>
            
          </div>
            </div>
        </div> */}

        <div className="shadow-lg container-music rounded-lg py-4 px-4 bg-white mt-4">
            <div className="flex">
              <h1 className="mx-2.5 w-20 shadow-md p-2 text-center rounded-lg blu-bg text-white ">ธรรมชาติ</h1>
              {/* <h1 className="mx-2.5 w-20 shadow-md p-2 text-center rounded-lg blu  ">คาเฟ่</h1> */}
            </div>
            <div className="flex">
              <div onClick={playingRain ? pauseRain : playRain }  className={`cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white ${playingRain ? 'border-music': 'cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white'}`  } > 
                <h1 className=" text-sm font-bold">ฝน</h1>
                <FaCloudShowersHeavy className=" w-10 h-10 blu mx-auto mt-2"/> 
              </div>
              <div onClick={playingFire ? pauseFire : playFire } className={`cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white ${playingFire ? 'border-music': 'cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white'}`  }>
                <h1 className=" text-sm font-bold">กองไฟ</h1>
                <FaFire className=" w-10 h-10 blu mx-auto mt-2"/> 
              </div>
              {/* <div onClick={() => play('2') } className={`cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white ${playing ? 'rd-bg border-black': 'cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white'}`  }>
                <h1 className=" text-sm font-bold">กองไฟ</h1>
                <FaFire className=" w-10 h-10 blu mx-auto mt-2"/> 
              </div> */}
              <div onClick={playingWind ? pauseWind : playWind } className={`cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white ${playingWind ? 'border-music': 'cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white'}`  }>
                <h1 className=" text-sm font-bold">ลม</h1>
                <FaWind className=" w-10 h-10 blu mx-auto mt-2"/> 
              </div>
              <div onClick={playingForest ? pauseForest : playForest } className={`cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white ${playingForest ? 'border-music': 'cursor-pointer mx-2.5 my-5 shadow-lg w-24 h-24 rounded-lg py-4 px-4 bg-white'}`  }>
                <h1 className=" text-sm font-bold">ป่า</h1>
                <FaTree className=" w-10 h-10 blu mx-auto mt-2"/> 
              </div>
            </div>
           {/* <button onClick={() => play('stop') } className="rd-bg w-24 h-10 cursor-pointer ml-3 rounded-lg text-white"> STOP </button> */}

        </div>
        </div>
    </div>

    

    <div className="grid grid-col-2 grid-flow-col gap-4 mt-4 justify-center position-relative">
        <div className="container-custom py-4 px-4 text-center">
          {/* <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={5} otpType="alpha" disabled={false} className=" justify-center" />
      <button className="bg-white w-24 h-10 cursor-pointer p-2 text-center rounded-lg ml-5 text-black" onClick={checkWord} > ยืนยัน </button> */}
      {/* <div><input className="shadow-lg rounded-sm p-2 w-80 h-12 mt-6 ml-14 " type="text" placeholder="พิมพ์คำศัพท์"  onChange={(e) => {setWordTyping(e.target.value);}}/>
   <button className="bg-white w-24 h-10 cursor-pointer p-2 text-center rounded-lg ml-10 text-black" onClick={checkWord} > ยืนยัน </button></div> */}
       
          <h1 className=" mt-10 rd-bg w-60 h-16 cursor-pointer p-4 m-auto text-center rounded-3xl text-white font-bold text-3xl" onClick={onClickStartTime}>เริ่มจับเวลา</h1>
          
          <Popup trigger={<h1 className="p-4 cursor-pointer  font-bold blu"> ประวัติการจับเวลา </h1> } modal nested>
         
              {close => (
                <div className="popup-history shadow-lg rounded-lg bg-white w-96 h-96 p-3">
                <h1 className="p-4 cursor-pointer text-center  font-bold blu text-2xl"> ประวัติการจับเวลา </h1>
                   <div className="grid grid-cols-2 gap-4 p-1">
                    <h1 className=" text-md font-bold text-black  ml-6 my-auto flex " > <FaBusinessTime className="my-auto"/>  เวลาที่ใช้</h1>
                    <h1 className=" text-md font-bold  text-black  ml-7 my-auto flex" > <FaRegGem className="my-auto " /> พ้อยที่ได้</h1>
                  </div>
                

              {historyList.map((val)=>{
              if(getUser == val.user_id){
                return (
              <div className=" h-auto w-auto mt-2.5 shadow-lg rounded-lg bg-white p-2 ">
                        <div className="grid grid-cols-2 gap-4 p-1 ">
                        <h1 className=" text-md font-bold  blu ml-6  flex " >{val.wtime} นาที </h1>
                        <h1 className=" text-md font-bold  blu  ml-7 flex" > {val.point}point</h1>
                        </div>
                </div> 
                )};
        }  
        )}
                </div>
              )}
          </Popup>
        </div> 
      </div>

      

    </div>
</main>
<Popuptest trigger={isPopup} >
  <div className="popup">
   <div className="popup-minigame rounded-lg shadow-lg position-relative">
       <h1 className=" font-bold text-3xl text-center text-white mt-12">หมดเวลาทำงานแล้วไปพักผ่อนสักหน่อย</h1>
       <h1 className=" font-bold text-2xl text-center text-white mt-7">เหลือเวลาเช็คพ้อย</h1>
       {/* <h1 className=" font-bold text-2xl text-center text-white mt-2"> <Countdown date={Date.now() + 10000} /> </h1> */}
       <h1 className=" font-regular text-xl text-center text-white mt-2"> <FaKeyboard className="m-auto"/></h1>
       <h1 className=" font-regular text-xl text-center text-white mt-2">พิมพ์คำศัพท์ตามที่กำหนด</h1>
       <div className="flex mt-7">
           <h1 className=" text-white rounded-md m-auto px-7 py-5 text-5xl font-bold">{randomID}</h1>
       </div>
       {/* <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="alpha" disabled={false} />
       <button className="bg-white w-24 h-10 cursor-pointer p-2 text-center rounded-lg ml-10 text-black" onClick={checkWord} > ยืนยัน </button> */}
         <div><input className="shadow-lg rounded-sm p-2 w-80 h-12 mt-6 ml-14 " type="text" placeholder="พิมพ์คำศัพท์" onChange={(event) =>  setWordTyping(event.target.value)}/>
         <button className="bg-white w-24 h-10 cursor-pointer p-2 text-center rounded-lg ml-10 text-black" onClick={() => {
          checkWord();
        }} > ยืนยัน </button></div>
       <h1 className=" font-regular text-xl text-center text-white mt-3">ชนิดประเภทตัวแปร</h1>
     </div>
     </div>
</Popuptest>

<Popuptest trigger={isPopup1} >
  <div className="popup">
   <div className="popup-minigame rounded-lg shadow-lg position-relative">
       <h1 className=" font-bold text-3xl text-center text-white mt-12">ได้เวลาทำงานแล้วววว กลับมาทำงานรึยังน้าาาา</h1>
       <h1 className=" font-bold text-2xl text-center text-white mt-7">เหลือเวลาเช็คพ้อย</h1>
       {/* <h1 className=" font-bold text-2xl text-center text-white mt-2"> <Countdown date={Date.now() + 10000} /> </h1> */}
       <h1 className=" font-regular text-xl text-center text-white mt-2"> <FaKeyboard className="m-auto"/></h1>
       <h1 className=" font-regular text-xl text-center text-white mt-2">พิมพ์คำศัพท์ตามที่กำหนด</h1>
       <div className="flex mt-7">
           <h1 className=" text-white rounded-md m-auto px-7 py-5 text-5xl font-bold">{randomID1}</h1>
       </div>
       {/* <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="alpha" disabled={false} />
       <button className="bg-white w-24 h-10 cursor-pointer p-2 text-center rounded-lg ml-10 text-black" onClick={checkWord} > ยืนยัน </button> */}
         <div><input className="shadow-lg rounded-sm p-2 w-80 h-12 mt-6 ml-14 " type="text" placeholder="พิมพ์คำศัพท์" onChange={(event) =>  setWordTyping1(event.target.value)}/>
         <button className="bg-white w-24 h-10 cursor-pointer p-2 text-center rounded-lg ml-10 text-black" onClick={() => {
          checkWord1();
        }} > ยืนยัน </button></div>
       <h1 className=" font-regular text-xl text-center text-white mt-3">ชนิดประเภทตัวแปร</h1>
     </div>
     </div>
</Popuptest>

</div>
);
}

export default TimerboxingDemo;
