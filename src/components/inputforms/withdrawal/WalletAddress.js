import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Router, { useRouter } from "next/router";
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setWDCryptoAddress, setShowCaptcha } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
//-------------------------------------------------------


export default function WalletAddress() {


    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();
    const { wdCryptoAddress } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)

    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
        dispatch(setShowCaptcha(false))
        const { name, value } = e.target
        if (value.length <= 100) {
            dispatch(setWDCryptoAddress(value))
        }
    }

    // scroll to top and focus
    useEffect(() => {
        if (formError && formError.path === 'wdCryptoAddress') {
            //  inputRef.current.focus()
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen
            //  
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])


    //  console.log(destData)

    return (
        <>
            <div className="w-full px-4 mt-5">

                <div className="w-full  mt-5">

                    <p className="mb-2 "> Your USDT Wallet address :</p>

                    <div className="flex flex-col">

                        <div className="w-full">

                            <input type="text" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                                name="wdCryptoAddress"
                                value={wdCryptoAddress || ''}
                                onChange={handleChange}

                            />
                        </div>

                        {formError && formError.path === 'wdCryptoAddress' ?
                            <p className="text-yellow-300 ml-2 text-sm mt-1">
                                <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                                {formError.message}
                            </p>
                            : null
                        }

                    </div>

                </div>
            </div>

        </>

    )
}



