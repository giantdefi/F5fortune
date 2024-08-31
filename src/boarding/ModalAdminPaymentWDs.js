import React, { useRef, useEffect, useState } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"
import AdminBTNPaymentWithdrawal from "./AdminBTNPaymentWithdrawal"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalAdminPaymentWD } from 'redux/reducers/ModalReducer'

//--------------------------------------

export default function ModalAdminPaymentWDs() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    const router = useRouter()
    const dispatch = useDispatch()
    const [continueLoader, setContinueLoader] = useState(false)
    const { modalAdminPaymentWD } = useSelector((state) => state.ModalReducer)
    const { isLogin, isBinary } = useSelector((state) => state.AuthReducer)
    const { wdRequestID, wdPaymentUsername, wdPaymentAmount, wdTxHash, walletAddress, freeStatus } = useSelector((state) => state.AdminReducer)


    useEffect(() => {
        if (modalAdminPaymentWD) {

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
    }, [modalAdminPaymentWD])

    const handleCloseModal = () => {
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalAdminPaymentWD(false))
            document.body.classList.remove('overflow-hidden')
        }, 500)

    }

    const handleRedeem = () => {


    }



    return (
        <>
            <div className="fixed w-full inset-0 pl-[20%] overflow-hidden flex justify-center items-center animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className=" w-[500px] _gradient_slate relative border-2 border-gray-500 shadow-2xl   mx-auto rounded-xl z-50 overflow-y-auto animated zoomIn" ref={outsideRef}>
                    <i className="icofont-close-circled absolute top-1 right-2 text-3xl text-orange-400 cursor-pointer"
                        onClick={handleCloseModal} />

                    <div className="modal-content  py-4 px-4">

                        <h5 className="text-gray-100 uppercase font-semibold"> Payment Confirmation</h5>

                        <div className="border border-gray-600 rounded-lg px-4 py-2 mt-4 bg-gray-700">


                            <p className="flex flex-row text-gray-50">
                                <span className="w-[100px] ">Username</span> :
                                <span className="ml-2">{wdPaymentUsername}</span></p>
                            <p className="flex flex-row text-gray-50">
                                <span className="w-[100px] ">Status</span> :
                                <span className="ml-2">{freeStatus ? 'Free Account *' : 'Paid Account'}</span></p>
                            <p className="flex flex-row text-gray-50">
                                <span className="w-[100px] ">WD Amount</span> :
                                <span className="ml-2">$ {wdPaymentAmount && parseFloat(wdPaymentAmount).toFixed(2)}</span></p>
                        </div>

                        <div className="border border-gray-600 rounded-lg px-4 py-2 mt-4 bg-gray-700">
                            <p className="flex flex-row text-gray-50">
                                <span className="w-[150px] ">Current balance</span> :
                                <span className="uppercase ml-2">$ 0</span>
                            </p>
                            <p className="flex flex-row text-gray-50">
                                <span className="w-[150px] ">Total previous WD</span> :
                                <span className="uppercase ml-2">$ 0</span>
                            </p>
                            <p className="flex flex-row text-gray-50">
                                <span className="w-[150px] ">Total previous Paid</span> :
                                <span className="uppercase ml-2">$ 0</span>
                            </p>
                        </div>
                        <div className="border border-gray-600 rounded-lg px-4 py-2 mt-4 bg-gray-700">
                            <p className="flex flex-row text-gray-50">
                                <span className="w-[150px] ">Total Referrals</span> :
                                <span className="uppercase ml-2">$ 0</span>
                            </p>
                            <p className="flex flex-row text-gray-50">
                                <span className="w-[150px] ">Total Bonus Sponsor</span> :
                                <span className="uppercase ml-2">$ 0</span>
                            </p>
                            <p className="flex flex-row text-gray-50">
                                <span className="w-[150px] ">Total Swap</span> :
                                <span className="uppercase ml-2">$ 0</span>
                            </p>


                            <p className="flex flex-row text-gray-50">
                                <span className="w-[150px] ">Total Bonus Pairing</span> :
                                <span className="uppercase ml-2">$ 0</span>
                            </p>

                            <p className="flex flex-row text-gray-50">
                                <span className="w-[150px] ">Total Send B-Wallet</span> :
                                <span className="uppercase ml-2">$ 0</span>
                            </p>
                        </div>

                        {isLogin &&
                            <div className="flex justify-between  mt-4">
                                <button onClick={handleCloseModal} className="_btn_submit_red flex centered">
                                    CANCEL
                                </button>
                                <div>
                                    <AdminBTNPaymentWithdrawal />

                                </div>


                            </div>}



                    </div>
                </div>
            </div>


        </>
    );
}

