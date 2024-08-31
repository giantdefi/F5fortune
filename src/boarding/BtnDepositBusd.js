import React, { useState } from "react"
import Router, { useRouter } from "next/router"
import Web3 from 'web3'
import axios from 'axios'

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'

import { setModalProcess, setModalMessage, setModalAllowance } from 'redux/reducers/ModalReducer'
import { setBNBBalance } from 'redux/reducers/MetamaskReducer'
import { setBtnSpinner } from 'redux/reducers/LoaderReducer'
import { set_USER_BUSD_balance } from 'redux/reducers/SmartContractReducer'

import { setError } from 'redux/reducers/ErrorReducer'
import { resetCrypto } from 'redux/reducers/CryptoReducer'
import { setReloadBalance } from 'redux/reducers/FinanceReducer' // for epins as well
//--------------------------------------

const contractAddress = "0x76f19D4CB0Ef48c4e66A149385396384d090056F"


export default function BtnDepositBusd() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [spinner, setSpinner] = useState(false)
    const { btnSpinner } = useSelector((state) => state.LoaderReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { depositBUSDAmount } = useSelector((state) => state.CryptoReducer)
    const { userAccount, BnbBalance, isNetworkCorrect, shown_on_dscscan } = useSelector((state) => state.MetamaskReducer)
    const { DEFIEXPLORER, BUSDEXPLORER, USER_BUSD_balance } = useSelector((state) => state.SmartContractReducer)
    const { username, isLogin, isBinary, token } = useSelector((state) => state.AuthReducer)
    const timeNow = parseInt(Date.now() / 1000)

    //---------------------------------
    const handleBuyGas = async () => {

       


        if (!USER_BUSD_balance) {
            return dispatch(setModalMessage({ type: 'warning', title: "Insufficient Balance!", message: 'You do not have MetaMask BUSD Balance' }))
        }

        if (!depositBUSDAmount) {
            dispatch(setError({ path: "depositBUSDAmount", message: 'Deposit BUSD value is missing!' }))
        }

    //    return storeDepositBUSDToDatabase('jhhjhjhjh879789')

        const web3 = new Web3(window.ethereum)
        const depositBUSDtoWei = web3.utils.toWei(depositBUSDAmount.toString())
        const busdBalanceWei = web3.utils.toWei(USER_BUSD_balance.toString())

        if (parseInt(depositBUSDtoWei) > parseInt(busdBalanceWei)) {
            return dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!", message: 'Insuffient MetaMask BUSD Balance' }))
        }

        if (!DEFIEXPLORER && !BUSDEXPLORER) return false
        if (!depositBUSDAmount) return false
        if (!username) return false
        //  if (!isBinary) return false

        try {

            dispatch(setBtnSpinner(true))
            //   dispatch(setModalProcess(true))


            let continu = false

            const gasfee = await BUSDEXPLORER.methods.approve(contractAddress, depositBUSDtoWei).estimateGas({ gas: 3000000, from: userAccount })

            await BUSDEXPLORER.methods.approve(contractAddress, depositBUSDtoWei).send({ gas: gasfee, from: userAccount }) // EXPLORER address consist BUSD
                .on('transactionHash', (hash) => {
                    dispatch(setModalAllowance(true))
                })
                .on('receipt', (receipt) => {
                    dispatch(setModalAllowance(false))
                    continu = true
                }).catch((error) => {
                    console.log(error)
                    continu = false
                    dispatch(setBtnSpinner(false))
                    dispatch(setModalProcess(false))
                    dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!", message: 'User reject allowance' }))
                })


            if (!continu) {
                dispatch(setModalProcess(false))
                return false
            }



            const gasUsed = await DEFIEXPLORER.methods.buygas(username, depositBUSDtoWei, timeNow).estimateGas({ gas: 3000000, from: userAccount })

            await DEFIEXPLORER.methods.buygas(username, depositBUSDtoWei, timeNow).send({ gas: gasUsed, from: userAccount })
                .on('transactionHash', (hash) => {
                    //  console.log(hash) // do not rely on this hash. must after receipt below
                    dispatch(setModalProcess(true))
                    dispatch(setBtnSpinner(false))
                })
                .on('receipt', (receipt) => {

                    //   console.log(receipt)

                    // console.log(receipt.transactionHash) // will be used for parameter for server save

                    dispatch(setModalProcess(false))
                    //  dispatch(setModalMessage({ type: 'success', message: 'Transaction is successfull' }))

                    //--- UPDATE METAMASK WALLET BALANCE
                    window.web3.eth.getBalance(userAccount)
                        .then((balance) => {
                            if (parseInt(balance) > 0) {
                                const accountBalance = window.web3.utils.fromWei(balance.toString())
                                dispatch(setBNBBalance(accountBalance))
                            } else {
                                dispatch(setBNBBalance(false))
                            }
                        })

                    BUSDEXPLORER.methods.balanceOf(userAccount).call()
                        .then(function (balance) {
                            if (balance) {
                                const web3 = new Web3(window.ethereum)
                                const NewBUSDbalance = web3.utils.fromWei(balance.toString())

                                //==== STORE TO DATABASE===============
                                const previousBUSDBalance = parseFloat(USER_BUSD_balance)// before transaction
                                const currentBUSDBalance = parseFloat(NewBUSDbalance) // after transaction

                                // console.log(previousBUSDBalance)
                                // console.log(currentBUSDBalance)

                                // check if BUSD balance has changed then process buy gas on server
                                //  if (previousBUSDBalance > currentBUSDBalance) {
                                storeDepositBUSDToDatabase(receipt.transactionHash) // call a function below to store on server
                                //  }

                                dispatch(set_USER_BUSD_balance(NewBUSDbalance))

                            } else {
                                dispatch(set_USER_BUSD_balance(false))
                            }
                        })



                }).catch((error) => { // metamask reject  
                    console.log(error)
                    dispatch(setModalProcess(false))
                    dispatch(setBtnSpinner(false))
                    dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!123", message: 'User reject transaction' }))
                })

        } catch (error) {
            console.log(error)
            dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!", message: error.message }))
            dispatch(setBtnSpinner(false))
            dispatch(setModalProcess(false))
        }
    }

    // console.log(userAccount)

    //==== STORE TO DATABASE===============
    const storeDepositBUSDToDatabase = async (hash) => {

        const data = {
            username: username,
            tx_hash: hash, // from parameter
            amount: depositBUSDAmount,
            time: timeNow,
            wallet_address: userAccount
        }

        // console.log(data)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/crypto/deposit-busd`,
            method: 'POST',
            data,
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                const data = response.data

                if (data.isSuccess) {
                    dispatch(resetCrypto())
                    dispatch(setModalMessage({ type: 'success', title: "Transaction Success!", message: data.message }))
                    dispatch(setReloadBalance(true)) // will be done in topNavigation
                } else {

                    return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }

            }).catch(function (error) {
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

    return (
        <>


            {btnSpinner ?
                <button className="_gradient_blue  text-xl  mx-auto py-1 mt-2 border-4 border-gray-500 rounded-full px-6  flex justify-center items-center">
                    <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    PROCESSING.....</button>
                :

                !formError && isLogin && depositBUSDAmount && isNetworkCorrect && BUSDEXPLORER && USER_BUSD_balance ?

                    <button onClick={handleBuyGas} className="_gradient_green  text-xl  mx-auto py-1 mt-2 border-4 border-gray-500 rounded-full px-6  flex justify-center items-center">
                        <i className="icofont-double-right mr-2" />  DEPOSIT BUSD</button>
                    :
                    <button className="_gradient_purple  text-xl  mx-auto py-1 mt-2 border-4 border-gray-400 rounded-full px-6  flex justify-center items-center">
                        <i className="icofont-ban mr-2" />  DEPOSIT BUSD</button>

            }


        </>
    )
}



