import React, { useEffect, useState, useRef } from "react";
import { useMetaMask } from "metamask-react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setModalConnectBinance } from 'redux/reducers/ModalReducer';
//-------------------------------------------------------


export default function ModalConnectBinance() { // receive props from parent

    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const { switchChain, addChain } = useMetaMask();

    const outsideRef = useRef(null)
    const overlayRef = useRef(null)

    // redux store
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false)
    const [itemSelected, setItemSelected] = useState(false)
    const [selectURL, setSelecURL] = useState()

    const { modalConnectBinance } = useSelector((state) => state.ModalReducer)
    const { currenctNetwork, isMetamaskInstalled, isMetamaskConnected } = useSelector((state) => state.MetamaskReducer)

    const binsnceMainNet = {
        chainId: "0x38",
        chainName: "Binance Smart Chain",
        rpcUrls: [selectURL],
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
        blockExplorerUrls: ["https://bscscan.com"]
    };

    const binanceTestNet = {
        chainId: "0x61",
        chainName: "Binance Test Net",
        rpcUrls: ["https://data-seed-prebsc-1-s2.binance.org:8545/"],
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
        blockExplorerUrls: ["https://testnet.bscscan.com"]
    };

    const handleModalClose = () => {
        document.body.classList.remove('overflow-hidden'); // prevent body scroll on modal open
        outsideRef.current.classList.add('zoomOut');
        overlayRef.current.classList.add('fadeOut');
        setTimeout(() => { // delay close to enable animation working first
            dispatch(setModalConnectBinance(false))
        }, 500)
    }

    /* ---- click outside modal to close modal -----
      Must be set modal open from parent 
      Please inspect Body must add class 'overflow-hidden' to enable click outside
    */
    useEffect(() => {
        if (modalConnectBinance) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                        handleModalClose()
                        document.body.classList.remove('overflow-hidden');
                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 100)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalConnectBinance])


    const handleAddBinanceMainNet = (n) => {
        setSpinner(true)
        setItemSelected(n)
        if (n === 1) { setSelecURL('https://bsc-dataseed1.ninicoin.io/') }
        if (n === 2) { setSelecURL('https://bsc-dataseed2.ninicoin.io/') }
        if (n === 3) { setSelecURL('https://bsc-dataseed3.ninicoin.io/') }
        if (n === 4) { setSelecURL('https://bsc-dataseed1.defibit.io/') }
        if (n === 5) { setSelecURL('https://bsc-dataseed2.defibit.io/') }
        if (n === 6) { setSelecURL('https://bsc-dataseed.binance.org/') }


    }

    useEffect(() => {
        if (itemSelected && selectURL) {
            console.log(itemSelected)
            console.log(selectURL)
            addChain(binsnceMainNet)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemSelected, selectURL])

    return (
        <>

            <div className="_modal text-white animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div ref={outsideRef} className="border-white py-3 border-2  shadow-2xl bg-gray-800  mx-auto rounded-xl z-50 overflow-y-auto w-96 animated zoomIn">

                    {/* <i className="icofont-close-circled absolute top-0 right-0 text-3xl text-gray-400 cursor-pointer m-2"
            onClick={handleModalClose} /> */}

                    <div className="flex justify-center  ">
                        <img src="/assets/img/binance-logo.webp" alt="binance" className="w-[80%]" />
                    </div>

                    <p className="text-white text-center mt-2 uppercase">Please Choose Connection</p>
                    <p className="text-white text-center mt-2 ">Try others if one is fail</p>


                    {!isMetamaskInstalled && !isMetamaskConnected &&
                        <div className=" flex justify-center  items-center mt-5 mb-5">
                            <div className=" border-2  bg-red-700 text-white py-2 px-3 rounded-xl animate-pulse">
                                <i className="icofont-fox-alt mr-2 text-2xl "></i>METAMASK NOT DETECTED</div>
                        </div>}

                    {isMetamaskInstalled && isMetamaskConnected && currenctNetwork === "mainnet" &&
                        <div className=" flex flex-col justify-center items-center space-y-2 py-5">

                            <button onClick={() => handleAddBinanceMainNet(1)} className="_btn_connect_binance">
                                {spinner && itemSelected === 1 ?
                                    <svg role="status" className="mr-4 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> :
                                    <i className="icofont-arrow-right mr-2 text-2xl"></i>
                                }  BINANCE SMART CHAIN 1 </button>

                            <div className="text-center p-0">
                                {spinner && itemSelected === 1 && <p>Waiting for connection.....</p>}
                            </div>

                            <button onClick={() => handleAddBinanceMainNet(2)} className="_btn_connect_binance">
                                {spinner && itemSelected === 2 ?
                                    <svg role="status" className="mr-4 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> :
                                    <i className="icofont-arrow-right mr-2 text-2xl"></i>
                                } BINANCE SMART CHAIN 2 </button>
                            <div className="text-center p-0">
                                {spinner && itemSelected === 2 && <p>Waiting for connection.....</p>}
                            </div>

                            <button onClick={() => handleAddBinanceMainNet(3)} className="_btn_connect_binance">
                                {spinner && itemSelected === 3 ?
                                    <svg role="status" className="mr-4 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> :
                                    <i className="icofont-arrow-right mr-2 text-2xl"></i>
                                } BINANCE SMART CHAIN 3 </button>
                            <div className="text-center p-0">
                                {spinner && itemSelected === 3 && <p>Waiting for connection.....</p>}
                            </div>

                            {/* <button onClick={() => handleAddBinanceMainNet(4)} className="_btn_connect_binance">
                                {spinner && itemSelected === 4 ?
                                    <svg role="status" className="mr-4 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> :
                                    <i className="icofont-arrow-right mr-2 text-2xl"></i>
                                }  BINANCE SMART CHAIN 4</button>
                            <div className="text-center p-0">
                                {spinner && itemSelected === 4 && <p>Waiting for connection.....</p>}
                            </div> */}

                            <button onClick={() => handleAddBinanceMainNet(5)} className="_btn_connect_binance">
                                {spinner && itemSelected === 5 ?
                                    <svg role="status" className="mr-4 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> :
                                    <i className="icofont-arrow-right mr-2 text-2xl"></i>
                                }   BINANCE SMART CHAIN 5</button>
                            <div className="text-center p-0">
                                {spinner && itemSelected === 5 && <p>Waiting for connection.....</p>}
                            </div>

                            <button onClick={() => handleAddBinanceMainNet(6)} className="_btn_connect_binance">
                                {spinner && itemSelected === 6 ?
                                    <svg role="status" className="mr-4 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> :
                                    <i className="icofont-arrow-right mr-2 text-2xl"></i>
                                }   BINANCE SMART CHAIN 6</button>
                            <div className="text-center p-0">
                                {spinner && itemSelected === 6 && <p>Waiting for connection.....</p>}
                            </div>

                        </div>
                    }




                    {isMetamaskInstalled && isMetamaskConnected && currenctNetwork === "testnet" &&

                        <div className="flex justify-center items-center mt-5 mb-5">
                            <button onClick={() => addChain(binanceTestNet)} className="_btn_connect_binance "><i className="icofont-arrow-right mr-2 text-2xl"></i> BINANCE SMART CHAIN</button>
                        </div>}


                </div>
            </div>


        </>
    );
}

