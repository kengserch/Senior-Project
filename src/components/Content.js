import React,{useEffect} from "react";
import { gsap } from "gsap";
import './Main.css'
const Content = (props) => {
    const {thumbnailUrl1 , thumbnailUrl2 } = props;

    useEffect(() => {
      gsap.set(".hero", {visibility: 'visible'});
      gsap.fromTo(".hero", {y: 200}, {y: 0, duration: 1});
      gsap.fromTo(".hero", {opacity: 0}, {opacity: 1, duration: 1});
    })
  return (
    <div className="hero flex flex-col justify-center items-center justify-center mx-20">
      <div className=" grid xl:grid-cols-2 gap-x-2.5 md:grid-cols-1 sm:grid-cols-1">
        <div>
          <img
            src={thumbnailUrl1}
            width="auto"
            height="auto"
            alt=""
            className="cursor-pointer opacity-80 rounded mb-10 shadow-xl hover:opacity-100"
          />
        </div>

        <div>
          <img
            src={thumbnailUrl2}
            width="1000"
            height="1000"
            alt=""
            className="cursor-pointer opacity-80 rounded mb-10 shadow-xl hover:opacity-100 "
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
