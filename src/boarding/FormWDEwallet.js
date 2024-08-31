import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setWdXBUSDAmount } from 'redux/reducers/CryptoReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function FormWDEwallet() {

    const inputRef = useRef()

    const { userAccount, BnbBalance, isNetworkCorrect, shown_on_dscscan } = useSelector((state) => state.MetamaskReducer)
    const { BUSDEXPLORER, USER_BUSD_balance, ADDR_REGISTERED } = useSelector((state) => state.SmartContractReducer)

    // redux store
    const dispatch = useDispatch()
    const { wdXBUSDAmount } = useSelector((state) => state.CryptoReducer)
    const { xbusd_wallet } = useSelector((state) => state.FinanceReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { investmentPackage } = useSelector((state) => state.PersistReducer)
    // console.log(investmentPackage.wd_at_days)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        const re = /^[0-9]*$/
        if (re.test(value)) {
            if (value.length <= 4) { // just limit only with max
                dispatch(setWdXBUSDAmount(value))
            }
        }
    }

    useEffect(() => { // reset
        dispatch(setWdXBUSDAmount(false))
        dispatch(setError(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        // console.log(parseFloat(wdXBUSDAmount))
        // console.log(parseFloat(ewallet))

        if (parseFloat(wdXBUSDAmount) > parseFloat(xbusd_wallet)) {
            dispatch(setError({ path: "wdXBUSDAmount", message: 'WD value exceed XBUSD balance!' }))
        } else if (parseFloat(wdXBUSDAmount) > parseFloat(investmentPackage.max_wd)) {
            dispatch(setError({ path: "wdXBUSDAmount", message: 'WD value exceed allowed daily withdrawal!' }))
        } else {
            dispatch(setError(false))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wdXBUSDAmount])

    const handleMax = () => {
        if (!isNetworkCorrect && !BUSDEXPLORER) {
            return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) // to show header notice
        }
        dispatch(setError(false))
        dispatch(setWdXBUSDAmount(xbusd_wallet >= investmentPackage.max_wd ? investmentPackage.max_wd : xbusd_wallet))
        // then trigger use Effect
    }

    const handleReset = () => {
        dispatch(setError(false))
        dispatch(setWdXBUSDAmount(false))
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'wdXBUSDAmount') {
            //    inputRef.current.focus()
            //  inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])



    return (
        <>



            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">

                    <div className="flex justify-between mb-2">
                        <div className="flex flex-col ">

                            {investmentPackage && <p className="text-sm">Daily MAX Withdrawal : {parseInt(investmentPackage.max_wd)} XBUSD </p>}
                            {investmentPackage && <p className="text-sm">Daily MIN Withdrawal : {parseInt(investmentPackage.min_wd)} XBUSD </p>}
                            <p className="text-sm mt-2">Enter XBUSD amount to Withdraw  :</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <button onClick={handleMax}
                                className="mb-2 text-sm border border-gray-500 bg-blue-800 px-4 rounded-full"> Max </button>
                            <button onClick={handleReset}
                                className="mb-2 text-sm border border-gray-500 px-4 rounded-full"> Reset </button>
                        </div>
                    </div>

                    <input type="text" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="wdXBUSDAmount"
                        value={wdXBUSDAmount || ''}
                        onChange={handleChange}

                    />

                    {/* {exceedBUSDBalance && <p className="text-yellow-400">Gas value exceed BUSD balance!</p>} */}
                    {formError && formError.path === 'wdXBUSDAmount' ?
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



