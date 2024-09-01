import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

import dynamic from 'next/dynamic'
import Wallet from "components/wallet"
import { setPlaySound } from 'redux/reducers/SoundReducer';
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalToast, setModalMessage,setModalConfirmBuyPackage  } from 'redux/reducers/ModalReducer';

import { setSelectedPackage } from 'redux/reducers/PackageReducer'
//--------------------------------------

export default function Users() {
    const router = useRouter()
    const dispatch = useDispatch() 
   
    const {  title, desc } = useSelector((state) => state.GeneralReducer)
    const { admin_packages, selectedPackage } = useSelector((state) => state.PackageReducer)
 
    const { isLogin, isActive, e_wallet, r_wallet } = useSelector((state) => state.AuthReducer)


    useEffect(() => {

        if(!isLogin){
            router.push('/')
        }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   const handleBuyPackage = (item) => {
       dispatch(setPlaySound('error'))
       dispatch(setSelectedPackage(item))
       if(parseFloat(e_wallet) < parseInt(item.package_value)){
         dispatch(setModalToast({ type: 'error', title: "Request Fail!", message: "insufficient EWallet balance" }))
       }else{
        dispatch(setModalConfirmBuyPackage(true))
       }
      
    }

   // console.log(selectedPackage)

    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen">

           
          <Wallet/>
         

            {/* <div className="h-[300px] bg-sky-700 flex  fixed w-full max-w-md lg:max-w-full"> </div> */}
          

 <section className="bg-white dark:bg-gray-900 mt-10 lg:mt-0">
  <div className="py-8 px-4 mx-auto  lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-lg text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 w-full xl:w-2/3 mx-auto">
          
        {admin_packages && admin_packages.map((item,index) => {
            return (
                  <div className="flex flex-col bg-gradient-to-br from-blue-200 to-purple-200 text-white p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white" key={index}>
              <h3 className="mb-4 text-2xl font-semibold">{item.package_name}</h3>
              {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p> */}
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">${item.package_value}</span>
                 
              </div>
             
              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Daily Profit : {item.daily_profit} %</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Max Profit : {item.max_profit} %</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Duration : <span className="font-semibold">{item.duration} days</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Bonus Matching : <span className="font-semibold">{item.mathcing_level} </span>level</span>
                  </li>
                 
              </ul>
              <button onClick={()=>handleBuyPackage(item)} className="text-white bg-sky-800 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
               {isActive? 'ADD MORE PACKAGE' : 'BUY PACKAGE' }
                </button>
          </div> 
            )
        })}
       
          
         
      </div>
  </div>
</section>


         

         
            </div>
        </>
    )
}



