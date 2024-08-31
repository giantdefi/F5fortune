import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setDepositBUSDAmount } from 'redux/reducers/CryptoReducer'
import { setError } from 'redux/reducers/ErrorReducer'
//-------------------------------------------------------


export default function FormDepositBUSD() {

    const inputRef = useRef()

    const { userAccount, BnbBalance, isNetworkCorrect, shown_on_dscscan } = useSelector((state) => state.MetamaskReducer)
    const { BUSDEXPLORER, USER_BUSD_balance, ADDR_REGISTERED } = useSelector((state) => state.SmartContractReducer)

    // redux store
    const dispatch = useDispatch()
    const { depositBUSDAmount } = useSelector((state) => state.CryptoReducer)
    const { busd_wallet } = useSelector((state) => state.FinanceReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        const re = /^[0-9]*$/
        if (re.test(value)) {
            if (value.length <= 20) { // just limit only with max
                dispatch(setDepositBUSDAmount(value))
            }
        }
    }

    useEffect(() => { // reset
        dispatch(setDepositBUSDAmount(false))
        dispatch(setError(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        const busdBalance = parseFloat(USER_BUSD_balance).toFixed(4)

        if (parseFloat(depositBUSDAmount) > parseFloat(busdBalance)) {
            dispatch(setError({ path: "depositBUSDAmount", message: 'BUSD value exceed MetaMask BUSD balance!' }))
        } else {
            dispatch(setError(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depositBUSDAmount, USER_BUSD_balance])

    const handleMax = () => {
        if (!isNetworkCorrect && !BUSDEXPLORER) {
            return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }
        dispatch(setError(false))
        dispatch(setDepositBUSDAmount(USER_BUSD_balance ? parseFloat(USER_BUSD_balance).toFixed(4) : 0))
        // then trigger use Effect
    }

    const handleMaxReset = () => {
        dispatch(setError(false))
        dispatch(setDepositBUSDAmount(false))
    }

    // Focus input element on submit if no value
    useEffect(() => {
        if (formError && formError.path === 'depositBUSDAmount') {
            //    inputRef.current.focus()
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) // make it on center of the screen 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError])



    return (
        <>



            <div className="w-full  px-4 mt-5">
                <div className="relative w-full mb-3">

                    <div className="flex justify-between mb-2">
                        <p className="mb-1 text-sm">BUSD amount to deposit  :</p>
                        <div className="flex justify-between gap-2">
                            <button onClick={handleMax}
                                className="mb-2 text-sm border border-gray-500 bg-blue-800 px-4 rounded-full"> Max </button>
                            <button onClick={handleMaxReset}
                                className="mb-2 text-sm border border-gray-500 px-4 rounded-full"> Reset </button>
                        </div>
                    </div>

                    <input type="text" className=" bg-gray-800 w-full text-white border border-gray-500 rounded-md py-2 px-3" ref={inputRef}
                        name="depositBUSDAmount"
                        value={depositBUSDAmount || ''}
                        onChange={handleChange}

                    />

                    {/* {exceedBUSDBalance && <p className="text-yellow-400">Gas value exceed BUSD balance!</p>} */}
                    {formError && formError.path === 'depositBUSDAmount' ?
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



