import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Router, { useRouter } from "next/router";
import axios from 'axios';
import Wallet from "components/wallet"
import Head from 'next/head'
import BtnWDWallet from "redux/actions/BtnWDWallet";
//--- redux store---------------------------------------
import { setPlaySound } from 'redux/reducers/SoundReducer'
import { useSelector, useDispatch } from 'react-redux';
import { setWDAmounts, setWDType, setMyPackageDetail, setSelectedActPackID } from 'redux/reducers/PackageReducer';

//--------------------------------------

export default function Withdrawal() {

    const [agree, setAgree] = useState(false)
    const [spinner, setSpinner] = useState(false)
  
    const router = useRouter()
    const dispatch = useDispatch();
    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { runningDays, effectiveDays } = useSelector((state) => state.StatementReducer)
    const { selectedActPackID, selectedPackName, selectedPackValue, wdAmmounts } = useSelector((state) => state.PackageReducer)
    const {  splittoEWallet,splittoRwallet } = useSelector((state) => state.ConstantReducer)

    useEffect(() => {
        if(!selectedActPackID){
            router.push('/users/my-packages')
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedActPackID])

    const handleCancelWD = () => {
        dispatch(setPlaySound('click'))
        setTimeout(() => { // without total reset
            dispatch(setWDAmounts(false))
           // dispatch(setWDType(false))
            // dispatch(setMyPackageDetail(false))
            // dispatch(setSelectedActPackID(false))
            router.push('/users/my-packages')
        }, 500)
    }

    const handleBackClick = () => {
        dispatch(setPlaySound('click'))
        setTimeout(() => {
            if (selectedActPackID) {
                router.push('/users/my-package')
            } else {
                router.push('/users')
            }
        }, 500)
    }

    const handleAgree = () => {
        setAgree(true)
        dispatch(setPlaySound('pling'))
    }

    return (
        <>

            <Head>
                <title>FIVE FORTUNE</title>
                <meta name="description" content="Withdrawal" />
            </Head>

            <div className="min-h-screen pb-40 px-2 animated zoomIn pt-40">

            <div className="flex justify-center  w-md items-center h-12 fixed top-[90px] md:top-[55px] md:right-0 z-10 bg-gray-900  ">
            <div className=" z-10 w-[450px] centered flex flex-row  h-12 ">
          <Wallet/>
            </div>                 
            </div>

                <div className="flex flex-row centered items-center ">
                    <h4 className="font-semibold  text-white uppercase text-[24px] ">WD MY PACKAGE ROI</h4>
                </div>


                {selectedActPackID  &&
                    <div className="text-center mt-10">

                        <div className="text-center text-white">
                            <h4 >{selectedPackName}-{selectedPackValue}</h4>
                            <h4 >Package Id : # {selectedActPackID}</h4>
                            <p className="mt-2">WD Amount : {parseFloat(wdAmmounts).toFixed(2)} USDT</p>
                            <p > WD at Runnning :  Day-{runningDays}</p>
                        </div>

                        <div className="text-center text-white lg:w-1/2 mx-auto border px-12 py-5 mt-5 pb-10 rounded-xl bg-slate-800">
                            <h4 className="animate-pulse font-bold text-orange-300 uppercase mb-5">Important!!</h4>
                            <p className="mb-2">Your WD amount will be converted to :</p>
                            <p>{splittoEWallet}% EWallet :  {parseFloat(wdAmmounts* splittoEWallet/100).toFixed(2)} USDT</p>
                            <p>{splittoRwallet}% RWallet :  {parseFloat(wdAmmounts*splittoRwallet/100).toFixed(2)} USDT</p>
                            {effectiveDays - runningDays <= 0 ?
                                <p className="mt-2">Your package will be : <br />  COMPLETED! <br />Thank you for your participation</p>
                                :
                                <p className="mt-2">Available for next withdrawal <br />  {effectiveDays - runningDays} days</p>
                            }
                            <button onClick={handleAgree}
                                className="border-2 border-gray-300 mt-5 px-6 py-1 rounded-full  bg-green-800"> YES, I AGREE</button>
                        </div>

                        {agree && <div className="mt-10 space-y-6">
                            <BtnWDWallet />
                            {/* <BtnWDRequest /> */}
                        </div>}


                        <button onClick={handleCancelWD} className="border-2 text-white mt-10 px-3 py-1 rounded-full text-sm bg-red-800"> CANCEL WITHDRAWAL</button>

                    </div>
                  
                }

       
            </div>

        </>
    )
}



