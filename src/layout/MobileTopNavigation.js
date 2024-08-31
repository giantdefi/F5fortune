import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
const moment = require('moment')

import dynamic from 'next/dynamic'
import LEftSidebar from "layout/LEftSidebar"
import RightSidebar from "layout/LoginSidebar"
//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux'

import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { setLoginSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function TopNavigation() {


    const router = useRouter()
    const dispatch = useDispatch()

    const { isLogin, userID, token, username, fullname, toggleLogin } = useSelector((state) => state.AuthReducer)
    const { showLogin } = useSelector((state) => state.SidebarReducer)
    const { spinnerAtVisitor } = useSelector((state) => state.LoaderReducer)
    const { cofetty } = useSelector((state) => state.ModalReducer)
    const { modalMenuDrawer } = useSelector((state) => state.ModalReducer)
    const { loginSidebar, leftSidebar } = useSelector((state) => state.MainmenuReducer)

    const handleUserClick = () => {

        if (router.pathname !== '/users') {
          
        }
        setTimeout(() => {
         
            router.push('/users')
        }, 1000)
    }

    const handleOpenDrawer = () =>{  
      
        if(leftSidebar){
            dispatch(setLeftSidebar(false))
           
        }else{
            dispatch(setLeftSidebar(true))
            dispatch(setLoginSidebar(false))
        }
      
      
    }

 
    
    const handleToggle = () => {
        dispatch(resetForm())
        dispatch(resetErrors())
      
        if(loginSidebar){
            dispatch(setLoginSidebar(false))
           
        }else{
            dispatch(setLoginSidebar(true))
            dispatch(setLeftSidebar(false))
        }
     
    }


    return (
        <>

<LEftSidebar/>
<RightSidebar/>

<div className="bg-red-900 sticky top-0  z-10">
<div className="bg-red-900 dark:bg-slate-900  rounded-br-[10%] rounded-bl-[10%] h-[100px] h-[90px] shadow-sm shadow-gray-200 w-full ">

<nav className="rounded-bl-[40%] px-3 pt-2 flex flex-grow relative justify-between z-10  mx-auto ">

   <a  className="flex-initial  w-[62px] h-[62px] p-2  cursor-pointer ">
 
   <button onClick={handleOpenDrawer} className={` outline-none hover:outline-hidden transition duration-150 mt-2 animated backInLeft`}>

       
        {modalMenuDrawer ?
       
         <i class="icofont-arrow-left text-[40px] text-white animated fadeIn"></i>:
       
<svg width="30px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512 " className={leftSidebar ?"transition duration-150 -rotate-90": "transition duration-150"}>
            <path fill="white" d="M12 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 12 12 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 12 12 12z" />
          </svg>

               }
          </button>
    
    </a>

    <a onClick={()=>router.push('/')} className="cursor-pointer  flex centered  w-[250px] mt-2  mr-6">
    <img src="/assets/F5-logo.png" className=" animated fadeInDown w-3/2" alt="logo" /> 
    </a>

    <div className="rounded-full w-[60px] h-[60px]  flex flex-col centered items-center ">

     
            {!isLogin? 
                                <button onClick={handleToggle}
                                    className="flex justify-center  text-sm text-white  rounded-full   
                  hover:bg-blue-500 transition ease-in-out duration-300 py-1 border-4 border-gray-400 text-xl px-2">
                                  {showLogin ? 'LOGIN' : 'REGISTER'}
                                    </button>
                                   
                                    
                                :
                               <>
                                                                               
                                <button onClick={()=>router.push('/users')}
                                className="text-white">
                                    <img src="/assets/img/avatar.webp" className="rounded-full w-[40px]" alt="users" />
                                       <small>Users</small>   </button>
                               </>
                              
                                
                                }
    </div>
    
    
</nav>

</div>
</div>
        </>
    )
}
