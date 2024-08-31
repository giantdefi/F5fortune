import React, { useEffect, useRef, useState } from "react";
import Web3 from 'web3';
import { useMetaMask } from "metamask-react";
//import WalletModal from './WalletModal'


//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux';
import { resetMetamask, setMetamaskInstalled, setMetamaskConnect, setNetworkCorrect, setBNBBalance, setUserAccount, setUserAccountShort } from 'redux/reducers/MetamaskReducer';
import { resetSmartContract, set_DEFIEXPLORER, set_BUSDEXPLORER, set_USER_BUSD_balance, set_ADDR_REGISTERED, setContractAddress } from 'redux/reducers/SmartContractReducer';
import { resetModal } from 'redux/reducers/ModalReducer';
import { resetErrors } from 'redux/reducers/ErrorReducer';
import { resetLoader } from 'redux/reducers/LoaderReducer';
//--------------------------------------

//import BUSD_ABI from 'smartcontract/abis/BUSDMAINNET.json' // MAIN NET
import BUSD_ABI from 'smartcontract/abis/BUSDTestnet.json' // TEST NET
import MANEKI_ABI from 'smartcontract/abis/MANEKI_ABI.json'

//const BUSD_ADDR = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" // BSC MAIN to be used to deploy 
const BUSD_ADDR = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee" // BSC TESTNET to be used to deploy 
//const BUSD_ADDR = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd" // USDT BINANCE TESTNET to be used to deploy mainnet : 0x55d398326f99059fF775485246999027B3197955?????
// USDT MAIN BINNCE : 0x55d398326f99059fF775485246999027B3197955 
const MANEKI_ADDR = "0x92ACA539a0360ef74325B393D5eAE3e5d1CE2aba" //  ON BSC TEST 0xD2c5b9Adc01Ea7706b355d40F081709103f13681 // last ok
//const MANEKI_ADDR = "0x76f19D4CB0Ef48c4e66A149385396384d090056F" //  ON BSC MAINNET N/YET CREATED
// NOTE : DONT FORGET TO CHANGE CONTRACT ADDRESS in :
// BtnBuyEpins.js  in this file folder!
// BtnBuyGas.js  in this file folder!


export default function Boarding() {
  //----------------------------------------------------------

  const { status, connect, account, chainId, ethereum } = useMetaMask();

  // console.log(status)
  // console.log(connect)
  // console.log(account)
  // console.log(chainId)
  // console.log(ethereum)

  const dispatch = useDispatch();
  //const { walletModal } = useSelector((state) => state.ModalReducer)
  const { userAccount, isMetamaskInstalled, isMetamaskConnected, MAIN_NETWORK_ID } = useSelector((state) => state.MetamaskReducer)

  // console.log(isMetamaskInstalled)
  // console.log(isMetamaskConnected)
  // console.log(MAIN_NETWORK_ID)
  // console.log(account)

  useEffect(() => {
    if (status === "initializing") { console.log('Synchronisation with MetaMask ongoing...') }
    if (status === "unavailable") { console.log('MetaMask not available...') }
    if (status === "connecting") { console.log('Connecting...') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {

     dispatch(setContractAddress(MANEKI_ADDR))
    // console.log('boarding load...')

    // resetAllPageData() //reset all? NO NEED HERE becasue the page is always load on visit

    if (status === 'connected') {

      dispatch(setMetamaskInstalled(true))
      dispatch(setMetamaskConnect(true))
      dispatch(setUserAccount(account))
      let front = account.substring(0, 10);
      let back = account.substring(account.length - 10);
      const string = front + '....' + back;
      dispatch(setUserAccountShort(string))

    } else {

      dispatch(setMetamaskInstalled(false))
      dispatch(setMetamaskConnect(false))
      dispatch(setUserAccount(false))
      dispatch(setUserAccountShort(false))

    }

    if (status === 'connected' && isMetamaskInstalled && isMetamaskConnected && account && chainId === MAIN_NETWORK_ID) {

      dispatch(setNetworkCorrect(true))
      dispatch(resetModal()) // if any modal open

      window.web3 = new Web3(window.ethereum);

      const DEFI_EXPLORER = new window.web3.eth.Contract(MANEKI_ABI, MANEKI_ADDR)
      const BUSD_EXPLORER = new window.web3.eth.Contract(BUSD_ABI, BUSD_ADDR)

      dispatch(set_DEFIEXPLORER(DEFI_EXPLORER))
      dispatch(set_BUSDEXPLORER(BUSD_EXPLORER))

      const web3 = new Web3(window.ethereum)

      window.web3.eth.getBalance(account)
        .then((balance) => {
          if (parseInt(balance) > 0) {
            const accountBalance = web3.utils.fromWei(balance.toString())
            dispatch(setBNBBalance(accountBalance))
          } else {
            dispatch(setBNBBalance(false))
          }
        })

      BUSD_EXPLORER.methods.balanceOf(account).call()
        .then((balance) => {
          if (parseInt(balance) > 0) {
            const BUSDbalance = web3.utils.fromWei(balance.toString());
            dispatch(set_USER_BUSD_balance(BUSDbalance))
            //  dispatch(set_USER_BUSD_balance(Math.floor(parseFloat(BUSDbalance))))
          } else {
            dispatch(set_USER_BUSD_balance(false))
          }
        })

      // DEFI_EXPLORER.methods.isReg(account).call()
      //   .then((status) => {
      //     if (status) {
      //       dispatch(set_ADDR_REGISTERED(status))
      //     } else {
      //       dispatch(set_ADDR_REGISTERED(false))
      //     }
      //   })

    } else {
      dispatch(setNetworkCorrect(false))
      dispatch(set_ADDR_REGISTERED(false))
      dispatch(set_USER_BUSD_balance(false))
      dispatch(setBNBBalance(false))
      //   dispatch(setModalMessage({ type: 'warning', title: "NOT BINANCE NETWORK", message: 'Please Connect to Binance Network' }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, isMetamaskInstalled, isMetamaskConnected,]);


  const resetAllPageData = () => {
    //  console.log('RESET LOADED.......!!!!')
    dispatch(resetErrors())
    dispatch(resetLoader())
    dispatch(resetMetamask())
    dispatch(resetModal())
    dispatch(resetSmartContract())

  }


  // console.log(account)
  // console.log(chainId)

  return (
    <>

      {/* <button className="border" onClick={connect}>Connect to MetaMask</button> */}

      {/* {walletModal && <WalletModal />} */}

    </>
  );
}


