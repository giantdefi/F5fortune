import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'
//import BackArrow from "layout/mobile/BackArrow"
//import MyEpins from "contents/users/MyEpins"
//import EWalletBalance from "contents/users/EWalletBalance"
// import BWalletBalance from "contents/users/BWalletBalance"
// import GasBalance from "contents/users/GasBalance"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'

import { setError } from 'redux/reducers/ErrorReducer'
import { setLogout } from 'redux/reducers/AuthReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { resetAffiliate } from 'redux/reducers/AffiliateReducer'
import { resetHistory } from 'redux/reducers/HistoryReducer'
import { resetRefLink } from 'redux/reducers/ReferralReducer'
import { resetPersist } from 'redux/reducers/PersistReducer'
import { resetUsers } from 'redux/reducers/UsersReducer'
import { setSpinnerAtVisitor } from 'redux/reducers/LoaderReducer'
//--------------------------------------

export default function Users() {

    const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [itemLink, setItemLink] = useState()
    const [menuSpinner, setMenuSpinner] = useState(false)
    const { isLogin, isBinary, username, sponsor, status, pvalue } = useSelector((state) => state.AuthReducer)
    const { fullname, avatar, email, verified } = useSelector((state) => state.UsersReducer)

    useEffect(() => {
        dispatch(setSpinnerAtVisitor(false))
        dispatch(setMtreeBackUrl(false)) // back to users
        dispatch(setFromUserBackUrl(false)) // remove highlight on history-bonus-sponsor.js when select Mtree
        // if (!isLogin) {
        //     router.push('/auth/login')
        // }
      
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleLogout = () => {

        dispatch(resetForm())
        dispatch(resetAffiliate())
        dispatch(setError(false))
        dispatch(resetRefLink())
        dispatch(resetPersist())
        dispatch(resetSetting())
        dispatch(resetUsers())
        dispatch(setLogout()) // authReducer
        router.push('/')
    }

    const handleLogin = () => {
        router.push('/auth/login')
    }

    const handleMovePage = (link) => {
        //  dispatch(setMtreeBackURL('/users'))
        setItemLink(link)

        setMenuSpinner(true)
        setTimeout(() => {
            router.push(link)
        }, 500)
    }



    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="min-h-screen pb-40">

                <div className="flex flex-between justify-center items-center  _gradient_slate py-4 px-2">
                    {/* <BackArrow backURL="/" /> */}
                    {!isLogin ?
                        <button onClick={handleLogin} className="_btn_submit_orange"> Please Login </button> :
                        <button onClick={handleLogout} className="_gradient_orange border border-gray-600 rounded-l-full py-1 px-4 text-sm"> Logout </button>
                    }
                </div>

                <div className="text-center py-4 mt-2 bg-sky-900 dark:bg-slate-900">
                    <h4 className="uppercase ">Hi, {fullname ? fullname : username ? username : 'Visitor'}</h4>
                    <p className="ml-4 text-gray-200 text-sm">
                        Network Status : {isBinary ?
                            <span className="text-green-300">ACTIVE <i className="icofont-check"></i>
                            </span> : <span className="text-yellow-400">NOT ACTIVE</span>}
                    </p>
                </div>

                <div className="text-center py-2 mt-2 bg-gray-700">
                    <p className="uppercase ">Wallet & E-PIN</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                    {/* <EWalletBalance /> */}
                    {/* <BWalletBalance />
                    <GasBalance /> */}
                    {/* <MyEpins /> */}
                </div>


                <div className="text-center py-2 mt-2 bg-gray-700">
                    <p className="uppercase ">NETWORK</p>
                </div>



                <div className="w-full flex justify-around items-center  gap-3 mt-2">

                    <button onClick={() => handleMovePage('users/my-active-package')} className="main_menu_mobile_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/my-active-package" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-chart-growth text-4xl"></i>
                                    <p className="text-sm mt-2 uppercase"> My Staking</p>
                                </>
                            }
                        </div>
                    </button>

                    <button onClick={() => handleMovePage('binary/binary-tree')} className="main_menu_mobile_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "binary/binary-tree" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <img src="/assets/img/svg/binary.svg" className="max-w-[100px]" />
                                    <p className="text-sm mt-2 uppercase">Binary Tree</p>
                                </>
                            }
                        </div>
                    </button>
                </div>

                <div className="w-full flex justify-around items-center  gap-3">

                    <button onClick={() => handleMovePage('affiliate/affiliates')} className="main_menu_mobile_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "affiliate/affiliates" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-list text-3xl"></i>
                                    <p className="text-sm mt-2 uppercase">My Affiliates</p>
                                </>
                            }
                        </div>
                    </button>

                    <button onClick={() => handleMovePage('affiliate/active-referrals')} className="main_menu_mobile_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "affiliate/active-referrals" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>

                                    <i className="icofont-chart-flow  text-3xl"></i>
                                    <p className="text-sm mt-2 uppercase">My Referrals</p>
                                </>
                            }
                        </div>
                    </button>
                </div>


                <div className="text-center py-2 mt-2 bg-gray-700">
                    <p className="uppercase ">BONUSES</p>
                </div>

                <div className="w-full flex-between justify-center items-center gap-3 mt-2">

                    <button onClick={() => handleMovePage('binary/history-bonus-sponsor')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "binary/history-bonus-sponsor" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-contact-add text-yellow-300 text-4xl "></i>
                                    <p className="text-xs mt-1">Referral Bonus</p>
                                </>
                            }
                        </div>
                    </button>

                    <button onClick={() => handleMovePage('binary/history-bonus-matching')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "binary/history-bonus-matching" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-hand-drag2 text-yellow-300 text-4xl "></i>
                                    <p className="text-[11px] mt-1">Matching Bonus</p>
                                </>
                            }
                        </div>
                    </button>

                    <button onClick={() => handleMovePage('affiliate/leadership')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "affiliate/leadership" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-users-alt-5 text-4xl text-yellow-400 "></i>
                                    <p className="text-xs mt-1"> Leader Bonus</p>
                                </>
                            }
                        </div>
                    </button>

                </div>

                <div className="text-center py-2 mt-2 bg-gray-700">
                    <p className="uppercase ">TRANSACTIONS</p>
                </div>


                <div className="w-full flex-between justify-center items-center gap-3 mt-2">
                    <button onClick={() => handleMovePage('users/buy-epins')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/buy-epins" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-air-ticket text-4xl text-purple-200"></i>
                                    <p className="text-xs mt-2">Buy Epins</p>
                                </>
                            }
                        </div>
                    </button>

                    {/* <button onClick={() => handleMovePage('users/swap-wallet')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/swap-wallet" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-retweet text-green-400 text-4xl"></i>
                                    <p className="text-xs mt-2">Swap EWallet</p>
                                </>
                            }
                        </div>
                    </button> */}


                    <button onClick={() => handleMovePage('users/send-e-wallet')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "users/send-e-wallet" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-paper-plane text-sky-400 text-4xl"></i>
                                    <p className="text-xs mt-2">Send Wallet</p>
                                </>
                            }
                        </div>
                    </button>

                    <button onClick={() => handleMovePage('settings/update-profile')}
                        className={` ${email ? 'btn_menu_user' : 'btn_menu_user_required'} `}>
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "settings/update-profile" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-contact-add text-4xl  text-yellow-200"></i>
                                    <p className="text-xs mt-2">Update Profile</p>
                                </>
                            }
                        </div>
                    </button>

                </div>

 <              div className="w-full flex-between justify-center items-center gap-3 mt-2">
               
                {/*     <button onClick={() => handleMovePage('settings/upload-avatar')}
                        className={` ${avatar ? 'btn_menu_user' : 'btn_menu_user_required'} `}>
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "settings/upload-avatar" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-business-man  text-3xl text-yellow-200"></i>
                                    <p className="text-xs mt-3">Upload Avatar</p>
                                </>
                            }

                        </div>
                    </button> */}

                   

                    {/* <button onClick={() => handleMovePage('/users/send-gas')} className="btn_menu_user">
                        <div className=" flex flex-col justify-center items-center">
                            {menuSpinner && itemLink == "/users/send-gas" ?
                                <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                : <>
                                    <i className="icofont-paper-plane text-4xl text-orange-400"></i>
                                    <p className="text-xs mt-2">Send Gas</p>
                                </>
                            }
                        </div>
                    </button> */}

                </div>




                {/* {!verified &&
                    <div className="bg-gray-800 mt-2 py-2 px-2 rounded-xl mt-6 border text-sm border-dashed border-yellow-500">
                        <p className="ml-4 text-gray-200 ">
                            Please update your profile and upload avatar to make your status VERIFIED
                        </p>
                    </div>
                } */}

                {/* <div className="text-center py-4 mt-2 _gradient_mtree">
                    <p className="uppercase ">CRYPTO SMART CONTRACT</p>
                </div> */}

                {/* <div className="w-full flex justify-center items-center mt-4">

                    <button onClick={() => handleMovePage('crypto/crypto-buy-epins')}
                        className="border-2 border-gray-400 py-2 px-6 mx-auto rounded-lg _gradient_purple w-[90%]">
                        {menuSpinner && itemLink == "crypto/crypto-buy-epins" ?
                            <p className="text-lg mt-1 flex items-center text-white  uppercase  text-center">
                                CRYPTO TRANSACTION  <svg style={{ maxWidth: 40 }} role="status" className="ml-4 inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>

                            </p>

                            : <>

                                <p className="text-lg mt-1 flex items-center text-white  uppercase  text-center">
                                    <img src="/assets/img/metamask.png" alt="metamask" className="w-[30px] h-[30px] mr-2" />
                                    CRYPTO TRANSACTION <i className="icofont-thin-double-right  ml-2 text-4xl "></i>
                                </p>
                            </>
                        }
                    </button>

                </div> */}


                {/* STOCKIS -1 - ONLY */}
                {parseInt(status) > 0 && parseInt(status) < 2 &&
                    <div className="text-center py-2 mt-6 border border-gray-700 _gradient_mtree rounded-xl">
                        <h4 className="uppercase mb-2">STOCKIST MENU</h4>
                        <div className="w-full flex justify-around items-center gap-4  pt-2">
                            <button onClick={() => handleMovePage('stockist/send-epins')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "stockist/send-epins" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <div className="flex justify-between">
                                                <i className="icofont-air-ticket text-xl text-purple-200"></i>
                                                <i className="icofont-paper-plane text-4xl text-orange-400"></i>
                                            </div>

                                            <p className="text-xs mt-2">Send Epins</p>
                                        </>
                                    }

                                </div>
                            </button>
                            <button onClick={() => handleMovePage('stockist/history-send-epins')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "stockist/history-send-epins" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <i className="icofont-calendar text-4xl  text-yellow-200"></i>
                                            <p className="text-xs mt-2">History Send</p>
                                        </>
                                    }
                                </div>
                            </button>
                        </div>
                        {/* <div className="mt-6 text-xs">
                            <p className="text-sm">Use crypto exchange to buy Epins</p>
                            <p>Get 10% off for all packages</p>
                           
                        </div> */}

                    </div>
                }
                {/* END OF STOCKIS -1 - ONLY */}


                {/* STOCKIS - 2  */}
                {parseInt(status) > 0 && parseInt(status) > 1 &&
                    <div className="text-center py-2 mt-6 border border-gray-700 _gradient_mtree rounded-xl">
                        <h4 className="uppercase mb-2">STOCKIST-2 MENU</h4>

                        <div className="w-full flex justify-around items-center gap-4  pt-2">
                            <button onClick={() => handleMovePage('stockist/send-epins')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "stockist/send-epins" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <div className="flex justify-between">
                                                <i className="icofont-air-ticket text-xl text-purple-200"></i>
                                                <i className="icofont-paper-plane text-4xl text-purple-400"></i>
                                            </div>

                                            <p className="text-xs mt-2">Send Epins</p>
                                        </>
                                    }

                                </div>
                            </button>
                            <button onClick={() => handleMovePage('stockist/purchase-epins')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "stockist/purchase-epins" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <i className="icofont-air-ticket text-4xl  text-purple-400"></i>
                                            <p className="text-xs mt-2">Purchase Epins</p>
                                        </>
                                    }
                                </div>
                            </button>
                        </div>

                        <div className="w-full flex justify-around items-center gap-4  pt-2">
                            <button onClick={() => handleMovePage('stockist/history-send-epins')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "stockist/history-send-epins" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <i className="icofont-calendar text-3xl  text-purple-400"></i>
                                            <p className="text-xs mt-2">History Send</p>
                                        </>
                                    }
                                </div>
                            </button>

                            <button onClick={() => handleMovePage('/stockist/reset-cache')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "/stockist/reset-cache" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <i className="icofont-fire-burn text-3xl  text-red-400"></i>
                                            <p className="text-xs mt-2 uppercase">Clear Cache</p>
                                        </>
                                    }
                                </div>
                            </button>
                            {/* <button onClick={() => handleMovePage('/stockist/purchase-bwallet')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "/stockist/purchase-bwallet" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <i className="icofont-money text-4xl  text-blue-400"></i>
                                            <p className="text-xs mt-2">Purchase BWallet</p>
                                        </>
                                    }
                                </div>
                            </button> */}
                        </div>

                        {/* <div className="w-full flex justify-around items-center gap-4  pt-2">
                            <button onClick={() => handleMovePage('/stockist/mass-pairing')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "/stockist/mass-pairing" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <i className="icofont-ui-network text-3xl  text-purple-400"></i>
                                            <p className="text-xs mt-2">MASS PAIRING</p>
                                        </>
                                    }
                                </div>
                            </button>
                            <button onClick={() => handleMovePage('/stockist/purchase-gas')}
                                className="btn_menu_stockist">
                                <div className=" flex flex-col justify-center items-center">
                                    {menuSpinner && itemLink == "/stockist/purchase-gas" ?
                                        <svg style={{ maxWidth: 40 }} role="status" className="inline w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-red-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        : <>
                                            <i className="icofont-test-tube-alt  text-4xl  text-yellow-400"></i>
                                            <p className="text-xs mt-2">Purchase Gas</p>
                                        </>
                                    }
                                </div>
                            </button>
                        </div> */}

                        <div className="w-full flex justify-around items-center gap-4  pt-2">
                          
                           
                        </div>

                    </div>
                }
                {/* END OF STOCKIS -1 - ONLY */}



            </div>
        </>
    )
}



