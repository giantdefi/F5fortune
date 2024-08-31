import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import axios from 'axios'

import LoginSidebar from "layout/LoginSidebar"
import ReferralLink from "components/reflink/ReferralLink"
//import BtnDemoUser from "redux/actions/BtnDemoUser"
//import BtnActivateUser from "redux/actions/BtnActivateUser"
import { setPlaySound } from 'redux/reducers/SoundReducer'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { setLoginSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function MainHeader() {

    const router = useRouter()
    const dispatch = useDispatch();
    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { showLogin } = useSelector((state) => state.SidebarReducer)
    const { toggleLogin } = useSelector((state) => state.AuthReducer)
    const { loginSidebar } = useSelector((state) => state.MainmenuReducer)

    const onMenuClick = (link) => {
        dispatch(setPlaySound('click'))
      //  setItemLink(link)

      //  setMenuSpinner(true)
        setTimeout(() => {
            router.push(link)
        }, 100)
    }

//     const handleToggle = () => {
//         if(toggleLogin){
// dispatch(setToggleLogin(false))
//         }else{
//             dispatch(setToggleLogin(true))
//         }
        
//     }

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

          <ReferralLink/>
          <LoginSidebar/>

          {/* {isLogin && <LoadUserData/> } */}

            <nav className="_gradient_mtree p-2 mt-0 fixed w-full z-10   ">
                <div className=" mx-auto flex flex-row justify-between">

                <div className="flex h-14 centered sm:justify-center md:justify-start  mx-auto sm:mx-0
                  w-full md:w-80 ">

                     
                        <a onClick={() => onMenuClick('/')} className="flex cursor-pointer w-full">
                       
                            <img src="/assets/F5-logo.png" className="ml-4 h-6 w-[240px] mt-2 animated fadeInDown" alt="logo" />
                        
                        </a>

                        <div onClick={() => onMenuClick('/users')} className="md:hidden rounded-full w-[65px] h-[65px] mt-4">
                            <button className="rounded-full cursor-pointer border-2 border-gray-400">
                                <img src="/assets/img/banner-1.webp" className="rounded-full animated fadeIn" alt="VISITOR" />
                            </button>
                        </div>

                    </div>

                    <div className="flex w-full pt-2 content-center justify-between lg:w-1/2 md:justify-end">
                        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">

                        {/* <li className="mr-3 uppercase font-semibold">
                                <Link href="/"><a className="inline-block py-2 px-4 text-white no-underline"
                                 
                                >Home</a></Link>
                            </li>

                            <li className="mr-3 uppercase font-semibold">
                                <Link href="/"><a className="inline-block py-2 px-4 text-white no-underline"
                                    // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
                                >Boards</a></Link>
                            </li>

                            <li className="mr-3 uppercase font-semibold">
                                <Link href="/"><a className="inline-block py-2 px-4 text-white no-underline"
                                    // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
                                >My Packages</a></Link>
                            </li>

                            <li className="mr-3 uppercase font-semibold">
                                <Link href="/"><a className="inline-block py-2 px-4 text-white no-underline"
                                    // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
                                >Bonus</a></Link>
                            </li> */}


                            <li className="mr-3 flex centered">
                             {!isLogin? 
                                <button onClick={handleToggle}
                                    className="flex justify-center  text-sm text-white  rounded-full   
                  hover:bg-blue-500 transition ease-in-out duration-300 py-1 border-4 border-gray-400 text-xl px-4">
                                  {showLogin ? 'LOGIN' : 'REGISTER'}  
                                    </button>
                                   
                                    
                                :
                               <>
                                                                               
                                <button onClick={()=>router.push('/users')}
                                className="flex justify-center  text-sm text-white  rounded-full   
                                hover:bg-blue-500 transition ease-in-out duration-300 py-1 border-4 border-gray-400 text-xl px-4">
                                                DASHBOARD</button>
                               </>
                              
                                
                                }

                            </li>
                        </ul>
                    </div>


                </div>
            </nav>

        </>
    )
}



