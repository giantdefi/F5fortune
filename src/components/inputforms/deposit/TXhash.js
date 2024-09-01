import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Router, { useRouter } from "next/router";
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setTransactionHash } from 'redux/reducers/FormReducer';
import { setError } from 'redux/reducers/ErrorReducer';
//-------------------------------------------------------


export default function WalletAddress() {


    const inputRef = useRef()

    // redux store
    const dispatch = useDispatch();
    const { transactionHash } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { admin_wallet } = useSelector((state) => state.ConstantReducer)

    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
      //  dispatch(setShowCaptcha(false))
        const { name, value } = e.target
        if (value.length <= 100) {
            dispatch(setTransactionHash(value))
        }
    }


    //  console.log(destData)

    return (
        <>
            <div className="w-full px-4 mt-5">

                <div className="w-full  mt-5">

                    <p className="mb-2 text-white">Copy paste Transaction Hash :</p>

                    <div className="flex flex-col">

                        <div className="w-full">

                            <input type="text" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                                name="transactionHash"
                                value={transactionHash || ''}
                                onChange={handleChange}

                            />
                        </div>

                        {formError && formError.path === 'transactionHash' ?
                            <p className="text-yellow-300 ml-2 text-sm mt-1">
                                {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
                                <i className="icofont-arrow-right animate-ping  mr-2"></i>
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



