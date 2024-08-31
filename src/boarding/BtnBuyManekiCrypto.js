import React, { useState } from "react"
import Router, { useRouter } from "next/router"
import Web3 from 'web3'
import axios from 'axios'

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'

import { setModalProcess, setModalMessage, setModalAllowance, setModalConfirmationProcess, setModalToast } from 'redux/reducers/ModalReducer'
import { setBNBBalance } from 'redux/reducers/MetamaskReducer'
import { setBtnSpinner } from 'redux/reducers/LoaderReducer'
import { set_USER_BUSD_balance } from 'redux/reducers/SmartContractReducer'
import {
    resetEpins, setBuyEpinNumber, setBuyEpinValue, setBuyEpinName,
    setBuyEpinTotalPrice, setContinueBuy
} from 'redux/reducers/EpinReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { resetCrypto, setconfirmAllowance, setConfirmTransaction } from 'redux/reducers/CryptoReducer'
import { setReloadBalance } from 'redux/reducers/FinanceReducer' // for epins as well
//--------------------------------------

//const contractAddress = "0x76f19D4CB0Ef48c4e66A149385396384d090056F"


export default function BtnBuyManeki(props) {

  
    const router = useRouter()
    const dispatch = useDispatch()

    const [spinner, setSpinner] = useState(false)
    const { btnSpinner } = useSelector((state) => state.LoaderReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)
    //const {  } = useSelector((state) => state.CryptoReducer)
    const { userAccount, BnbBalance, isNetworkCorrect, shown_on_dscscan } = useSelector((state) => state.MetamaskReducer)
    const { DEFIEXPLORER, BUSDEXPLORER, USER_BUSD_balance, contractAddress } = useSelector((state) => state.SmartContractReducer)
    const { username, isLogin, isBinary, token } = useSelector((state) => state.AuthReducer)
    const { epinNumber, packageValue, packageName, totalPrice, continueBuy } = useSelector((state) => state.EpinReducer)
    const timeNow = parseInt(Date.now() / 1000)

//  console.log(username)
//         console.log(packageName)
//         console.log(packageValue)
//         console.log(epinNumber)
//         console.log(totalPrice)


    //---------------------------------
    const handleBuyGas = async () => {

       
       
     

        if (!USER_BUSD_balance) {
            return dispatch(setModalMessage({ type: 'warning', title: "Insufficient Balance!", message: 'You do not have MetaMask BUSD Balance' }))
        }

        if (!totalPrice) {
            dispatch(setError({ path: "depositBUSDAmount", message: 'Deposit USDT value is missing!' }))
        }

        const web3 = new Web3(window.ethereum)
        const totalPRiceWei = web3.utils.toWei((totalPrice).toString()) // diskon 10%
        const busdBalanceWei = web3.utils.toWei(USER_BUSD_balance.toString())

      //  return console.log(depositBUSDtoWei)

        if (parseInt(totalPRiceWei) > parseInt(busdBalanceWei)) {
            return dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!", message: 'Insuffient MetaMask USDT Balance' }))
        }

        if (!DEFIEXPLORER && !BUSDEXPLORER) return false
        if (!totalPrice) return false
        if (!username) return false
        //  if (!isBinary) return false

        try {
            //reset
            dispatch(setconfirmAllowance(false))
            dispatch(setConfirmTransaction(false))

            dispatch(setBtnSpinner(true))
            dispatch(setModalConfirmationProcess(true))
            dispatch(setconfirmAllowance(true))
            setconfirmAllowance

            let continu = false

            const gasfee = await BUSDEXPLORER.methods.approve(contractAddress, totalPRiceWei).estimateGas({ gas: 3000000, from: userAccount })

            await BUSDEXPLORER.methods.approve(contractAddress, totalPRiceWei).send({ gas: gasfee, from: userAccount }) // EXPLORER address consist BUSD
                .on('transactionHash', (hash) => {
                    console.log(hash)
                   // dispatch(setModalAllowance(true))
                   dispatch(setconfirmAllowance(false))
                   dispatch(setConfirmTransaction(true))
                })
                .on('receipt', (receipt) => {
                    console.log(receipt)
                   // dispatch(setModalAllowance(false))
                   dispatch(setconfirmAllowance(false))
                   dispatch(setConfirmTransaction(true))
                    continu = true
                }).catch((error) => {
                    console.log(error)
                    continu = false
                    dispatch(setBtnSpinner(false))
                    dispatch(setconfirmAllowance(false))
                    dispatch(setConfirmTransaction(true))
                   // dispatch(setModalProcess(false))
                   // dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!", message: 'User reject allowance' }))
                    dispatch(setModalToast({ type: 'error', title: "Transaction Reverted", message: 'User reject transaction!' }))
                })


            if (!continu) {
              //  dispatch(setModalProcess(false))
             return dispatch(setModalConfirmationProcess(false))
               
            }

          //  epinNumber, packageValue, packageName, totalPrice, continueBuy
          //  string memory _uname, string memory _pname, uint256 _pvalue, uint256 _pnumbers, uint256 _bptotal, uint256 _time
         

     
     
                 
          const gasUsed = await DEFIEXPLORER.methods.buyManeki(username, packageName, packageValue, epinNumber, totalPRiceWei,  timeNow).estimateGas({ gas: 3000000, from: userAccount })


            // string memory _uname, string memory _pname, uint256 _pvalue, uint256 _pnumbers, uint256 _bptotal, uint256 _time
            await DEFIEXPLORER.methods.buyManeki(username, packageName, packageValue, epinNumber, totalPRiceWei,  timeNow).send({ gas: gasUsed, from: userAccount })
                .on('transactionHash', (hash) => {
                    //  console.log(hash) // do not rely on this hash. must after receipt below
                   // dispatch(setModalProcess(true))
                   // dispatch(setBtnSpinner(false))
                   dispatch(setconfirmAllowance(false))
                   dispatch(setConfirmTransaction(true))
                })
                .on('receipt', (receipt) => {

                      console.log(receipt)

                    // console.log(receipt.transactionHash) // will be used for parameter for server save

                  //  dispatch(setModalProcess(false))
                 //   dispatch(setModalMessage({ type: 'success', message: 'Transaction is successfull' }))
                    dispatch(setModalToast({ type: 'success', title: "AWESOME", message: 'Transaction is successfull!' }))

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

                                 console.log(previousBUSDBalance)
                                 console.log(currentBUSDBalance)

                                // check if BUSD balance has changed then process buy gas on server. NOT VALID for the same address or OWNER
                               //  if (previousBUSDBalance > currentBUSDBalance) {
                                    buyEpinProcess(receipt.transactionHash) // call a function below to store on server
                               //  }
                                dispatch(setBtnSpinner(false))
                                dispatch(set_USER_BUSD_balance(NewBUSDbalance))

                            } else {
                                dispatch(set_USER_BUSD_balance(false))
                            }
                        })



                }).catch((error) => { // metamask reject  
                    console.log(error)
                //    dispatch(setModalProcess(false))
                dispatch(setModalConfirmationProcess(false)) //close modal
                    dispatch(setBtnSpinner(false))
                    dispatch(setModalToast({ type: 'error', title: "Transaction Reverted", message: 'User reject transaction!' }))
                })

        } catch (error) {
            console.log(error)
            dispatch(setModalToast({ type: 'error', title: "Transaction Reverted", message: 'User reject transaction!' }))
          //  dispatch(setModalMessage({ type: 'warning', title: "Transaction Reverted!", message: 'User reject transaction' }))
            dispatch(setBtnSpinner(false))
           // dispatch(setModalProcess(false))
           dispatch(setModalConfirmationProcess(false))
        }
    }

    // console.log(userAccount)

    //==== STORE TO DATABASE===============
    const buyEpinProcess = async (txhash) => {

        setSpinner(true)

        const data = {
            username: username,
            epinNumber: epinNumber,
            packageValue: packageValue * 0.9,
            packageName: packageName,
            totalPrice : totalPrice * 0.9,
            txhash
        }

       const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/buy-maneki-crypto`,
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
                    dispatch(resetEpins())
                   // dispatch(setModalMessage({ type: 'success', title: "Buy Maneki successful", message: 'transaction success' }))
                    dispatch(setModalConfirmationProcess(false))
                 return dispatch(setModalToast({ type: 'success', title: "AWESOME", message: 'Transaction is successfull!' }))
                } else {

                }

                setSpinner(false)
                dispatch(setBtnSpinner(false))
                dispatch(setContinueBuy(false))
              //  return dispatch(setReloadBalance(true)) // will be done in topNavigation

            }).catch(function (error) {
                setSpinner(false)
                dispatch(setContinueBuy(false))
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

    return (
        <>


            {btnSpinner ?<div className="flex flex-col centered">
                <button className="_gradient_blue  text-xl  mx-auto py-1 mt-2 border-4 border-gray-500 rounded-full px-6  flex justify-center items-center">
                    <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    PROCESSING.....</button><p>Waiting for MetaMask Confirmation...</p></div>
                :

                !formError && isLogin && isNetworkCorrect && BUSDEXPLORER && USER_BUSD_balance && !props.btndisabled ?

                    <button onClick={handleBuyGas} className="_gradient_green  text-xl  mx-auto py-1 mt-2 border-4 border-gray-500 rounded-full px-6  flex justify-center items-center">
                        <i className="icofont-double-right mr-2" />   BUY MANEKI</button>
                    :
                    <button className="_gradient_purple  text-xl  mx-auto py-1 mt-2 border-4 border-gray-400 rounded-full px-6  flex justify-center items-center">
                        <i className="icofont-ban mr-2" />  BUY MANEKI</button>

            }


        </>
    )
}



