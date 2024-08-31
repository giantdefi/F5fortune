import React, { useState } from "react"
import Router, { useRouter } from "next/router"
import Web3 from 'web3'
import axios from 'axios'

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'

import { setModalProcess, setModalMessage, setModalAllowance, setModalAdminPaymentWD } from 'redux/reducers/ModalReducer'
import { setBNBBalance } from 'redux/reducers/MetamaskReducer'
import { set_USER_BUSD_balance } from 'redux/reducers/SmartContractReducer'
import { setBtnSpinner } from 'redux/reducers/LoaderReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setWdWalletHistory } from 'redux/reducers/AdminReducer'
//--------------------------------------

const contractAddress = "0x76f19D4CB0Ef48c4e66A149385396384d090056F"


export default function AdminBTNPaymentWithdrawal() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [spinner, setSpinner] = useState(false)
    const { btnSpinner } = useSelector((state) => state.LoaderReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { userAccount, BnbBalance } = useSelector((state) => state.MetamaskReducer)
    const { DEFIEXPLORER, BUSDEXPLORER, USER_BUSD_balance } = useSelector((state) => state.SmartContractReducer)
    const { username, isLogin, isBinary, token } = useSelector((state) => state.AuthReducer)
    const { wdRequestID, wdPaymentUsername, wdPaymentAmount, wdTxHash, walletAddress } = useSelector((state) => state.AdminReducer)
    const { investmentPackage } = useSelector((state) => state.PersistReducer)

    // console.log(investmentPackage.wd_rate)
    const wd_rate = parseFloat(investmentPackage.wd_rate)
    const timeNow = parseInt(Date.now() / 1000)

    //---------------------------------
    const handlePayment = async () => {

        const web3 = new Web3(window.ethereum)
        const payout = wdPaymentAmount * wd_rate
        console.log(payout)
        const payAmount = wdPaymentAmount ? web3.utils.toWei((payout).toString()) : '0' // string
        const MyBUSDBalance = USER_BUSD_balance ? web3.utils.toWei(USER_BUSD_balance.toString()) : '0'
        const BNB_BALANACE = BnbBalance ? web3.utils.toWei(BnbBalance.toString()) : '0'

        console.log(wdRequestID)
        console.log(wdPaymentUsername)
        console.log(wdPaymentAmount)
        console.log(wdTxHash)
        console.log(walletAddress)
        console.log(parseInt(payAmount))
        console.log(parseInt(MyBUSDBalance))
        return console.log(parseInt(BNB_BALANACE))

        if (!BNB_BALANACE) {
            return dispatch(setModalMessage({ type: 'warning', title: "Insufficient BNB Tx Fee!", message: 'Insufficient BNB for Transaction Fee' }))
        }

        if (parseInt(payAmount) > parseInt(MyBUSDBalance)) {
            return dispatch(setModalMessage({ type: 'warning', title: "Insufficient BUSD balance!", message: 'Insufficient MetaMask BUSD Balance' }))
        }

        // return storeWithdrawalServer('123dfsdfsfsdfdsfdsfdsfdsfdsfs')


        if (!DEFIEXPLORER && !BUSDEXPLORER) return false
        if (!payAmount) return false
        if (!username) return false
        if (!wdPaymentUsername) return false
        if (!walletAddress) return false

        try {

            dispatch(setBtnSpinner(true))

            let continu = false

            const gasfee = await BUSDEXPLORER.methods.approve(contractAddress, payAmount).estimateGas({ gas: 3000000, from: userAccount })

            await BUSDEXPLORER.methods.approve(contractAddress, payAmount).send({ gas: gasfee, from: userAccount }) // EXPLORER address consist BUSD
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

            const gasUsed = await DEFIEXPLORER.methods.payment(wdRequestID, wdPaymentUsername, walletAddress, payAmount, timeNow).estimateGas({ gas: 3000000, from: userAccount })

            await DEFIEXPLORER.methods.payment(wdRequestID, wdPaymentUsername, walletAddress, payAmount, timeNow).send({ gas: gasUsed, from: userAccount })
                .on('transactionHash', (hash) => {
                    //  console.log(hash) // do not rely on this hash. must after receipt below
                    dispatch(setModalProcess(true))
                    dispatch(setBtnSpinner(false))
                })
                .on('receipt', (receipt) => {

                    // console.log(receipt.transactionHash) // will be used for parameter for server save

                    //==== STORE TO DATABASE===============
                    storeWithdrawalServer(receipt.transactionHash) // call a function below to store on server
                    dispatch(setModalProcess(false))


                    //--- UPDATE METAMASK WALLET BNB BALANCE
                    window.web3.eth.getBalance(userAccount)
                        .then((balance) => {
                            if (parseInt(balance) > 0) {
                                const accountBalance = window.web3.utils.fromWei(balance.toString())
                                dispatch(setBNBBalance(accountBalance))
                            } else {
                                dispatch(setBNBBalance(false))
                            }
                        })

                    //--- UPDATE METAMASK WALLET BUSD BALANCE not used here!



                }).catch((error) => { // metamask reject  
                    console.log(error)
                    dispatch(setModalProcess(false))
                    dispatch(setBtnSpinner(false))
                    dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!", message: 'User reject transaction' }))
                })

        } catch (error) {
            console.log(error)
            dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!", message: error.message }))
            dispatch(setBtnSpinner(false))
            dispatch(setModalProcess(false))
        }
    }


    //==== STORE TO DATABASE===============
    const storeWithdrawalServer = async (hash) => {

        dispatch(setBtnSpinner(true))

        const data = {
            username: username,
            admWalletAddr: userAccount,
            //------------------------
            wdRequestID: wdRequestID,
            userWD: wdPaymentUsername,
            WDAmount: wdPaymentAmount,
            payout: payout,
            WDWalletAddr: walletAddress,
            wd_tx_hash: wdTxHash,
            paymeny_tx_hash: hash,
            time: timeNow
        }

        //   console.log(data)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/payment-wd`,
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

                    dispatch(setModalAdminPaymentWD(false))
                    dispatch(setWdWalletHistory(false)) // allow reload

                    // dispatch(setWdXBUSDAmount(false)) // only this part
                    // dispatch(setModalMessage({ type: 'success', title: "Transaction Success!", message: data.message }))
                    // dispatch(setReloadBalance(true)) // will be done in topNavigation
                } else {

                    //  return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }

                dispatch(setBtnSpinner(false))

            }).catch(function (error) {
                dispatch(setBtnSpinner(false))
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

    return (
        <>


            {btnSpinner ?
                <button className="_gradient_blue text-white  text-lg  mx-auto py-1 mt-2 border-4 border-gray-500 rounded-full px-6  flex justify-center items-center">
                    <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    PROCESSING...</button>
                :



                <button onClick={handlePayment} className="_gradient_green text-white text-lg  mx-auto py-1 mt-2 border-2 border-gray-500 rounded-full px-6  flex justify-center items-center">
                    <i className="icofont-double-right mr-2" />  PAY NOW</button>


            }


        </>
    )
}



