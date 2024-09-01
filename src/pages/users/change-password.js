import React, { useState, useRef } from "react";
//import Link from 'next/link'
//import Router, { useRouter } from "next/router";
import axios from 'axios';

import Head from 'next/head'

import CurrentPassword from "components/inputforms/password/CurrentPassword";
import NewPassword from "components/inputforms/password/NewPassword";
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setPlaySound } from 'redux/reducers/SoundReducer';
import { resetForm } from 'redux/reducers/FormReducer';
import { setModalMessage } from 'redux/reducers/ModalReducer';
import { setError } from 'redux/reducers/ErrorReducer';
//import { setPhone } from 'redux/reducers/AuthReducer';

//--------------------------------------

export default function Withdrawal() {

    //  const router = useRouter()
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { isLogin, token, userid } = useSelector((state) => state.AuthReducer)
    const { newPassword, currentpassword } = useSelector((state) => state.FormReducer)

    const [mypassword, setMyPassword] = useState()

    //-------------------------------------
    const handleChangePassword = async () => {

        const data = {
           
            userid,  currentpassword, newPassword,  
        }

        if (!currentpassword) {
            setSpinner(false)
            dispatch(setPlaySound('error'))
            return dispatch(setError({ path: "currentpassword", message: 'Current Password is required' }))
        }
        if (!newPassword) {
            setSpinner(false)
            dispatch(setPlaySound('error'))
            return dispatch(setError({ path: "newPassword", message: 'New Password is required' }))
        }

        
              setSpinner(true)


        //  console.log(data)


        const URL = process.env.NEXT_PUBLIC_API_URL_V1
            return axios({
            url: `${URL}/users/update-password`,
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
                console.log(data)

                if (data.isSuccess) {
                    //setMyPassword(password)
                    dispatch(resetForm())
                    dispatch(setPlaySound('success'))
                    dispatch(setModalMessage({ type: 'success', title: "Request Success!", message: 'Change password is successful' }))
                } else {
                    console.log(data)
                    dispatch(setPlaySound('error'))
                    dispatch(setError({ path: "phone", message: 'PHONE is missing' }))
                }

                setSpinner(false)

            }).catch(function (error) {
                setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            });
    }

    return (
        <>

            <Head>
                <title>FIVEFORTUNE</title>
                <meta name="description" content="Withdrawal" />
            </Head>

            <div className="min-h-screen pb-40 pt-20 px-6">


             

                <div className="flex justify-center  py-2  mt-2 mb-4">
                    <h4 className="text-white  uppercase text-[22px]">Change Password</h4>
                </div>

                <div className="md:w-1/2 mx-auto">
                <div className="border py-5 border-gray-700 bg-gray-900 text-white px-2">
                   
                    <CurrentPassword />
                    <NewPassword/>
                </div>
               

                <div className="flex justify-center mt-10">
                    {spinner ?
                        <button
                            className="_btn_submit_green w-[90%] mb-5 text-xl mx-auto py-2 mt-5 border-4 border-gray-200  flex justify-center items-center">
                            <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>  PROCESSING....</button>
                        :

                        <button onClick={handleChangePassword}
                            className="_btn_submit_green w-[90%] mb-5 text-xl mx-auto py-2 mt-5 border-4 border-gray-200  flex justify-center items-center">
                            <i className="icofont-rounded-double-right  mr-2 text-2xl"></i>
                            SUBMIT CHANGE
                        </button>


                    }
                </div>
                </div>



                {!isLogin &&
                    <div className="text-center py-2 mb-2">
                        <img src="/assets/img/join-now.png" alt="banner" />
                    </div>
                }
            </div>

        </>
    )
}



