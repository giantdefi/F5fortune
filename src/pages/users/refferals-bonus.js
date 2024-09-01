import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Router, { useRouter } from "next/router";

import Head from 'next/head'
import axios from 'axios';
const moment = require('moment')
import Wallet from "components/wallet"
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setMyRefBonusArray, setTotalRefBonus } from 'redux/reducers/ReferralReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
import { setModalMessage } from 'redux/reducers/ModalReducer';
//--------------------------------------

export default function Matching() {
   
    const router = useRouter()
    const [reload, setReload] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [startNo, setStartNo] = useState(1)
    const [start, setStart] = useState(0)
   const [limit, setLimit] = useState(100) // change also default in function
  
    const dispatch = useDispatch();
    const { isLogin, userid, token } = useSelector((state) => state.AuthReducer)
    const { myRefBonusArray, totalRefBonus } = useSelector((state) => state.ReferralReducer)
    const { splittoEWallet, splittoRwallet } = useSelector((state) => state.ConstantReducer)
  

    useEffect(() => {
        if(isLogin){
           loadData()
        }else{
          router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

//========================================================   
async function loadData(user = false) {

    setSpinner(true)
    setReload(true)


    let getuser = userid
    if (user) {
        getuser = user
    }

    const URL = process.env.NEXT_PUBLIC_API_URL_V1
    return axios({
        url: `${URL}/users/bonus-sponsor?userid=${getuser}`,
        method: 'GET',
        'headers': {
            'Authorization': token,
            accept: 'application/json',
            'content-type': 'application/json',
        }
    })
        .then(async response => {

         //   console.log(response.data)

            if (response.data.isSuccess) {

                const data = response.data.data
                console.log(data)
            
                dispatch(setTotalRefBonus(response.data.total))
             dispatch(setMyRefBonusArray(data))
               
            }
            setSpinner(false)
            setReload(false)

        }).catch(function (error) {
            //  setSpinnerBtn(false)
            console.log(error)
            setSpinner(false)
            setReload(false)
            return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
        });
}
return (
    <>

        <Head>
            <title>FIVE FORTUNE</title>
            <meta name="description" content="Withdrawal" />
        </Head>

        <div className="min-h-screen pb-40 px-2 animated fadeIn text-white pt-20 md:pt-40">

        <div className="flex justify-center  max-w-md items-center h-12 fixed top-[90px] md:top-[55px] right-10 md:right-0 z-10 bg-gray-900 mr-4 ">
            <div className=" z-10 w-[450px] centered flex flex-row  h-12 ">
          <Wallet/>
            </div>                 
            </div>

            <div className="flex flex-row justify-between items-center ">
                <h4 className="font-semibold mx-auto  uppercase text-4xl ">REFFERALS BONUS</h4>
            </div>

            <div className="text-center py-1 mt-5">
                <p className="text-lg">Total Bonus : { totalRefBonus? (parseFloat(totalRefBonus).toFixed(2)) : 0 } USDT</p>
             {totalRefBonus && <>
                <p  className="text-sm">This Bonus has been deposited to your :</p>
                <p  className="text-sm">EWallet {splittoEWallet}% and RWallet {splittoRwallet}%</p>
                </>
             }
            </div>

            <div className="container px-1 py-1 mx-auto">
             <div className="flex flex-col">
           
    <table className="w-full text-sm text-left text-gray-500 mt-2">
        <thead className="text-sm text-white uppercase bg-blue-900 border-b border-gray-600">

        <tr>
                                <th className="py-3 text-center"> From User</th>
                                <th className="py-3 text-center"> Package</th>
                                <th className="py-3 text-center">  Bonus USDT</th>
                                <th className="py-3 text-center"> Time</th>
                            </tr>
        </thead>
        <tbody >

            {!spinner && myRefBonusArray && myRefBonusArray.map((item, index) => {
                return (
                    <tr className="bg-gray-800 text-white h-12 border-b border-gray-600" key={index}>
                        <td className="text-center text-sm">
                            {item.from_user}
                            {/* {index === 0 && <span className="ml-2">*</span>} */}
                        </td>
                    
                        <td className="text-center text-xs">
                        {item.package}
                        </td>
                        <td className="text-center text-xs">
                        {parseFloat(item.bonus).toFixed(2)}
                        </td>
                        <td className="text-center text-xs">
                        <small>{moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</small>
                        </td>
                       
                   
                    </tr>
                )
            })}



        </tbody>
    </table>

 

     {!spinner && !myRefBonusArray.length && 
        <div className="text-center">
            <p className="pt-10 text-white">Opss, no referral data found!</p>
        </div>
    }
        <div className="text-start mx-auto ">
            <p className="pt-10 text-sm text-center text-white">Users will get sponsor bonus when their downlines buy a package or add more package. </p>
            <p className="text-sm mx-auto text-white text-center"> Users can have multyple packages in a single account.</p>
        </div>
    {spinner &&
        <div className="text-center mt-5">
            <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>
    }

   
        </div>
        </div>  </div>
    </>
)
}



