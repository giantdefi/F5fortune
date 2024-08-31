import React, { } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
//-------------------------------------------------------

export default function SidebarFooter() {

  // redux store
  const router = useRouter()
  const dispatch = useDispatch()
  const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)

  return (
    <>


      {/* <p className="py-3 h-1/3 text-center flex justify-center items-center text-sm ">
      
        {mainSidebarOpen && <> <span className="text-xs">support</span> : maticxforce@gmail.com </>}
      </p> */}

    </>
  )
}

