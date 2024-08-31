import React, { useRef, useEffect, useState } from "react"

import SidebarTop from "./SidebarTop"
import SidebarBody from "./SidebarBody"
import SidebarFooter from "./SidebarFooter"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainSidebarOpen } from 'redux/reducers/MainmenuReducer'
//-------------------------------------------------------

export default function FirebaseSidebar() {

  const outsideRef = useRef(null)

  const dispatch = useDispatch()
  const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
  const [screenSize, setScreenSize] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {  // Sidebar close open based on screen size
   
    if(width <= 1000){
     
     dispatch(setMainSidebarOpen(false))
    }else{
      dispatch(setMainSidebarOpen(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])



  return (
    <>


<div ref={outsideRef} style={{ zIndex: 46 }}
        className={`flex flex-col min-h-screen  z-30 text-white  bg-[#051e34ff]
        fixed transition-all duration-300 ${mainSidebarOpen ? " w-64 " : "w-14 "} `}>

        <div className="h-[25%]  bg-slate-800">
          <SidebarTop />
        </div>

        <div className="h-[70%] bg-slate-800 ">
          <SidebarBody />
        </div>

        <div className="h-[5%] z-30 overflow-x-hidden bg-blue-900 pt-1">

          <SidebarFooter />
        </div>

      </div>
    </>
  )
}


