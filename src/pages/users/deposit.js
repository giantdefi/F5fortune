import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

import dynamic from 'next/dynamic'
import Wallet from "components/wallet"
import DepoAmount from "components/inputforms/deposit/DepoAmount"
import AdmWalletAddress from "components/inputforms/deposit/AdmWalletAddress"
import TXhash from "components/inputforms/deposit/TXhash"
//---- REDUX STORE ---------------------
import { setPlaySound } from 'redux/reducers/SoundReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setModalToast, setModalMessage,setModalConfirmBuyPackage  } from 'redux/reducers/ModalReducer';
import { setError } from 'redux/reducers/ErrorReducer';
import { setEWallet } from 'redux/reducers/AuthReducer'
//--------------------------------------

export default function Users() {
    const router = useRouter()
    const dispatch = useDispatch() 
    const [spinner, setSpinner] = useState(false)
    const {  title, desc } = useSelector((state) => state.GeneralReducer)
    const { admin_packages, selectedPackage } = useSelector((state) => state.PackageReducer)
 
    const { isLogin, e_wallet, r_wallet,userid, token } = useSelector((state) => state.AuthReducer)

    const { depositAmount, transactionHash } = useSelector((state) => state.FormReducer)
    const { admin_wallet } = useSelector((state) => state.ConstantReducer)

    useEffect(() => {

        if(!isLogin){
            router.push('/')
        }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   const handleDepoRequest = () => {
  
    setSpinner(true)
         const data = {
        depositAmount,transactionHash, admin_wallet, userid 
        }
  
   
       if(!depositAmount){
        setSpinner(false)
        dispatch(setPlaySound('error'))
        return dispatch(setError({ path: "depositAmount", message: 'Depo amount is required' }))
       }
       if(!transactionHash){
        setSpinner(false)
        dispatch(setPlaySound('error'))
        return dispatch(setError({ path: "transactionHash", message: 'Transaction Hash is required' }))
       }
   

     //   console.log(data)


        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/deposit`,
            method: 'POST',
            data,
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {
               
                setSpinner(false)
                const data = response.data

                if (data.isSuccess) {
                    dispatch(setPlaySound('success'))
                      return   dispatch(setModalToast({ type: response.data.type, title: response.data.title, message: response.data.message }))
                }

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

            <div className="min-h-screen pb-40 px-2 animated fadeIn  pt-20 md:pt-40 text-white">

          

            <div className="flex justify-center  w-md items-center h-12 fixed top-[90px] md:top-[55px] md:right-0 z-10 bg-gray-900  ">
            <div className=" z-10 w-[450px] centered flex flex-row  h-12 ">
          <Wallet/>
            </div>                 
            </div>

            <div className="flex flex-col justify-between items-center ">
            <h4 className="font-semibold  uppercase text-4xl mx-auto ">DEPOSIT REQUEST</h4>
            <p>Deposit Confirmation</p>
          </div>

         
          

            <div className="md:w-1/2 mx-auto border mt-10 py-5 border-gray-700 bg-gray-900 rounded-xl mt-10">



<AdmWalletAddress />
<DepoAmount />
<TXhash/>



<div className="flex justify-center mt-10">
    {spinner ?
        <button
            className="_btn_submit_green w-[90%] mb-5 text-xl mx-auto py-2 mt-5 border-4 border-gray-200  flex justify-center items-center">
            <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>  PROCESSING....</button>
        :

        <button onClick={handleDepoRequest}
            className="_btn_submit_green w-[90%] mb-5 text-xl mx-auto py-2 mt-5 border-4 border-gray-200  flex justify-center items-center">
            <i className="icofont-rounded-double-right  mr-2 text-2xl"></i>
           SEND REQUEST
        </button>


    }
</div>

</div>


         

         
            </div>
        </>
    )
}



