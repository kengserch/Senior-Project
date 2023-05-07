import React, { useState, useEffect, useRef } from "react";
import Countdown from 'react-countdown';
import toast, { Toaster } from 'react-hot-toast';
import { FaList , FaRegClock , FaRegListAlt , FaCloudShowersHeavy, FaFire , FaWind , FaTree , FaKeyboard , FaBusinessTime , FaRegGem } from "react-icons/fa";


function Timecounttest() {
    const STATUS = {
        STARTED: "Started",
        STOPPED: "Stopped"
      };
      
  const INITIAL_COUNT = 10;
  //const [initialCount, setInitialCount] = useState(0);

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

    const handleStart = () => {
        setStatus(STATUS.STARTED);
    };
    // const handleStop = () => {
    //     setStatus(STATUS.STOPPED);
    // };
    // const handleReset = () => {
    //     setStatus(STATUS.STOPPED);
    //     setSecondsRemaining(initialCount);
    // };

    const [randomID, setRandomID] = useState(null);

      useEffect(() => {
        let keyword = ["float","double","integer","date" ,"varchar" , "text" , "string" ,"boolean" , "image" , "timestamp" , "char"];
        setRandomID(keyword[Math.floor(Math.random()*keyword.length)])
     },[]);

    const [wordTyping, setWordTyping] = useState("");

    function checkWord () {
        console.log(wordTyping)
     if ( wordTyping == randomID){
          toast.success('กรอกคำศัพท์ถูกต้อง')
          
     }else{
          
          toast.error("กรอกคำศัพท์ผิด")
     }
    };

    useInterval(
        () => {
        if (secondsRemaining > 0) {
            setSecondsRemaining(secondsRemaining - 1);    
        } 
        else {
            setStatus(STATUS.STOPPED);
        }
        },
        status === STATUS.STARTED ? 1000 : null
        // passing null stops the interval
    );


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


    const selectNumber = numberSelected => {

        if(numberSelected === "1"){
            //setInitialCount(900)
            console.log("1")
        }
        else if(numberSelected === "2"){
            //setInitialCount(3120)
            console.log("2")

          }
        else if(numberSelected === "3"){
           // setInitialCount(5400)
            console.log("3")

        }
      }

  return (
    <div className="App">
    <h1>React Countdown Test</h1>
    <div className="flex mt-7 px-6" >
        <button onClick={() =>{selectNumber('1'); toggleClass('1') } }   className={`mx-6 w-36 h-11 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold" ${isActive1 ? 'rd-bg text-white': 'bg-white mx-6 w-28 h-10 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold'}` }  >Pomodoro</button>
        <button onClick={() =>{selectNumber('2'); toggleClass('2') } }  className={`mx-6 w-36 h-11 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold" ${isActive2 ? 'rd-bg text-white': 'bg-white mx-6 w-28 h-10 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold'}` }>Desktime</button>
        <button onClick={() =>{selectNumber('3'); toggleClass('3') } }  className={`mx-6 w-36 h-11 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold" ${isActive3 ? 'rd-bg text-white': 'bg-white mx-6 w-28 h-10 cursor-pointer p-2 text-center rounded-lg blu shadow-lg font-bold'}` }>Pulse&Pause</button>
    </div>
    <div style={{ padding: 20 }} className="text-xl text-red-600 font-bold">
      {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
      {twoDigits(secondsToDisplay)}
    </div>
    <button onClick={handleStart} type="button" className="text-xl mx-auto mt-10 blu-bg w-40 h-10 cursor-pointer p-2 text-center rounded-lg text-white">
      Start
    </button>
    {/* <button onClick={handleStop} type="button">
      Stop
    </button>
    <button onClick={handleReset} type="button">
      Reset
    </button> */}
    
    <div>Status: {status}</div>
  </div>

  )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  const twoDigits = (num) => String(num).padStart(2, "0");

export default Timecounttest