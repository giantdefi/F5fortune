import React, {useRef, useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"

import Username from 'components/inputforms/login/Username'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setLoginSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
import { setAllowSound } from 'redux/reducers/SettingReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'
import { setdropdownOpen } from 'redux/reducers/DrawerReducer'
//--------------------------------------

export default function Home() {

  
 const dispatch = useDispatch()
  const router = useRouter()
  const { rightSidebar, leftSidebar } = useSelector((state) => state.MainmenuReducer)
  const { isLogin } = useSelector((state) => state.AuthReducer)
  const { allowSound } = useSelector((state) => state.SettingReducer)
  const { dropdownOpen } = useSelector((state) => state.DrawerReducer)

const handleClickMenu = (link) => {
   dispatch(setLeftSidebar(false))

   if(!isLogin){
      dispatch(setLoginSidebar(true))
   }else{
      router.push(link)
   }
}

const handleSound = () => {
   if (allowSound) {
     dispatch(setAllowSound(false))
   } else {
     dispatch(setPlaySound('good'))
     dispatch(setAllowSound(true))
   }
 }

const handleDropdownOpen = (no) => {
   if(dropdownOpen === no) {
      dispatch(setdropdownOpen(0))
   }else{
      dispatch(setdropdownOpen(no))
   }
   
}


return (
  <>


<div  class={`fixed bg-red-900 overflow-auto pb-20  top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform  ${!leftSidebar && "-translate-x-full"} bg-white w-96 mt-24 dark:bg-gray-800`} tabindex="-1" aria-labelledby="drawer-navigation-label">     
   
    

     
    <h5  class="text-base font-semibold text-white uppercase dark:text-gray-400">Menu</h5>
  

  <div class="py-4 mb-20 h-screen pb-20 pt-10 border-t">
      <ul class="space-y-2 font-medium text-lg text-white">

         
         <li>
            <button onClick={()=>handleClickMenu('/')} class="flex items-center p-2  text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i className="icofont-home mr-4 text-2xl"></i>
               <span class="ms-3">Dashboard</span>
            </button>
         </li>
         <li>
            <button onClick={()=>handleDropdownOpen(1)}  class="flex items-center w-full p-2 text-base  text-white transition duration-75 rounded-lg group  dark:text-white " >
            <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover: text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ml-4  text-white">PACKAGES</span>
                  <svg class={`w-3 h-3 ${dropdownOpen === 1 ? '' : '-rotate-90'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            <ul  class={` py-2 space-y-6 animated fadeIn ${dropdownOpen === 1 ? '' : 'hidden'} `}>
                  <li>
                     <button onClick={()=>handleClickMenu('/users/packages')} class="ml-6"><i class="icofont-arrow-right"></i>Packages</button>
                  </li>
                  <li>
                     <button onClick={()=>handleClickMenu('/users/my-packages')} class="ml-6"><i class="icofont-arrow-right"></i>My Package</button>
                  </li>
                 
                 
            </ul>
         </li>

         <li>
            <button onClick={()=>handleDropdownOpen(2)}  class="flex items-center w-full p-2 text-base  text-white transition duration-75 rounded-lg group  dark:text-white " >
            <i className="icofont-electron text-red-300 text-2xl"></i>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ml-4  text-white">TRANSACTIONS</span>
                  <svg class={`w-3 h-3 ${dropdownOpen === 2 ? '' : '-rotate-90'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            <ul  class={` py-2 space-y-6 animated fadeIn ${dropdownOpen === 2 ? '' : 'hidden'} `}>
            <li>
                     <button onClick={()=>handleClickMenu('/users/deposit')} class="ml-6 "><i class="icofont-arrow-right"></i>Deposit Wallet</button>
                  </li>
                  <li>
                     <button onClick={()=>handleClickMenu('/users/history-deposit')} class="ml-6 "><i class="icofont-arrow-right"></i>History Deposit Wallet</button>
                  </li>
                  <li>
                     <button onClick={()=>handleClickMenu('/users/wd-request')} class="ml-6 "><i class="icofont-arrow-right"></i>WD Request</button>
                  </li>
                  <li>
                     <button onClick={()=>handleClickMenu('/users/history-wd-request')} class="ml-6 "><i class="icofont-arrow-right"></i>History WD Request</button>
                  </li>
                 
            </ul>
         </li>

         <li>
         <button onClick={()=>handleDropdownOpen(3)}  class="flex items-center w-full p-2 text-base  text-white transition duration-75 rounded-lg group  dark:text-white " >
            <svg class={`w-3 h-3 ${dropdownOpen === 3 ? '' : '-rotate-90'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ml-4">BONUS</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            <ul  class={` py-2 space-y-6 animated fadeIn ${dropdownOpen === 3 ? '' : 'hidden'} `}>
           
            <li>
                     <button onClick={()=>handleClickMenu('/users/referrals')} class="ml-6"><i class="icofont-users mr-4"></i>My Referrals</button>
                  </li>
            <li>
                 
                  <button onClick={()=>handleClickMenu('/users/refferals-bonus')} class="ml-6 "> 
                      <i class="icofont-flora-flower text-2xl mr-4"></i> 
                     Referrals Bonus</button>
                    
                  </li>
                  <li>
                     <button onClick={()=>handleClickMenu('/users/matching-bonus')} class="ml-6">
                     <i class="icofont-chart-flow text-2xl mr-4"></i>   Matching Bonus</button>  
                  </li>
                 
            </ul>
         </li>


         <li>
         <button onClick={()=>handleDropdownOpen(4)}  class="flex items-center w-full p-2 text-base  text-white transition duration-75 rounded-lg group  dark:text-white " >
            <svg class={`w-3 h-3 ${dropdownOpen === 4 ? '' : '-rotate-90'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ml-4">SETTTINGS</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            <ul  class={` py-2 space-y-6 animated fadeIn ${dropdownOpen === 4 ? '' : 'hidden'} `}>
            <li>
                     <button onClick={()=>handleClickMenu('/users/change-password')} class="ml-6">
                         <i className="icofont-lock text-2xl mr-1 text-yellow-300 hover:text-green-300"></i>
                        Login Password</button>
                  </li>
                  <li>
                     <button onClick={()=>handleClickMenu('/logout')} class="ml-6">
                         <i className="icofont-logout text-2xl mr-1 text-yellow-300 hover:text-green-300"></i>
                        Logout</button>
                  </li>
                  <li>
                  <button onClick={handleSound} className="cursor-pointer flex flex-row items-center h-10  pl-6 " >
                    
                    <span className="text-sm ">
                      {allowSound ?
                        <i className="icofont-audio text-3xl mr-2 text-green-400 "></i> :
                        <i className="icofont-ui-mute text-3xl mr-2 text-green-400"></i>
                      } Sound Setting
                    </span>
                  </button> 
                  </li>
                 
            </ul>
         </li>

        

         <li>
         <button  onClick={()=>handleClickMenu('/logout')}  class="flex items-center w-full p-2 text-base  text-white transition duration-75 rounded-lg group  dark:text-white " >
         <i className="icofont-logout text-2xl mr-1 text-yellow-300 hover:text-green-300"></i>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ml-4">LOGOUT</span>
                
            </button>
          
         </li>
        
   
   
    
     
      </ul>
   </div>
</div>

  
     

   

  </>
)
}



