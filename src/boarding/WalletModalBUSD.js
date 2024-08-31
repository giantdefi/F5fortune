import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link'
import { useMetaMask } from "metamask-react";
import Web3 from 'web3';

// redux store --------------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
//import { setConnectWallet } from 'redux/reducers/SettingReducer';
import { setWalletModal } from 'redux/reducers/ModalReducer';
import { setBNBBalance } from 'redux/reducers/MetamaskReducer';
import { set_USER_BUSD_balance } from 'redux/reducers/SmartContractReducer';
import { setWalletCopyLink } from 'redux/reducers/SettingReducer';
//----------------------------------------------------------------


export default function ModalWallet() {

  //  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const [copied, setCopied] = useState(false)

  const dispatch = useDispatch();
  const { showWalletCopyLink } = useSelector((state) => state.SettingReducer)
  const { walletModal } = useSelector((state) => state.ModalReducer)
  const { userAccount, BnbBalance, isNetworkCorrect, shown_address_on_bscscan_mainnet, shown_address_on_bscscan_testnet, currenctNetwork } = useSelector((state) => state.MetamaskReducer)
  const { BUSDEXPLORER, USER_BUSD_balance, ADDR_REGISTERED } = useSelector((state) => state.SmartContractReducer)


  const outsideRef = useRef(null)

  const [reload, setReload] = useState(false)

  const copyToClipboard = (e) => {

    try {
      navigator.clipboard
        .writeText(e)
        .then(() => {
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 2000)
        }).catch(() => {
          dispatch(setWalletCopyLink(false))
          alert("Ops.. Mobile App get Error! Please to tab the address directly and copy");
        })
    } catch (error) {
      //  console.log(error)
      dispatch(setWalletCopyLink(false)) // not shown again after first error
      alert("Ops.. Mobile App get Error! Please to tab the address directly and copy");
    }
  }

  const handleModalClose = () => {
    document.body.classList.remove('overflow-hidden');
    if (outsideRef.current) {
      outsideRef.current.classList.add('zoomOut');
    }
    setTimeout(() => {
      dispatch(setWalletModal(false))
    }, 500)
  }

  const handleRefeshBalance = async () => {
    console.log('Load.....')

    setReload(true)
    setTimeout(() => {
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
            const BUSDbalance = web3.utils.fromWei(balance.toString());
            dispatch(set_USER_BUSD_balance(BUSDbalance))
          } else {
            dispatch(set_USER_BUSD_balance(false))
          }
          setReload(false)
        });

    }, 1000)
  }


  // click outside
  useEffect(() => {
    if (walletModal) {
      setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called
        const checkIfClickedOutside = e => {
          if (outsideRef.current && !outsideRef.current.contains(e.target)) {
            handleModalClose() // prevent alert on Mobile that become click outside
          }
        }
        document.addEventListener("click", checkIfClickedOutside)
        return () => {
          document.removeEventListener("click", checkIfClickedOutside)
        }
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletModal])

  const handleRefreshPage = () => {
    window.location.reload()
  }

  return (
    <>

      <div className="_modal_wallet " style={{ zIndex: 100 }} >
        <div className="border-white   border-4 shadow-2xl bg-white  
        mx-auto rounded-3xl z-50 overflow-y-auto w-96 relative animated fadeInRight shadow-4xl" ref={outsideRef}>


          <div className="_modal-header py-4 text-left px-6 bg-blue-100">
            {/*Title*/}
            <div className="flex justify-between items-center pb-3 bg">
              <p className="text-xl font-bold text-gray-900">Your MetaMask Wallet</p>
              <div className="modal-close cursor-pointer z-50 " onClick={handleModalClose}>
                <h1 className="icofont-close-circled text-gray-700 text-4xl"></h1>
              </div>
            </div>
          </div>

          <div className="modal-content py-4  px-6 pb-10">
            <div className="text-md text-gray-600 flex justify-between py-1">
              <span className="px-3 font-bold">Your wallet address  </span>
              {copied && <span className="bg-gray-500 text-white h-6 px-4 rounded-full leading-none items-center py-1">Copied</span>}
            </div>

            <div className="flex justify-between p-4 max-w-sm mx-auto bg-green-100 rounded-xl shadow-sm items-center space-x-4">
              <div id="user_account" className="text-md  text-black font-bold truncate">{userAccount}</div>
              {showWalletCopyLink &&
                <Link href="#"><a onClick={() => copyToClipboard(userAccount)}>
                  <svg className="fill-current text-blue-500" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 1H4C2.9 1 2 1.9 2 3V16C2 16.55 2.45 17 3 17C3.55 17 4 16.55 4 16V4C4 3.45 4.45 3 5 3H15C15.55 3 16 2.55 16 2C16 1.45 15.55 1 15 1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM18 21H9C8.45 21 8 20.55 8 20V8C8 7.45 8.45 7 9 7H18C18.55 7 19 7.45 19 8V20C19 20.55 18.55 21 18 21Z">
                    </path></svg>
                </a></Link>}
            </div>

            {/* {isNetworkCorrect &&
              <div className="text-md text-gray-600 flex justify-between py-4">
                {ADDR_REGISTERED ?
                  <span className="px-3 font-bold">Reg Status :  <span className="text-green-600">YES REGISTERED</span> <i className="icofont-check" /></span>
                  :
                  <span className="px-3 font-bold ">Reg Status :  <span className="text-red-600"> NOT REGISTERED </span> <i className="text-red-700 icofont-close-circled" /></span>
                }
              </div>
            } */}

            <div className="flex flex-row justify-end items-center">
              <p className="text-gray-800 text-sm mr-10">Refresh Balance   <span className="cursor-pointer icofont-long-arrow-right text-lg"></span></p>
              <button onClick={handleRefeshBalance} className={reload ? "animate-spin mr-2" : "mr-2"}><i className="icofont-refresh text-3xl text-red-600"></i> </button>
            </div>


            {isNetworkCorrect && !BnbBalance &&
              <div className="animate-pulse p-4 mt-3 rounded-xl shadow-md border border-yellow-500 bg-orange-50">
                <div className="flex justify-start">
                  <svg viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-orange-400">
                    <path d="M4.47 20.9999H19.53C21.07 20.9999 22.03 19.3299 21.26 17.9999L13.73 4.98993C12.96 3.65993 11.04 3.65993 10.27 4.98993L2.74 17.9999C1.97 19.3299 2.93 20.9999 4.47 20.9999ZM12 13.9999C11.45 13.9999 11 13.5499 11 12.9999V10.9999C11 10.4499 11.45 9.99993 12 9.99993C12.55 9.99993 13 10.4499 13 10.9999V12.9999C13 13.5499 12.55 13.9999 12 13.9999ZM13 17.9999H11V15.9999H13V17.9999Z" /></svg>
                  <p className="font-semibold ml-4  text-gray-800">BNB Balance Low</p>
                </div>
                <p className="font-semi-bold pl-10 text-sm text-gray-800">You need BNB for transaction fees</p>
              </div>
            }

            {!isNetworkCorrect &&
              <div className="animate-pulse p-4 mt-3 rounded-xl shadow-md border border-yellow-500 bg-red-100">
                <div className="flex justify-start">
                  <svg viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-orange-400">
                    <path d="M4.47 20.9999H19.53C21.07 20.9999 22.03 19.3299 21.26 17.9999L13.73 4.98993C12.96 3.65993 11.04 3.65993 10.27 4.98993L2.74 17.9999C1.97 19.3299 2.93 20.9999 4.47 20.9999ZM12 13.9999C11.45 13.9999 11 13.5499 11 12.9999V10.9999C11 10.4499 11.45 9.99993 12 9.99993C12.55 9.99993 13 10.4499 13 10.9999V12.9999C13 13.5499 12.55 13.9999 12 13.9999ZM13 17.9999H11V15.9999H13V17.9999Z" /></svg>
                  <p className="font-bold ml-4 text-gray-800">PLEASE CONNECT TO BINANCE</p>
                </div>
                <p className="font-semi-bold pl-10 text-sm text-gray-800">BSC Main Network is required!</p>
              </div>

            }

            <div className=" mt-5 _crypto-balance-wrapper">
              <img src="/assets/img/bnb.png" alt="bnb" width={25} />
              <span className="flex-1 ml-3 whitespace-nowrap text-purple-700 font-semibold">BNB Balance</span>
              {!reload ?
                <span className="text-purple-700 font-semibold">{BnbBalance ? parseFloat(BnbBalance).toFixed(4) : '0.0000'}</span>
                :
                <svg role="status" className="mr-4 inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              }

            </div>

            <div className=" mt-0 _crypto-balance-wrapper">
              <img src="/assets/img/busd-coin.png" alt="busd" width={25} />
              <span className="flex-1 ml-3 whitespace-nowrap text-purple-700 font-semibold">BUSD Balance</span>

              {!reload ?
                <span className="text-purple-700 font-semibold"> {USER_BUSD_balance ? parseFloat(USER_BUSD_balance).toFixed(4) : "0.0000"}</span>
                :
                <svg role="status" className="mr-4 inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              }

            </div>
            {currenctNetwork == 'testnet'?
            <a href={`${shown_address_on_bscscan_testnet}` + userAccount} target="_blank" rel={"noreferrer"} className="flex justify-end p-1 pt-5">
              <p className="text-md flex font-semibold text-blue-500">View Crypto Wallet on TEstNet
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </p>
            </a>:
             <a href={`${shown_address_on_bscscan_mainnet}` + userAccount} target="_blank" rel={"noreferrer"} className="flex justify-end p-1 pt-5">
             <p className="text-md flex font-semibold text-blue-500">View Crypto Wallet on BscScan
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
               </svg>
             </p>
           </a> }



            {/* <div className="flex justify-center pt-4 space-x-14">
              <button onClick={(handleRefreshPage)} className="px-6 bg-green-600 py-2 pb-2  rounded-xl text-gray-50
               hover:bg-blue-800 border-4 border-gray-300 w-full font-semibold uppercase">Click to Hard Reload App</button>

            </div> */}
          </div>
        </div>
      </div>


    </>
  );
}
