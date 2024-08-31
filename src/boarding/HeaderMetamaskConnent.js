import React, { useState, useEffect } from "react"
import Link from 'next/link'
import axios from 'axios'
//import { useRouter } from 'next/router'
import { useMetaMask } from "metamask-react"
//import Boarding from "boarding/Boarding"

//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux'
import { setWalletModal, setModalMessage, setModalConnectBinance, setModalInstallMetamask } from 'redux/reducers/ModalReducer'
import { setEwallet, setBwallet, setGasBalance, setReloadBalance } from 'redux/reducers/FinanceReducer'
import { setLoaderBalance } from 'redux/reducers/LoaderReducer'
//--------------------------------------

export default function MetamaskConnent() {

    const { status, connect, account, chainId, ethereum } = useMetaMask()
    const { width } = useSelector((state) => state.GeneralReducer)
    const dispatch = useDispatch()
    const {userAccount, userAccountShort, isNetworkCorrect, isMetamaskInstalled, currenctNetwork } = useSelector((state) => state.MetamaskReducer)
    const { isLogin, isBinary, userid, token, username, avatar } = useSelector((state) => state.AuthReducer) 

    const handleOpenwallet = () => {
        dispatch(setWalletModal(true))
        // document.body.classList.add('overflow-hidden')
    }

    const handleConnectBNB = () => {
        dispatch(setModalConnectBinance(true)) // open modal
    }

    const handleConnecMetamask = () => {
        if (status === "unavailable") {
            dispatch(setModalInstallMetamask(true))
        } else {
            connect()
        }
    }

    const handleConnectBNBOK = () => {
        dispatch(setModalMessage({ type: 'success', title: "ALREADY CONNECTED!", message: 'Binance Network is connected' }))
    }

//console.log(width)

    return (
        <>

            {/* <Boarding /> */}


            <div className={isNetworkCorrect ? "h-16 w-full _gradient_green text-white border-2 border-yellow-700  rounded-xl" :
                "h-16 w-full _gradient_orange text-white border-2 border-yellow-400 border-dotted rounded-xl"}>

                {/* <div className='overflow-clip w-full'>
                    <iframe style={{ boxSizing: 'border-box', height: 50, width: '100%' }
                    } src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en&colorTheme=dark" frameBorder={0} />
                </div> */}

                <nav className="p-3 flex flex-grow relative justify-between  items-center mx-auto h-14">

                    {isNetworkCorrect ?
                        <div onClick={handleConnectBNBOK} className="flex-initial border border-gray-200 p-2 rounded-full bg-gray-700 cursor-pointer">
                            <img src="/assets/img/bnb.png" alt="binance" width={28} height={28} />
                        </div> :
                        <div onClick={handleConnectBNB} className="flex-initial border  border-gray-200 p-2 rounded-full bg-gray-700 cursor-pointer">
                            <img src="/assets/img/not-binance.png" alt="binance" width={28} height={28} />
                        </div>
                    }
                    {!isNetworkCorrect && status === 'connected' &&
                    <p className="  flex items-center animate-pulse"> <i className="icofont-swoosh-left text-3xl " /> Please connect to
                    {currenctNetwork == 'testnet'? 
                       ' Binance Testnet'  : ' Binance Mainnet'  
                    }
                    </p>
                    }

                    {isNetworkCorrect && status === 'connected' && 
                         <p className="border px-4 py-1 rounded-full bg-gray-700">{userAccountShort}</p>
                    }
                   

                    {status === 'unavailable' && <p className="  flex items-center animate-pulse">
                        {width < 1200 ? "Open this app on MetaMask Mobile" : "Please install MetaMask Wallet" 
                    } </p>} 
                                       
                 
                    {status !== 'unavailable' && status !== 'connected' && <p className="  flex items-center animate-pulse">Click to connect Metamask <i className="icofont-swoosh-right text-3xl" /></p>}

                    {status === 'connected' ?
                        <div onClick={handleOpenwallet} className="flex-initial border  border-gray-200 p-2 rounded-full bg-gray-700 cursor-pointer">
                            <img src="/assets/img/metamask.png" className="rounded-full" alt="metamask" width={32} height={32} />
                        </div> :
                        <div onClick={handleConnecMetamask} className="flex-initial border-2  border-red-500  rounded-full bg-gray-700 cursor-pointer">
                            <img src="/assets/img/metamask.gif" className="rounded-full" alt="metamask" width={42} height={42} />
                        </div>
                    }

                </nav>
            </div>
        </>
    )
}
