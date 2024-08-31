import React, { useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router';

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainSidebarOpen } from 'redux/reducers/MainmenuReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'
import { setLoader } from 'redux/reducers/LoaderReducer'

//-------------------------------------------------------


export default function SidebarTop() {

  // redux store
  const dispatch = useDispatch()
  const router = useRouter()

  const { mainSidebarOpen, headerBoardNo } = useSelector((state) => state.MainmenuReducer)
  const { userAccountID } = useSelector((state) => state.UsersReducer)


 

  const toggleSidebar = () => {
    mainSidebarOpen ? dispatch(setMainSidebarOpen(false)) : dispatch(setMainSidebarOpen(true))
  }

  const onMenuClick = (link) => {
    // dispatch(setCurrentBoardLevel(false))
    dispatch(setPlaySound('click'))
  //  setItemLink(link)
    router.push(link)
  }



  return (
    <>

<div className="flex justify-between ">
      <div className=" h-12 justify-start flex flex-row  pl-5">
        <button onClick={toggleSidebar} className={` outline-none hover:outline-hidden transition duration-150 ${mainSidebarOpen ? '' : '-rotate-90'} `}>
          <svg width="20px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
        </button>

      </div>

      <div className="flex h-14 centered sm:justify-center md:justify-start  mx-auto sm:mx-0 
                  w-full md:w-80 ">

                     
                        <a onClick={() => onMenuClick('/')} className="flex cursor-pointer w-full">
                        {mainSidebarOpen ?  <img src="/assets/F5-logo.png" className="ml-2 h-6 w-[160px] animated fadeInDown" alt="logo" /> : ''} 
                           
                        
                        </a>

                       
                    </div>

                    </div>

    </>

  )
}


