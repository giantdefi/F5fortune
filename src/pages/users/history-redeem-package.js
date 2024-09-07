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
        setSpinner(true)
        const URL = process.env.NEXT_PUBLIC_API_URL_V1
   return axios({
       url: `${URL}/users/history-redeem-package?userid=${userid}`,
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
          setSpinner(false)
      
        }).catch(function (error) {
          setSpinner(false)
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

          <Wallet/>
          

            {/* <div className="h-[300px] bg-sky-700 flex  fixed w-full max-w-md lg:max-w-full"> </div> */}
          

 <section className=" dark:bg-gray-900 mt-20 lg:mt-20">
  <div className="py-8 px-4 mx-auto  lg:py-16 lg:px-6 text-white">
      <div className="mx-auto max-w-screen-lg text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight bold text-gray-100 ">History Redeem Package</h2>
        
      </div>
      <div className="mx-auto max-w-7xl  px-4">
  

 <p>Latest 50 transactions</p>
<table className="w-full text-sm text-left text-gray-500 mt-2">
            <thead className="text-sm text-white uppercase bg-blue-900 border-b border-gray-600">

            <tr>
                                    <th className="py-3 text-center"> Package</th>
                                    <th className="py-3 text-center"> Amount</th>
                                    <th className="py-3 text-center"> Running days</th>
                                   
                                    <th className="py-3 text-center"> Time</th>
                                </tr>
            </thead>
            <tbody >

                {!spinner && WDCashArray && WDCashArray.map((item, index) => {
                    return (
                        <tr className="bg-gray-800 text-white h-12 border-b border-gray-600" key={index}>
                            <td className="text-center text-xs">
                            {item.package_name}
                            </td>
                            <td className="text-center text-sm">
                                {item.wd_amount}
                                {/* {index === 0 && <span className="ml-2">*</span>} */}
                            </td>
                            <td className="text-center text-sm">
                                {item.running_days}
                                {/* {index === 0 && <span className="ml-2">*</span>} */}
                            </td>
                        
                            <td className="text-center text-xs">
                            <p>{moment.unix(item.time).format("YYYY/MM/DD  hh:mm:ss ")}</p>
                            <p className="text-yellow-500">{moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</p>
                            </td>
                          
                           
                           
                       
                        </tr>
                    )
                })}
                        {!WDCashArray && !spinner &&
                        <tr className="bg-gray-800 text-white text-center h-12 border-b border-gray-600">
                            <td colSpan={4} className="text-sm">No transactions  found!</td>
                        </tr>}

            </tbody>
        </table>
    
                                {spinner && 
                                    <div className="text-center mt-5">
                                        <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div> }


</div>
  </div>
</section>


         

         
            </div>
        </>
    )
}



