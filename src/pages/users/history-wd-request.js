import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from "next/router"
import Head from 'next/head'
const moment = require('moment')
import dynamic from 'next/dynamic'
import Wallet from "components/wallet"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalToast, setModalMessage,setModalConfirmBuyPackage  } from 'redux/reducers/ModalReducer';
import { resetStatement } from 'redux/reducers/StatementReducer';
import { setMypackages, setDetailPackage } from 'redux/reducers/PackageReducer'
import { resetHistory, setWDCashArray, setWDCashTx, setWDCashTotal, setTotalWDPaid } from 'redux/reducers/HistoryReducer'
//--------------------------------------

export default function Users() {
    const router = useRouter()
    const dispatch = useDispatch() 
    const [spinner, setSpinner] = useState(false)
    const {  title, desc } = useSelector((state) => state.GeneralReducer)
    const { app_currency} = useSelector((state) => state.ConstantReducer)
    const { myPacakges, detailPackage } = useSelector((state) => state.PackageReducer)
 
    const { userid, token } = useSelector((state) => state.AuthReducer)
    const { WDCashArray, WDCashTx, WDCashTotal,totalWDPaid } = useSelector((state) => state.HistoryReducer)
  

    useEffect(() => {
      dispatch(setDetailPackage(false))
      dispatch(resetStatement())
        getMyPackage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getMyPackage = async () => {

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
   return axios({
       url: `${URL}/users/history-wd-cash?userid=${userid}`,
       method: 'GET',
     
       'headers': {
           'Authorization': token,
           accept: 'application/json',
           'content-type': 'application/json',
       }
   })
       .then(async response => {

           const data = response.data
           console.log(data)
          dispatch(setWDCashArray(data.dataLimit))
          dispatch(setWDCashTx(data.totalAllTxs))
          dispatch(setWDCashTotal(data.totalWD)) 
          dispatch(setTotalWDPaid(data.totalPaid)) 

       }).catch(function (error) {
         
           console.log(error)
           return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
       })
} 

   const handleDetailPackage = (data) => {
    dispatch(setDetailPackage(data))
    router.push('/users/detail-packages')
   }


    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen">

           
          <Wallet/>
          

            {/* <div className="h-[300px] bg-sky-700 flex  fixed w-full max-w-md lg:max-w-full"> </div> */}
          

 <section className=" dark:bg-gray-900 mt-20 lg:mt-20">
  <div className="py-8 px-4 mx-auto  lg:py-16 lg:px-6 text-white">
      <div className="mx-auto max-w-screen-lg text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight bold text-gray-100 ">History WD Request</h2>
          <p>Total Request : {app_currency} {WDCashTotal > 0? parseFloat(WDCashTotal).toLocaleString(2) : '0'}</p>
          <p>Total WD Paid : {app_currency} {totalWDPaid > 0? parseFloat(totalWDPaid).toLocaleString(2) : '0'}</p>
          <p></p>
      </div>
      <div className="mx-auto max-w-7xl  px-4">
  

      <p>Latest 50 transactions</p>
<table className="w-full text-sm text-left text-gray-500 mt-2">
            <thead className="text-sm text-white uppercase bg-blue-900 border-b border-gray-600">

            <tr>
                                    <th className="py-3 text-center"> no</th>
                                    <th className="py-3 text-center"> Amount</th>
                                    <th className="py-3 text-center"> Time</th>
                                    <th className="py-3 text-center"> Status</th>
                                    <th className="py-3 text-center"> Paid Time</th>
                                </tr>
            </thead>
            <tbody >

                {!spinner && WDCashArray && WDCashArray.map((item, index) => {
                    return (
                        <tr className="bg-gray-800 text-white h-12 border-b border-gray-600" key={index}>
                            <td className="text-center text-xs">
                            {index+1}
                            </td>
                            <td className="text-center text-sm">
                                {item.amount}
                                {/* {index === 0 && <span className="ml-2">*</span>} */}
                            </td>
                        
                            <td className="text-center text-xs">
                            <p>{moment.unix(item.time).format("YYYY/MM/DD  hh:mm:ss ")}</p>
                            <p className="text-yellow-500">{moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</p>
                            </td>
                            <td className="text-center text-xs">
                           {item.paid_status? 'PAID' : 'Pending'}
                            </td>
                            <td className="text-center text-xs">
                            {item.paid_status?<>
                             <p>{moment.unix(item.time).format("YYYY/MM/DD  hh:mm:ss ")}</p>
                            <p className="text-yellow-500">{moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</p>
                            </>
                            :
                            <p>--</p> }
                            </td>
                           
                       
                        </tr>
                    )
                })}



            </tbody>
        </table>
    
  


</div>
  </div>
</section>


         

         
            </div>
        </>
    )
}



