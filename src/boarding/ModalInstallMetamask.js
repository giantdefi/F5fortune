import React, { useEffect, useState, useRef } from "react";
import { useMetaMask } from "metamask-react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setModalInstallMetamask } from 'redux/reducers/ModalReducer';
//-------------------------------------------------------


export default function ModalInstallMetamask() { // receive props from parent

    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const { switchChain, addChain } = useMetaMask();

    const outsideRef = useRef(null)
    const overlayRef = useRef(null)

    // redux store
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false)
    const [itemSelected, setItemSelected] = useState(false)
    const [selectURL, setSelecURL] = useState()

    const { modalInstallMetamask } = useSelector((state) => state.ModalReducer)
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

    const binsnceTestNet = {
        chainId: "0x61",
        chainName: "Binance Test Net",
        //  rpcUrls: ["https://data-seed-prebsc-1-s2.binance.org:8545/"],
        rpcUrls: ["https://rpc.ankr.com/bsc_testnet_chapel/"],
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
            dispatch(setModalInstallMetamask(false))
        }, 500)
    }

    /* ---- click outside modal to close modal -----
      Must be set modal open from parent 
      Please inspect Body must add class 'overflow-hidden' to enable click outside
    */
    useEffect(() => {
        if (modalInstallMetamask) {

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
    }, [modalInstallMetamask])


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
                <div ref={outsideRef} className="border-white  border-2  shadow-2xl bg-gray-800  mx-auto rounded-xl z-50 overflow-y-auto w-96 animated zoomIn">

                    {/* <i className="icofont-close-circled absolute top-0 right-0 text-3xl text-gray-400 cursor-pointer m-2"
            onClick={handleModalClose} /> */}

                    <div className="flex justify-center  p-2">
                        <img src="/assets/img/metamask-banner.webp" alt="binance" className="w-full" />
                    </div>

                    <p className="text-white text-center mt-2 uppercase">Please Install MetaMask Wallet</p>

                    {!isMetamaskInstalled && !isMetamaskConnected &&
                        <div className=" flex justify-center  items-center mt-5 mb-5">
                            <div className=" border-2  bg-red-700 text-white py-2 px-3 rounded-xl animate-pulse">
                                <i className="icofont-fox-alt mr-2 text-2xl "></i>METAMASK NOT DETECTED</div>
                        </div>}

                </div>
            </div>


        </>
    );
}

