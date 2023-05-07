import React, { useEffect , useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { format } from 'date-fns'
import Calendar from 'react-calendar';
import '../components/Main.css'
import '../index.css'
import 'react-calendar/dist/Calendar.css';
import { FaRegCalendarAlt , FaRegClock , FaRegChartBar, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import { Form } from 'react-bootstrap';
import * as Axios from 'axios';
import Swal from 'sweetalert2'
import set from 'date-fns/set'
import { Line, Circle } from 'rc-progress';

function Home() {
  
  return (
    <div className="bg-white ">
        <div className="cover bg-gray-900">
        <img className=" w-80 h-auto m-auto pt-10" src="../images/logowhite.png" alt="logo"  />
            <h1 className=" text-white text-center text-4xl font-bold">ตัวช่วยจับเวลาตอนทำงาน</h1>
        </div>
    <div className="container mx-auto px-14 pt-14 justify-center  z-1">
    <div className=" w-80  h-0.5 m-auto bg-gray-900"></div>
    <h1 className=" text-3xl text-center mt-20">“ วิธีจัดการเวลาอย่างมีประสิทธิภาพ เราขอแนะนำ “Timeboxing” ซึ่งจะช่วยให้เราโฟกัสงานแต่ละช่วงได้ดียิ่งขึ้น ครบตามความต้องการ และทันเดดไลน์ “</h1>
    <div className=" w-80  h-0.5 bg-gray-900 mt-20 m-auto"></div>
    <h1 className=" text-3xl text-center mt-20 font-bold">Feature ของเรา</h1>

    <div class="grid grid-cols-2 gap-4 p-28">
        <div className="shadow-lg w-96 h-96 rounded-lg py-9 blu-bg mx-auto">
            < FaRegCalendarAlt className="w-20 h-20 text-white m-auto"/>
            <h1 className=" text-white font-bold text-3xl mt-5 yel text-center"> ปฏิทิน</h1>
            <div className="text-xl text-white ml-14 mt-10">
            <li>
            เพิ่มรายการที่ต้องทำในปฏิทิน
            </li>
            <li>
            เพิ่มเวลาทำงานในปฏิทิน
            </li>
            <li>
            สรุปรวม เวลา และ รายการ
            </li>
            </div>
        </div>

        <div className="shadow-lg w-96 h-96 rounded-lg py-9 blu-bg mx-auto">
            < FaRegClock className="w-20 h-20 text-white m-auto"/>
            <h1 className=" text-white font-bold text-3xl mt-5 yel text-center"> จับเวลา</h1>
            <div className="text-xl text-white ml-20 mt-10">
            <li>
            จัดการเวลาวันปัจจุบัน
            </li>
            <li>
            ตั้งเวลาในการทำงานพัก
            </li>
            <li>
            มีเช็คพ้อยท์
            </li>
            <li>
            มีเพลงเปิดขณะทำงาน
            </li>
            </div>
        </div>

        <div className="shadow-lg w-96 h-96 rounded-lg py-9 blu-bg mx-auto">
            < FaRegChartBar className="w-20 h-20 text-white m-auto"/>
            <h1 className=" text-white font-bold text-3xl mt-5 yel text-center"> สถิติ</h1>
            <div className="text-xl text-white ml-14 mt-10">
            <li>
            สถิติเวลาทำงานทั้งหมด
            </li>
            <li>
            สถิติเวลาทำงานหรือพัก
            </li>
            </div>
        </div>

        <div className="shadow-lg w-96 h-96 rounded-lg py-9 blu-bg mx-auto">
            < FaRegUser className="w-20 h-20 text-white m-auto"/>
            <h1 className=" text-white font-bold text-3xl mt-5 yel text-center"> โปรไฟล์</h1>
            <div className="text-xl text-white ml-28 mt-10">
            <li>
            โปรไฟล์
            </li>
            <li>
            แต้มเช็คพ้อยท์
            </li>
            </div>
        </div>
        
        
    </div>

    </div>


    
    </div>
  );
}

export default Home;
