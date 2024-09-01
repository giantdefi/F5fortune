import React, { useRef, useEffect, useState } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"
import BtnBuyPackage from "redux/actions/BtnBuyPackage" 
import BtnAddMorePackage from "redux/actions/BtnAddMorePackage" 
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalConfirmBuyPackage } from 'redux/reducers/ModalReducer'
//import { setBuyEpinSpinner } from 'redux/reducers/LoaderReducer'
//import { setContinueBuy } from 'redux/reducers/EpinReducer'
//--------------------------------------

export default function ModalConfirmBuyPins() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    const router = useRouter()
    const dispatch = useDispatch()
    const [continueLoader, setContinueLoader] = useState(false)
    const { modalConfirmBuyPackage } = useSelector((state) => state.ModalReducer)
    const { isLogin, isActive,  } = useSelector((state) => state.AuthReducer)
   


    useEffect(() => {
        if (modalConfirmBuyPackage) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                        document.body.classList.remove('overflow-hidden')
                        handleCloseModal()
                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 500)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalConfirmBuyPackage])

    const handleCloseModal = () => {
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalConfirmBuyPackage(false))
            document.body.classList.remove('overflow-hidden')
        }, 500)

    }

    const handleContinueBinary = () => {

        dispatch(setModalConfirmBuyPackage(false))
     

        // continue to buy-epins.js to process buy epins

    }



    return (
        <>
            <div className="fixed w-full inset-0  overflow-hidden flex justify-center items-center animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className="_gradient_slate relative border-2 shadow-2xl   mx-auto rounded-xl z-50 overflow-y-auto w-96 animated zoomIn" ref={outsideRef}>
                    <i className="icofont-close-circled absolute top-1 right-2 text-3xl text-orange-400 cursor-pointer"
                        onClick={handleCloseModal} />

                    <div className="modal-content  py-4 px-4">

                        <h5 className="text-gray-100 uppercase font-semibold text-white"> 
                            Confirm to {isActive? 'Add More Package' : 'buy package'}?</h5>
                            {isActive?
                            <p className="text-white">Buy Package Using only R Wallet</p>:
                            <p className="text-white">Buy Package Using E Wallet</p>
}
                            <div className="flex justify-between  mt-4">
                                <button onClick={handleCloseModal} className="_btn_submit_red flex centered">
                                    Cancel
                                </button>
                                {isActive? <BtnAddMorePackage/> :  <BtnBuyPackage/> }

                            </div>

                    </div>
                </div>
            </div>


        </>
    );
}

