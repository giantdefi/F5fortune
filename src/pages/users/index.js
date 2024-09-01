import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

import dynamic from 'next/dynamic'


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalToast, setModalMessage,  } from 'redux/reducers/ModalReducer';

//import {setAdminPackageArray, setAllowRelaodPAckage, setItemToEdit } from 'redux/reducers/PackageReducer'
//--------------------------------------

export default function Users() {

    const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)
//    const { adminPackageArray, allowRelaodPackage } = useSelector((state) => state.PackageReducer)
    const router = useRouter()
    const dispatch = useDispatch() 
    const { app_currency} = useSelector((state) => state.ConstantReducer)
    const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
    const { isLogin, e_wallet, r_wallet, wd_request, total_wd_paid } = useSelector((state) => state.AuthReducer)
   // const { WDCashArray, WDCashTx, WDCashTotal,totalWDPaid } = useSelector((state) => state.HistoryReducer)
  
    
    useEffect(() => {

      if(isLogin){
        getPackage()
      getStats()
      }else{
        router.push('/')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getPackage = () => {
    const URL = process.env.NEXT_PUBLIC_API_URL_V1
    return axios({
        url: `${URL}/admin/packages`,
        method: 'GET',
      
        'headers': {
           // 'Authorization': token,
            accept: 'application/json',
            'content-type': 'application/json',
        }
    })
        .then(async response => {
  
            const data = response.data
         //   console.log(data)
  
            if (data.isSuccess) {
           
            //  dispatch(setCreatepackagesidebar(false))
          
             // dispatch(setAdminPackageArray(data.newData))
             
           
              // return dispatch(setModalToast({ type: response.data.type, title : response.data.title, message: response.data.message }))
  
  
            } else {
              //  setSpinner(false)
                return dispatch(setError({ path: response.data.path, message: response.data.message }))
            }
  
          //  setSpinner(false)
  
        }).catch(function (error) {
          //  setSpinner(false)
            console.log(error)
            return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
        })
}

    const getStats = () => {
      const URL = process.env.NEXT_PUBLIC_API_URL_V1
      return axios({
          url: `${URL}/admin/stats`,
          method: 'GET',
        
          'headers': {
             // 'Authorization': token,
              accept: 'application/json',
              'content-type': 'application/json',
          }
      })
          .then(async response => {
    
              const data = response.data
          //    console.log(data.data[0])
    
              if (data.isSuccess) {
             
            //  dispatch(setTotal_users(data.data[0].total_users))
            //  dispatch(setActive_users(data.data[0].active_users))
            //  dispatch(setTotal_wd(data.data[0].wd_request))
            //  dispatch(setTotal_paid(data.data[0].wd_paid))
            // /// console.log(data.UserStats)
            //  dispatch(setUsers_stats(data.UserStats))
    
              }
    
           
    
          }).catch(function (error) {
              console.log(error)
              return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
          })
  }

    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen">

            <div className="h-[300px] bg-sky-700 flex  fixed w-full max-w-md lg:max-w-full">
          
          </div>

            <div className=" transition-all  duration-300 flex flex-col pt-6 text-white ">
            <div className="transition-all duration-300 flex flex-col w-full   mx-auto text-white ">
            <div className=" w-full mx-auto md:w-10/12 lg:w-10/12 lg:mt-6">



                <section className="w-full mx-auto text-white animated fadeIn">


                    {/* <div className="text-center py-2 px-4 mb-2">
                    <p className="uppercase bold mb-2 text-xl">* ADMIN DASHBOARD *</p>              

                    </div> */}

<div className="min-h-screen  w-full pb-20 px-10">
 

 <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mt-10 w-full ">
 <div className="relative flex flex-col bg-clip-border border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">E Wallet</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"><small className="text-sm">{app_currency}</small>  {parseFloat(e_wallet).toLocaleString(2)}</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <small > Withdrawable Amount</small>
            </p>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path fill-fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">R Wallet</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"><small  className="text-sm">{app_currency}</small>  {parseFloat(r_wallet).toLocaleString(2)}  </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
             <small >Amount for buy Package</small>
            </p>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total WD Cash request</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"><small  className="text-sm">{app_currency}</small>  {parseFloat(wd_request).toLocaleString(2)}</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <small >Total WD Request to Admin</small>
            </p>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd"></path>
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total WD Paid</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"><small  className="text-sm">{app_currency}</small> {parseFloat(total_wd_paid).toLocaleString(2)}</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
             <small> Total WD paid to your wallet address</small>
            </p>
          </div>
        </div>
       
      </div>
  

</div>
                </section>
            </div>
            </div>
            </div>
            </div>
        </>
    )
}



