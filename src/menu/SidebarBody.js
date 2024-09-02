import React, { } from "react"
import Link from 'next/link'

import { useRouter } from 'next/router';

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainSidebarOpen, setDropdownOpen, setItemSelected } from 'redux/reducers/MainmenuReducer'
import { setModalRegWallet, setModalRegUsersWallet, setModalMessage } from 'redux/reducers/ModalReducer'
import { setAllowSound } from 'redux/reducers/SettingReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//-------------------------------------------------------

export default function SidebarBody() {


  const dispatch = useDispatch()
  const router = useRouter()
  const { currency } = useSelector((state) => state.GeneralReducer)
  const { isStokist } = useSelector((state) => state.AuthReducer)
  const { mainSidebarOpen, dropdownOpen, itemSelected } = useSelector((state) => state.MainmenuReducer)
  const { userAccount, userAccountShort, isWalletRegistered, MAINBalance } = useSelector((state) => state.UsersReducer)
  const { allowSound } = useSelector((state) => state.SettingReducer)


  const toggleSound = () => {
    if (allowSound) {
      dispatch(setAllowSound(false))
    } else {
      dispatch(setPlaySound('good'))
      dispatch(setAllowSound(true))
    }
  }

  const toggleSidebar = () => {
    mainSidebarOpen ? dispatch(setMainSidebarOpen(false)) : dispatch(setMainSidebarOpen(true))
  }

  const handleDropdownToggle = (n) => {
    if (dropdownOpen === n) {
      dispatch(setDropdownOpen(0))
    } else {
      dispatch(setDropdownOpen(n))
    }
  }

  const handleHomePage = (link) => {
    alert(link)
    router.push(link)
  }


  return (
    <>


      {/* <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col"> */}

<div className={`${mainSidebarOpen ? 'w-64' : 'w-14'} fixed flex flex-col h-[70%]  left-0 
      font-semibold  text-white transition-all duration-300  z-10 bg-[#1d3030] `}>
      
          <ul className="flex flex-col">

          <li className={`${dropdownOpen === 0 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href="/users"><a  className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                <i className="icofont-home text-red-300 text-xl"></i>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                  
                    <p className="ml-2 tracking-wide truncate text-sm"><i className="icofont-home text-yellow-300 text-xl mr-2"></i>HOME  DASHBOARD </p>
                   
                  </div>
                 
                </>}
            </a>
            </Link>

          
          </li>

          <li className={`${dropdownOpen === 1 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href=""><a onClick={() => handleDropdownToggle(1)} className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                  <svg width="24px" className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                  
                    <p className="ml-2 tracking-wide truncate text-sm"><i className="icofont-certificate-alt-1 text-red-300 text-xl"></i>  PACKAGES</p>
                    {/* <p className="ml-2 tracking-wide truncate text-xs">Network & Breeding</p> */}
                  </div>
                  <div className="mr-4">
                    <svg width="24px" className={`fill-current h-6 w-6 transform  transition duration-150 ease-in-out ${dropdownOpen === 1 ? '' : '-rotate-90'} `}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>}
            </a>
            </Link>

            <ul className={mainSidebarOpen && dropdownOpen === 1 ? "d-block animated fadeIn bg-gray-800 py-2 pb-6" : "hidden"}>

              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/packages')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 1 && dropdownOpen === 1 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-id-card  text-2xl  text-yellow-300 hover:text-green-300 "></i> <span className='ml-4'>Packages</span></p>
                </a>
              </li>

              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/my-packages')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 2 && dropdownOpen === 1 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                  <i className="icofont-chart-growth text-2xl mr-4 text-yellow-300"></i> My Packages</p>
                </a>
              </li>

              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/history-redeem-package')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 2 && dropdownOpen === 1 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                  <i className="icofont-chart-growth text-2xl mr-4 text-yellow-300"></i> History Redeem Packages</p>
                </a>
              </li>


            
           

                    

            </ul>
          </li>

          

          <li className={`${dropdownOpen === 2 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href=""><a onClick={() => handleDropdownToggle(2)} className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                  <svg width="24px" className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                    <p className="ml-2 text-sm tracking-wide truncate uppercase"><i className="icofont-electron text-red-300 text-lg"></i> TRANSACTION</p>
                    {/* <p className="ml-2 tracking-wide truncate text-xs">Purchase & Transfer</p> */}
                  </div>
                  <div className="mr-4">
                    <svg width="24px" className={`fill-current h-6 w-6 transform  transition duration-150 ease-in-out ${dropdownOpen === 2 ? '' : '-rotate-90'} `}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>}
            </a>
            </Link>

            <ul className={mainSidebarOpen && dropdownOpen === 2 ? "d-block animated fadeIn bg-gray-800 py-2 pb-6" : "hidden"}>
            
            <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/deposit')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 3 && dropdownOpen === 2 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-arrow-right text-yellow-400"></i> Deposit Wallet</p>
                </a>
              </li>
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/history-deposit')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 3 && dropdownOpen === 2 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-arrow-right text-yellow-400"></i> History Deposit Wallet</p>
                </a>
              </li>
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/wd-request')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 4 && dropdownOpen === 2 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                  <i className="icofont-arrow-right text-yellow-400"></i> WD Request</p>
                </a>
              </li>
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/history-wd-request')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 4 && dropdownOpen === 2 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                  <i className="icofont-arrow-right text-yellow-400"></i> History WD Request</p>
                </a>
              </li>
            </ul>
          </li>

          <li className={`${dropdownOpen === 3 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href=""><a onClick={() => handleDropdownToggle(3)} className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                  <svg width="24px" className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                    <p className="ml-2 text-sm tracking-wide truncate uppercase"><i className="icofont-flora-flower text-green-300 text-lg"></i> BONUS</p>
                    {/* <p className="ml-2 tracking-wide truncate text-xs">Purchase & Transfer</p> */}
                  </div>
                  <div className="mr-4">
                    <svg width="24px" className={`fill-current h-6 w-6 transform  transition duration-150 ease-in-out ${dropdownOpen === 3 ? '' : '-rotate-90'} `}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>}
            </a>
            </Link>

            <ul className={mainSidebarOpen && dropdownOpen === 3 ? "d-block animated fadeIn bg-gray-800 py-2 pb-6" : "hidden"}>
            
            <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/referrals')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 2 && dropdownOpen === 1 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                  <i className="icofont-chart-flow text-2xl mr-2 text-yellow-300"></i> My Referrals</p>
                </a>
              </li>

            <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/refferals-bonus')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 5 && dropdownOpen === 3 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-contact-add text-lg mr-1 text-yellow-300 hover:text-green-300"></i> Referral Bonus</p>
                </a>
              </li>
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/matching-bonus')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 6 && dropdownOpen === 3 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-hand-drag2 text-lg mr-1 text-yellow-300 hover:text-green-300"></i> Matching Bonus</p>
                </a>
              </li>

           

            </ul>
          </li>

          {/* //------------------- DROPDOWN 4 ------------------------ */}

          <li className={`${dropdownOpen === 6 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href=""><a onClick={() => handleDropdownToggle(6)} className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                  <svg width="24px" className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                    <p className="ml-2 text-sm tracking-wide truncate uppercase"><i className="icofont-gear text-red-300 text-lg"></i> SETTINGS</p>
                    {/* <p className="ml-2 tracking-wide truncate text-xs">Update Data</p> */}
                  </div>
                  <div className="mr-4">
                    <svg width="24px" className={`fill-current h-6 w-6 transform  transition duration-150 ease-in-out ${dropdownOpen === 6 ? '' : '-rotate-90'} `}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>}
            </a>
            </Link>

            <ul className={mainSidebarOpen && dropdownOpen === 6 ? "d-block animated fadeIn bg-gray-800 py-2 pb-6" : "hidden"}>
{/* 
            <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/profile')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 13 && dropdownOpen === 6 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-user text-lg mr-1 text-yellow-300 hover:text-green-300"></i> User Profile</p>
                </a>
              </li> */}
              
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/change-password')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 14 && dropdownOpen === 6 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-lock text-lg mr-1 text-yellow-300 hover:text-green-300"></i> Change Login Password</p>
                </a>
              </li>
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>router.push('/users/change-email')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 14 && dropdownOpen === 6 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-email text-lg mr-1 text-yellow-300 hover:text-green-300"></i> Change Email</p>
                </a>
              </li>
              <li>
                <a onClick={toggleSound} className={` cursor-pointer flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 15 && dropdownOpen === 6 && 'bg-white bg-opacity-10'}`}>
                  <span className="text-sm ">
                    {allowSound ?
                      <i className="icofont-audio text-xl mr-2 text-green-400 "></i> :
                      <i className="icofont-ui-mute text-xl mr-2 text-green-400"></i>
                    } Sound Setting
                  </span>
                </a>
              </li>

           </ul>
          </li>
        
        </ul>
      </div >

    </>
  )
}


