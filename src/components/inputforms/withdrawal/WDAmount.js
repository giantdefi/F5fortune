import React, { useEffect, useState, useRef } from "react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setWDWalletAmount,  } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
import { setPlaySound } from 'redux/reducers/SoundReducer';
//-------------------------------------------------------


export default function WDAmount() {

    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();
    const { wdWalletAmount, walletAddr } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { e_wallet } = useSelector((state) => state.AuthReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
     
        const { name, value } = e.target
        const re = /^[0-9]*\.?[0-9]*$/;
        if (re.test(value)) {
            if (value.length <= 6) {
                dispatch(setWDWalletAmount(value))
            }
            if (value > e_wallet) {
                dispatch(setPlaySound('error'))
                return dispatch(setError({ path: "wdWalletAmount", message: 'Exceed E Wallet balance!' }))
            }
        }
    }

    const handleMaxBalance = () => {
        dispatch(setError(false))
        dispatch(setPlaySound('pling'))
        dispatch(setWDWalletAmount(Math.floor(e_wallet)))
    }

    const handleMaxReset = () => {
        dispatch(setError(false))
        dispatch(setPlaySound('click'))
        dispatch(setWDWalletAmount(0))
    }

    
    return (
        <>



            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">

                    <div className="flex justify-between mb-2 text-white">
                        <p className="mb-2 text-sm text-white">WD EWallet Amount</p>
                        <div className="flex justify-between gap-2">
                            <button onClick={handleMaxBalance} className="_gradient_gold mb-2 text-sm border  px-4 rounded-sm "> MAX </button>
                            <button onClick={handleMaxReset} className="mb-2 text-sm border px-2 rounded-sm"> Reset </button>
                        </div>
                    </div>

                    <input type="text" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="wdWalletAmount"
                        value={wdWalletAmount || ''}
                        onChange={handleChange}

                    />
                    {formError && formError.path === 'wdWalletAmount' ?
                        <p className="text-yellow-300 ml-2 mt-2 text-sm">
                            {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
                            <i className="icofont-arrow-right animate-ping  mr-2"></i>
                            {formError.message}
                        </p> : null
                    }
                </div>
            </div>


        </>

    )
}



