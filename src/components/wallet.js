import React, { useEffect, useState, useRef } from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'

//--------------------------------------

export default function Wallet() {

    const itemRef1 = useRef()
    const itemRef2 = useRef()
    const dispatch = useDispatch()
   const { e_wallet, r_wallet } = useSelector((state) => state.AuthReducer)
   const { width, domain, currency } = useSelector((state) => state.GeneralReducer)
   const { app_currency } = useSelector((state) => state.ConstantReducer)
   
   useEffect(() => {
    if (itemRef1.current) {
           
        itemRef1.current.classList.add('flash')
        itemRef2.current.classList.add('flash')
   }
   
    setTimeout(() => {
        if (itemRef1.current) {
        itemRef1.current.classList.remove('flash')  
        itemRef2.current.classList.remove('flash')   
        }
    }, 2000)
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [e_wallet, r_wallet])




    return (
        <>
 <div className="flex justify-center  items-center h-12 fixed top-[90px] md:top-[55px] right-0 z-10 bg-gray-900  ">
 <div className=" z-10 w-[450px] centered flex flex-row  h-12 ">
        <div className="flex justify-end mr-5 mt-2 " > 
        <div className="flex centered animated text-white" ref={itemRef1}>  E Wallet : <img src="/assets/img/coin.png" className="ml-4" width="20" alt="dollar" /> <span className="text-lg font-semi-bold ml-1"> {parseFloat(e_wallet).toLocaleString()}</span></div>              
        <div className="flex centered animated text-white ml-6" ref={itemRef2}>  R Wallet : <img src="/assets/img/coin.png" className="ml-4" width="20" alt="dollar" /> <span className="text-lg font-semi-bold ml-1"> {parseFloat(r_wallet).toLocaleString()}</span></div>              
        </div>
        </div>
        </div>
        </>
    )
}



