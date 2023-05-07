import React, { useEffect , useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { format } from 'date-fns'
import Calendar from 'react-calendar';
import './Main.css'
import '../index.css'
import 'react-calendar/dist/Calendar.css';
import { FaList , FaRegClock , FaRegListAlt } from "react-icons/fa";
import { Link , Redirect , useHistory  } from "react-router-dom";
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

function Todo() {
        let history = useHistory();
        const [calendar, setCalendar] = useState(new Date());
        const [name , setName] = useState("");
        let [hour , setHour] = useState();
        let [date , setDate] = useState();

        const [calendarList,setCalendarList] = useState([]);
        
        let [startvalue, setstartvalue] = useState(9);
        let [endvalue, setendvalue] = useState(9);
        
        let [allHour , setallHour] = useState(0);
        let [allList , setallList] = useState(0);
        const [getUser,setgetUser] = useState();
  

    const addCalendarList =  () =>{
              hour = endvalue - startvalue;
              //console.log(hour);
              console.log(allList)
              // if( (!name || !hour || hour < 0) || allList > 4 ){
              if( (!name || !hour || hour < 0)){
                Swal.fire({
                  title: 'Failed Add!',
                  text: 'กรุณากรอกให้ครบ',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
              }else{
              Axios.post("http://localhost:3001/create" , {
                name:name,
                startvalue : startvalue,
                endvalue : endvalue,
                hour:hour,
                date:date,
                user_id:getUser
              }).then(()=>{
                console.log("success")
                Swal.fire({
                  title: 'Success Add!',
                  text: 'เพิ่มรายการสำเร็จ',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                }).then(()=>{
                  window.location.reload();
                })
              });
            }
            };

  const deleteList = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) =>{
      setCalendarList(
        calendarList.filter((val) =>{
          return val.id != id;
        })
      )
       Swal.fire({
          title: 'Success Delete!',
          text: 'ลบสำเร็จ',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      
    })
  }

  const gototimebox = () =>{
    window.location.href = '/timer-boxing'
  };

  useEffect(() =>{
    const token = localStorage.getItem('token')
    Axios.post('http://localhost:3001/authen', {
          },
          {
          headers: {
            Authorization: 'Bearer ' + token
          }
          }).then((res)=>{ 
          if(res.data.status == 'ok'){
           // console.log(response.data.decoded.id)
            const id = res.data.decoded.id
            //console.log(id)

            setgetUser(id)
            console.log(getUser)
            
          }else{
            //window.location = '/login'
            history.push("/login");
          }

          });  
      
          fetch("http://localhost:3001/calendar-list")
          .then(res => res.json())
          .then(
            (res) => {
              setCalendarList(res)
            },
          )

            setDate(format(calendar,'dd/MM/yyyy'));
            //console.log(date)

            
            
            //console.log(allHour)
            //console.log(allList)
      
  },[getUser]);



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
  

    
  
  const  changeDate =  calendar => {
     setCalendar(calendar);
     date = format(calendar,'dd/MM/yyyy')
     setDate(date)
     setallHour(0)
     setallList(0)
     calendarList.map((val)=>{
      if (date == val.date && getUser == val.user_id){

        let countList = calendarList.filter(e => e.date === date).length;
        let countList1 = calendarList.filter(e => e.date === date)
        console.log(countList1)
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
  };
  
  // const getCalendarList = () =>{
  //   Axios.get("http://localhost:3001/calendar-list").then((response)=>{
  //     console.log(response)
  //   });
  // };
  
  
  
  return (
    <div className="bg-blue-100 w-screen h-screen">
    <div className="container mx-auto px-14 pt-14 justify-center  z-1">
  
        <div className="grid grid-rows-2 grid-flow-col gap-4 mt-4 justify-center">
        <div className="shadow-lg container-todo h-full rounded-lg row-start-1 row-end-3 bg-white">
          <h1 className="blu font-bold text-2xl p-6">วางแผนและกำหนดการทำงาน</h1>
          <p className="text-2xl pl-4 flex"> <FaRegListAlt className="my-1.5 ml-3 mr-1.5 "/>รายการวันที่ :<h1 className="yel ml-2 font-bold">  {date} </h1> </p>
          <div className=" font-normal w-24 h-px bg-gray-900 flex mx-auto"></div>
          <div>
          {calendarList.map((val)=>{
              if (date == val.date && getUser == val.user_id){
               
              return (
             <div className="list-todo mt-2.5 shadow-lg rounded-lg bg-white mx-10 p-1 cursor-pointer ">
                       <div className="grid grid-cols-4 gap-4 p-1">
                       <h1 className=" text-md font-bold  break-words  my-auto" >{val.name} </h1>
                       <h1 className=" text-sm font-regular   my-auto" onClick={gototimebox}>{val.start}.00 - {val.end}.00 </h1>
                       <h1 className=" text-md font-bold  my-auto ml-2 flex" onClick={gototimebox}> <FaRegClock className="mt-1 mr-2 blu"/>{val.hour} hours</h1>
                       <button className=" text-white  h-8  text-md w-16 rounded-lg pl-2 font-bold float-right  my-auto ml-6 flex bg-red-400" onClick={ () => { deleteList(val.id) }}> delete </button>
                      </div>
              </div> 
              )} 
            }  
            )}
          </div>
          <Popup trigger={<h1 className="blu-bg mx-32 mt-14 w-22 h-10 cursor-pointer p-2 text-center items-center rounded-lg text-white">เพิ่มรายการ</h1>}
          modal
          nested>
    {close => (
      <div className="popup-insert shadow-lg rounded-lg bg-white w-96 h-96">
       
        
        <div className="content">
        <h1 className="blu text-center pt-4 font-bold text-xl"> รายการวันที่ :   {format(calendar,'dd/MM/yyyy') } </h1>
        <div className="grid grid-cols-3 gap-4 pt-10 px-4">
          <h1 className="font-bold">ชื่อรายการที่ต้องทำ</h1>
          <h1 className="font-bold">เวลาในการทำงาน</h1>
        </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 px-4">
          <Form.Control className="shadow-lg rounded-sm p-1" onChange={(event) => setName(event.target.value)} type="text" placeholder="ชื่อรายการ" />
  
          
          
          <Form.Select className="shadow-lg rounded-sm p-1" onChange={(event) =>  setstartvalue(event.target.value)} aria-label="Default select example">
          <option value="1">01.00</option>
          <option value="2">02.00</option>
          <option value="3">03.00</option>
          <option value="4">04.00</option>
          <option value="5">05.00</option>
          <option value="6">06.00</option>
          <option value="7">07.00</option>
          <option value="8">08.00</option>
          <option value="9">09.00</option>
          <option value="10">10.00</option>
          <option value="11">11.00</option>
          <option value="12">12.00</option>
          <option value="13">13.00</option>
          <option value="14">14.00</option>
          <option value="15">15.00</option>
          <option value="16">16.00</option>
          <option value="17">17.00</option>
          <option value="18">18.00</option>
          <option value="19">19.00</option>
          <option value="20">20.00</option>
          <option value="21">21.00</option>
          <option value="22">22.00</option>
          <option value="23">23.00</option>
          <option value="24">24.00</option>


          </Form.Select>
          <Form.Select className="shadow-lg rounded-sm p-1" onChange={(event) => setendvalue(event.target.value)} aria-label="Default select example">
          <option value="1">01.00</option>
          <option value="2">02.00</option>
          <option value="3">03.00</option>
          <option value="4">04.00</option>
          <option value="5">05.00</option>
          <option value="6">06.00</option>
          <option value="7">07.00</option>
          <option value="8">08.00</option>
          <option value="9">09.00</option>
          <option value="10">10.00</option>
          <option value="11">11.00</option>
          <option value="12">12.00</option>
          <option value="13">13.00</option>
          <option value="14">14.00</option>
          <option value="15">15.00</option>
          <option value="16">16.00</option>
          <option value="17">17.00</option>
          <option value="18">18.00</option>
          <option value="19">19.00</option>
          <option value="20">20.00</option>
          <option value="21">21.00</option>
          <option value="22">22.00</option>
          <option value="23">23.00</option>
          <option value="24">24.00</option>
          </Form.Select>
        </div>

        <h1 onClick={addCalendarList} className=" text-xl mx-auto mt-10 blu-bg w-40 h-10 cursor-pointer p-2 text-center rounded-lg text-white">เพิ่มรายการ</h1>
      </div>
    )}
  </Popup>
          </div>

          <div className="shadow-lg container-calendar rounded-lg bg-white ">
          <h1 className="blu font-bold text-2xl p-6">ปฎิทิน</h1>
            <Calendar  className="mx-auto w-full" onChange={changeDate} value={calendar} />
          </div>
          <div className="row-start-2 row-end-3">

          <div className="shadow-lg container-todo-show rounded-lg py-6 mx-auto bg-white">
           <FaRegClock className=" yel text-7xl float-left mx-6 "/>
            <h1 className=" yel font-bold text-3xl mt-1.5 ml-32 "> {allHour} ชั่วโมง </h1>
            <h1 className=" yel font-bold ml-32">เวลาในการทำงานวันนี้</h1>
          </div>

          <div className="shadow-lg container-todo-show mt-6 rounded-lg py-6 bg-white">
            <FaList className=" blu text-7xl float-left mx-6"/>
            <h1 className="blu font-bold text-3xl mt-1.5 ml-32"> {allList} รายการ</h1>
            <h1 className=" blu font-bold ml-32">รายการที่ต้องทำวันนี้</h1>
          </div>
          </div>
         
        </div>
    </div>
    </div>
  );
}



export default Todo;


