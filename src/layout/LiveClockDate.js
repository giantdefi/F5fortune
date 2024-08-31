import React, { useState, useEffect} from "react"
import Clock from 'react-live-clock'
const moment = require('moment')

export default function ClockAPI(){
    const [dateState, setDateState] = useState(new Date());
    // const currDate = new Date().toLocaleDateString();
    // const currTime = new Date().toLocaleTimeString();

    var date1 = (new Date())
    let date = date1.getDate();
    let year = date1.getFullYear()
   let month = moment().format('MMMM'); // date1.getMonth() + 1
    const datefull = moment(date1).format('dddd')+' '+date+' '+month+', '+year;
    
    const t = new Date();
    const c = t.getHours() - 12;
    useEffect(() => {
      setInterval(() => {
        setDateState(new Date());
      }, 1000);
    }, []);
  
    return (
      <>
        <p className="mb-4  tracking-tight leading-none  text-white-900  dark:text-white">
        {datefull} {' '}
          {dateState.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "2-digit",
            hour12: true,
          })}
        </p> 
  
      </>
    );
  };
