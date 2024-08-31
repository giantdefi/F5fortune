import React, { useRef, useEffect, useState } from "react"

import SidebarTop from "./SidebarTop"
import SidebarBodyDrawer from "./SidebarBodyDrawer"
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



  return (
    <>
{/* min-h-screen */}
  
<div ref={outsideRef} style={{ zIndex: 46 }}
        className={`flex flex-col  z-30 text-white min-h-screen
        fixed transition-all duration-300 ${mainSidebarOpen ? " w-96 " : "w-14 "} `}>

        <div className="h-[25%]  mb-4 mr-16">
          {/* <SidebarTop /> */}
          <div className="flex centered ">
          {/* <img src="/assets/img/makei-animate-1.gif" className="w-[180px] mr-20" alt="banner" /> */}
          <img className="  w-[400px]" src="/assets/img/cats.webp" alt="banner" />
       
        </div>
        </div>

        <div className="h-[70%]  ">
          <SidebarBodyDrawer />
        </div>

        <div className="h-[5%] z-30 overflow-x-hidden  pt-1">

          <SidebarFooter />
        </div>

      </div>
    </>
  )
}


