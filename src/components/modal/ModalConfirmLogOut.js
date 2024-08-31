import React, { useRef, useEffect, useState } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalConfirmLogOut } from 'redux/reducers/ModalReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'

import { setLogout } from 'redux/reducers/AuthReducer'
import { resetForm } from 'redux/reducers/FormReducer'

//import { resetPackage } from 'redux/reducers/PackageReducer'
import { resetAffiliate } from 'redux/reducers/AffiliateReducer'
//import { resetStatement } from 'redux/reducers/StatementReducer'
//import { resetWithdrawal } from 'redux/reducers/WithdrawalReducer'
//import { setAttemps, setBtnCheckDisabled } from 'redux/reducers/SettingReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setToggleLogin } from 'redux/reducers/AuthReducer';
import { resetNetwork } from 'redux/reducers/NetworkReducer';
//--------------------------------------

export default function ModalConfirmLogOut() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    const router = useRouter()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const { modalConfirmLogOut } = useSelector((state) => state.ModalReducer)
    

    const handleLogout = () => {
    
        setSpinner(true)
        setTimeout(() => {
        dispatch(setPlaySound('click'))
        dispatch(resetForm())
      //  dispatch(resetPackage())
        dispatch(resetAffiliate())
      //  dispatch(resetStatement())
       // dispatch(resetWithdrawal())
       // dispatch(setAttemps(0))
        dispatch(setBtnCheckDisabled(false))
        dispatch(resetNetwork())
       
        dispatch(setError(false))
        dispatch(setLogout())
       // dispatch(setToggleLogin(1)) // toggle to login on main page
        setSpinner(false)
        handleCloseModal()
        router.push('/')
       
        }, 2000)
    }

    useEffect(() => {
        if (modalConfirmLogOut) {

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
    }, [modalConfirmLogOut])

    const handleCloseModal = () => {
        setSpinner(false)
        dispatch(setPlaySound('click'))
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOutDown')
        }
        setTimeout(() => {
            dispatch(setModalConfirmLogOut(false))
            document.body.classList.remove('overflow-hidden')
        }, 500)

    }


    return (
        <>
            <div className="fixed w-full inset-0  overflow-hidden flex justify-center items-center animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className="_gradient_slate relative border-2 shadow-2xl   mx-auto rounded-xl z-50 overflow-y-auto w-96 animated jackInTheBox" ref={outsideRef}>
                    <i className="icofont-close-circled absolute top-1 right-2 text-3xl text-orange-400 cursor-pointer"
                        onClick={handleCloseModal} />

                    <div className="modal-content  py-4 px-4">

                        <h5 className="text-gray-100 "> Are you sure to LOG OUT?</h5>

                       

                     

                      
                            <div className="flex justify-between  mt-4">
                                <button onClick={handleCloseModal} className="_btn_submit_red flex centered">
                                    Cancel
                                </button>
                                <button onClick={handleLogout}className="_btn_submit_blue border-2 border-gray-300 w-40">
                            {spinner ? 
                                <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg> :  'Yes LOGOUT' }
                                </button>
                            </div>

                    </div>
                </div>
            </div>


        </>
    );
}

