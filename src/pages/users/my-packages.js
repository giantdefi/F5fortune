import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

import dynamic from 'next/dynamic'
import Wallet from "components/wallet"

//---- REDUX STORE ---------------------
import { setPlaySound } from 'redux/reducers/SoundReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setModalToast, setModalMessage,setModalConfirmBuyPackage  } from 'redux/reducers/ModalReducer';
import { resetStatement } from 'redux/reducers/StatementReducer';
import { setMypackages, setDetailPackage } from 'redux/reducers/PackageReducer'
//--------------------------------------

export default function Users() {
    const router = useRouter()
    const dispatch = useDispatch() 
   
    const {  title, desc } = useSelector((state) => state.GeneralReducer)
    const { myPacakges, detailPackage } = useSelector((state) => state.PackageReducer)
 
    const { userid, token } = useSelector((state) => state.AuthReducer)

    useEffect(() => {
      dispatch(setDetailPackage(false))
      dispatch(resetStatement())
        getMyPackage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getMyPackage = async () => {

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
   return axios({
       url: `${URL}/package/my-package?userid=${userid}`,
       method: 'GET',
     
       'headers': {
           'Authorization': token,
           accept: 'application/json',
           'content-type': 'application/json',
       }
   })
       .then(async response => {

           const data = response.data.data
       //    console.log(data)
          dispatch(setMypackages(data)) 

       }).catch(function (error) {
         
           console.log(error)
           return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
       })
} 

   const handleDetailPackage = (data) => {
    dispatch(setPlaySound('pling'))
    dispatch(setDetailPackage(data))
    router.push('/users/detail-packages')
   }


    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen ">

            <div className="flex justify-center  w-md items-center h-12 fixed top-[90px] md:top-[55px] md:right-0 z-10 bg-gray-900  ">
            <div className=" z-10 w-[450px] centered flex flex-row  h-12 ">
          <Wallet/>
            </div>                 
            </div>

            {/* <div className="h-[300px] bg-sky-700 flex  fixed w-full max-w-md lg:max-w-full"> </div> */}
          

 <section className=" dark:bg-gray-900 mt-20 lg:mt-20">
  <div className="py-8 px-4 mx-auto  lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-lg text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight bold text-gray-100 dark:text-white">My Active Packages</h2>
          <p className="text-gray-100">You have : {myPacakges ? myPacakges.length : '0'} Active packages</p>
      </div>
      <div className="mx-auto max-w-7xl  px-4">
  
 
  <div
    className="space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">

   {myPacakges && myPacakges.map((item,index)=>{
    return (
        <div className="divide-y bg-white divide-gray-200 rounded-lg border border-gray-200 shadow-md" key={index}>
      <div className="p-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">{item.name} - {item.value}</h2>
        {/* <p className="my-4 text-4xl font-bold tracking-tight text-gray-900">
          $<span id="basicPlanPrice">{item.value}</span>
        </p> */}
        <div className="flex-col">
          <button onClick={()=>handleDetailPackage(item)} className="shadow-lg mt-3 block w-full rounded-md border border-blue-800
           bg-blue-800 py-2 text-center text-sm font-semibold text-white hover:bg-blue-900">SEE PROGRESS →</button>
        </div>
      </div>
      <div className="px-6 pt-2 pb-8">
       
        <ul role="list" className="">
        
          <li className="flex space-x-1 items-center">
            <div className="w-6 h-6 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg></div><span className="text-md text-gray-800">Status : {!item.completed? 'In Progress' : 'Completed'}</span>
          </li>
        
        
        </ul>
      </div>
    </div>
    )
   })}
    

    
  

    
   

  </div>

</div>
  </div>
</section>


         

         
            </div>
        </>
    )
}



