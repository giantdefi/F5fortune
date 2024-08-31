import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import axios from 'axios'
const moment = require('moment')
import Router, { useRouter } from "next/router"
import Head from 'next/head'

import dynamic from 'next/dynamic'
import Wallet from "components/wallet"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalToast, setModalMessage,setModalConfirmBuyPackage  } from 'redux/reducers/ModalReducer';
import { setTotalEquity, setRunningDays, setRunningProfit, setEffectiveDays, setAvailabletoWDDays, setAvailabletoWDValue 

} from 'redux/reducers/StatementReducer';
import { setMypackages, setDetailPackage, setSelectedActPackID, setSelectedPackName,setSelectedPackValue, setWDAmounts } from 'redux/reducers/PackageReducer'
//--------------------------------------

export default function Users() {
    const router = useRouter()
    const dispatch = useDispatch() 
   
    const {  title, desc } = useSelector((state) => state.GeneralReducer)
    const { myPacakges, detailPackage } = useSelector((state) => state.PackageReducer)
    const { totalEquity, runningDays, runningProfit, effectiveDays, 
        availabletoWDDays, availabletoWDValue } = useSelector((state) => state.StatementReducer)

    const [tableContent, setTableContent] = useState([])
    const [spinner, setSpinner] = useState(false)

    const time = 86400

    console.log(detailPackage)

    useEffect(() => { 

        if (detailPackage) {

            const days = (parseInt(Math.round(Date.now()) / 1000) - parseInt(detailPackage.time_start)) // 1000 is second id JS date not used!


            console.log(days)


            if (days < time) {
                dispatch(setRunningDays(0))
            } else {
                const runningDays = Math.floor(days / time)

                if(parseInt(runningDays) > 90) {
                    dispatch(setRunningDays(90))
                }else{
                    dispatch(setRunningDays(runningDays)) 
                }
            }

       console.log('runningDays')
       console.log(runningDays)

            let newArray = []
            const data = {
                day: 1,
                equity: 0,
                roi: 0
            }

            const factor = 2

            let roi = parseFloat(detailPackage.roi)
            let runningProfit = 0
            let total = 0
            let equity = parseFloat(detailPackage.value)
          

            for (let i = 0; i < 90; i++) {
           
                    let data1 = {
                        day: data.day++,
                        equity: equity,
                        roi: roi,
                       
                    }
                    newArray.push(data1)

                    total = total + data1.roi

                   // console.log(total)

                    if (i < (runningDays) ) {  // profit on current running days
                       runningProfit = (parseInt(runningDays-detailPackage.wd_days) * roi )
                       console.log('---------------runningProfit')
                       console.log(runningProfit)
                       dispatch(setRunningProfit(runningProfit))
                      
                     }

            }
          
          
            if(detailPackage.wd_days >= 90) {
                  dispatch(setAvailabletoWDDays(0)) // completed
            }else{
                dispatch(setAvailabletoWDDays(runningDays-detailPackage.wd_days))
            }

            dispatch(setRunningProfit(runningProfit)) 
            dispatch(setAvailabletoWDValue(runningProfit)) 
            console.log('---------------total')
            console.log(total)
           dispatch(setTotalEquity(total)) // final total equity ( TOTAL PROFIT + MODAL)
            setTableContent(newArray)

        } else {
            router.push('/users/my-packages')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailPackage.pid, detailPackage.wd_days, runningProfit ]) // without runningProfit useEffect not rendered!!


    const handleWithdrawal = (actPid, pname, value, runningProfit, runningDays, effectiveDays) => {
        setSpinner(true)
       //  dispatch(setPlaySound('click'))
         // console.log(actPid)
         // console.log(runningProfit)
         // console.log(runningDays)
         // console.log(effectiveDays)
 
         dispatch(setSelectedActPackID(actPid))
         dispatch(setWDAmounts(runningProfit))
         dispatch(setSelectedPackName(pname))
         dispatch(setSelectedPackValue(value))
         dispatch(setEffectiveDays(effectiveDays)) 
       
         dispatch(setRunningDays(runningDays))
         setTimeout(() => {
             router.push('/users/wd-package')
         }, 500)
 
     }

    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen">

            <div className="flex justify-center  w-md items-center h-12 fixed top-[90px] md:top-[55px] md:right-0 z-10 bg-gray-900  ">
            <div className=" z-10 w-[450px] centered flex flex-row  h-12 ">
          <Wallet/>
            </div>                 
            </div>

            {/* <div className="h-[300px] bg-sky-700 flex  fixed w-full max-w-md lg:max-w-full"> </div> */}
          

            {detailPackage &&

<div className="w-full md:w-10/12 mx-auto py-2 mt-20">


    <div className="flex justify-center _gradient_slate py-2 ">
        <h4 className="font-semibold  uppercase  text-white">Statement Package </h4>
    </div>


    <div className="bg-slate-900 pb-2 text-white">
        <div className="space-y-2">
            <div className="flex justify-between items-center px-5 py-1 border-b border-slate-800">
                <p>Package  </p><p>  {detailPackage.name}-{detailPackage.value} </p>
              
            </div>
            <div className="flex justify-between items-center px-5 py-1 border-b border-slate-800">
                <p>PID  </p><p> # {detailPackage.id} </p>
            </div>
            <div className="flex justify-between items-center px-5 py-1 border-b border-slate-800">
                <p>Package Value  </p><p> {detailPackage.value} USDT  </p>
            </div>
            <div className="flex justify-between items-center px-5 py-1 border-b border-slate-800">
                <p>Status</p><p>  {detailPackage.completed ? <span>Completed</span> : <span>In progress</span>}  </p>
            </div>
            {/* <div className="flex justify-between items-center px-5 py-1">
                <p>Withdrawal allowed after </p><p>7 days </p>
            </div> */}
        </div>
    </div>

    <div className="flex justify-center _gradient_slate py-2  text-white">
    <h4 className="font-semibold  uppercase">Package Status</h4>
   </div>
    {detailPackage.completed ?
     <div className="flex justify-center _gradient_red py-2 ">
    <h4 className="font-semibold  uppercase  animate-pulse">Package  COMPLETED</h4>
    </div> : "" // prevent show zero (0) completed false
    }
   

    <div className="bg-slate-900  text-white">
        <div className="space-y-2 text-sm mb-6">
            <div className="flex justify-between items-center px-5 py-2  border-b border-slate-800">
                <p>Package Start </p><p> {moment.unix(detailPackage.time_start).format("YYYY/MM/DD  hh:mm:ss ")} </p>
            </div>
            <div className="flex justify-between items-center px-5  border-b border-slate-800">
                <p>Contract Days </p><p> 90 days </p>
            </div>
            <div className="space-y-2 flex justify-between items-center px-5   border-b border-slate-800">
                <p>Total Last Withdrawal</p><p> {detailPackage.total_wd} USDT  </p>
            </div>
            <div className="flex justify-between items-center px-5   border-b border-slate-800">
                <p>Total Withdrawal days </p><p> {detailPackage.wd_days} days  </p>
            </div>
        </div>
        <div className="space-y-2 text-sm ">
          
            <div className="flex justify-between items-center px-5  border-b border-slate-800">
                <p>Available to Withdraw days  </p><p> {availabletoWDDays || 0} days </p>
            </div>
            <div className="flex justify-between items-center px-5 py-2 border-b border-slate-800">
                <p>Available to Withdraw value</p><p>{parseFloat(availabletoWDValue).toFixed(2)} USDT  </p>
            </div>
        </div>
    </div>

    <section>

        {parseFloat(totalEquity) > 0 &&
            <div className="text-center bg-gray-900  py-4">
                {runningDays > detailPackage.wd_days ?
                    <button onClick={() => handleWithdrawal(detailPackage.id, detailPackage.name,detailPackage.value, runningProfit, runningDays, detailPackage.days_left)}
                        className="border-2 px-3 py-1 rounded-lg bg-green-800  text-white">
                      {spinner ?
                        <svg role="status" className="mr-4 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg> : <i className="icofont-check-circled mr-2"></i> }
        WITHDRAW TO WALLET</button>
                    :
                    <button className="border-2 px-3 py-1 rounded-sm bg-red-900 text-white">
                        <i className="icofont-ban mr-2"></i>
                        
                        WITHDRAW TO WALLET</button>
                }
            </div>}

        <div className="flex justify-center _gradient_slate py-2 ">
            <h4 className="font-semibold  text-white uppercase">PACKAGE  PROGRESS</h4>
        </div>

        <div className="container  mx-auto ">
            <div className="flex flex-col">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-sm text-white  bg-gray-800 border-b border-gray-600">
                        <tr>
                            <th className="px-4 py-3 text-center"> Running Days </th>
                            <th className="px-4 py-3 text-center"> Deposit USDT</th>
                            <th className="px-4 py-3 text-center"> ROI USDT</th>
                            <th className="px-2 py-3 text-center"> Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {tableContent.map((item, index) => {
                            return (

                            
                                runningDays >= item.day ?
                               
                                detailPackage.wd_days >= item.day?

                                <tr className="bg-red-900/50 text-white h-8 border-b border-gray-600 h-[50px]" key={index}>
                                <td className="text-center">Day {item.day} </td>
                                <td className="text-center"> {item.equity.toFixed(2)}</td>
                                <td className="text-center"> {item.roi.toFixed(2)}</td>
                                <td className="text-center text-sm"> Paid</td>
                               </tr> :
                                   <tr className="bg-green-900 text-white h-8 border-b border-gray-600 h-[50px]" key={index}>
                                        <td className="text-center">Day {item.day} </td>
                                        <td className="text-center"> {item.equity.toFixed(2)}</td>
                                        <td className="text-center"> {item.roi.toFixed(2)}</td>
                                        <td className="text-center"> <i className="icofont-check-circled"></i></td>
                                    </tr> :

                                    <tr className="bg-gray-900 text-white h-8 border-b border-gray-600 h-[50px]" key={index}>
                                        <td className="text-center">Day {item.day} </td>
                                        <td className="text-center"> {item.equity.toFixed(2)}</td>
                                        <td className="text-center">{item.roi.toFixed(2)} </td>
                                        <td className="text-center"> -</td>
                                    </tr>
                            )
                        })}

                        {parseFloat(totalEquity) > 0 && <>
                            <tr className="bg-gray-900 text-white h-12 border-b border-gray-700" >
                                <td colSpan={2} className="text-left pl-3">TOTAL PROFIT </td>
                                <td className="text-center text-lg font-bold text-yellow-500">USD {parseFloat(totalEquity).toFixed(2)}</td>
                            </tr>
                           </>
                        }

                        {parseFloat(totalEquity) <= 0 &&
                            <tr className="bg-gray-900 text-white h-12 border-b border-gray-700" >
                                <td colSpan={3} className="pl-3 text-center text-red-400">PACKAGE IS COMPLETED </td>
                            </tr>
                        }

                    </tbody>
                </table>

                {/* <div className="flex flex-row justify-between">
                    <div onClick={handleBackClick} className="cursor-pointer icofont-long-arrow-left text-4xl ml-5 mt-10 "></div>
                    <div onClick={handleScrollTop} className="mr-5 cursor-pointer icofont-long-arrow-up text-4xl ml-5 mt-10 border rounded-full"></div>
                </div> */}

            </div>
        </div>
    </section>

</div>
}
         

         
            </div>
        </>
    )
}



