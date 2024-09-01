import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

import dynamic from 'next/dynamic'

const LiveClockDate = dynamic(() => import("./LiveClockDate"), {
    ssr: false,
})



//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux'


export default function TopNavigation() {


    const router = useRouter()
    const dispatch = useDispatch()
 
    const { isLogin, userID, token, name, fullname } = useSelector((state) => state.AuthReducer)
 
    const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
 
  

    return (
        <>

            <div className= {mainSidebarOpen ? "ml-64 fixed w-full flex justify-between h-14 text-white z-10 bg-[#8B008B]" :
            "fixed w-full h-14 flex justify-between text-white z-10 bg-[#8B008B]"}
            >


                <div className={`flex justify-between items-center transition-all duration-300 ${mainSidebarOpen ? 'ml-14' : 'ml-16'} } `}>
                    <div className="ml-5 text-gray-200">
                        <span>    <LiveClockDate /></span>
                    </div>
                </div>

                <div className="fixed right-0 top-2 flex justify-between items-center">
                    <ul className="flex centered ">
                            <>
                                <p className="text-sm mr-2">{isLogin? name : 'GUEST'} </p>
                                <button className=" flex-initial rounded-full  border-2 border-gray-500  cursor-pointer w-[40px] h-[40px]">

                                    <img src="/assets/img/avatar.webp" className="rounded-full w-[40px]" alt="users" />

                                </button>

                            
                                <button onClick={()=>router.push('/logout')} className= 
                                "mr-14 flex items-center mr-4 hover:text-blue-100  _btn_submit_red ml-2" 
                                >  Logout</button>
                            </>
                       
                    </ul>
                </div>
            </div>
        </>
    )
}
