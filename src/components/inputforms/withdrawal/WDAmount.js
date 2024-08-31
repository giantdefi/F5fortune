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
    const { wdWalletAmount } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { balance } = useSelector((state) => state.AuthReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
     
        const { name, value } = e.target
        const re = /^[0-9]*\.?[0-9]*$/;
        if (re.test(value)) {
            if (value.length <= 6) {
                dispatch(setWDWalletAmount(value))
            }
            if (value > balance) {
                dispatch(setPlaySound('error'))
                return dispatch(setError({ path: "sendAmount", message: 'Exceed balance!' }))
            }
        }
    }

    const handleMaxBalance = () => {
        dispatch(setError(false))
        dispatch(setPlaySound('pling'))
        dispatch(setWDWalletAmount(Math.floor(balance)))
    }

    const handleMaxReset = () => {
        dispatch(setError(false))
        dispatch(setPlaySound('click'))
        dispatch(setWDWalletAmount(0))
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'wdWalletAmount') {
            //    inputRef.current.focus()
            // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])



    return (
        <>



            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">

                    <div className="flex justify-between mb-2">
                        <p className="mb-2 text-sm">WD EWallet Amount</p>
                        <div className="flex justify-between gap-2">
                            <button onClick={handleMaxBalance} className="_gradient_green mb-2 text-sm border  px-4 rounded-sm"> MAX </button>
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
                            <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" />
                            {formError.message}
                        </p> : null
                    }
                </div>
            </div>


        </>

    )
}



