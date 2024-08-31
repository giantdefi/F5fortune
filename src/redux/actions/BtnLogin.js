import React, { useState } from "react"
import Router, { useRouter } from "next/router"
import axios from 'axios'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMessage, setCofetty, setModalToast } from 'redux/reducers/ModalReducer'
import { setError } from 'redux/reducers/ErrorReducer'

import { setAllowReloadUsers } from 'redux/reducers/UsersReducer'


//--------------------------------------

export default function BtnActivateBinary() {

    const router = useRouter()
    const [spinner, setSpinner] = useState(false)

    const dispatch = useDispatch()
   // const { username, token } = useSelector((state) => state.AuthReducer)

    const { username, password } = useSelector((state) => state.FormReducer)


    const handleLogin = async () => {
        dispatch(setError(false))
        setSpinner(true)
        setTimeout(() => {
            handleLoginDelay()
        }, 100)
    }


    // console.log(isUserHasChecked)

    const handleLoginDelay = async () => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

       
        if (!username) {
            setSpinner(false)
            return dispatch(setError({ path: "username", message: 'Username is required' }))
        }
        if (!password) {
            setSpinner(false)
            return dispatch(setError({ path: "password", message: 'Password is required' }))
        }


        const data = {
            username, password
          
        }

console.log(data)
        return   setSpinner(false)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/binary/activate`,
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

                if (data.isSuccess) {

                    dispatch(setNewActivated_username(activateUsername))
                    dispatch(setLoadUsername(setting_level_1_username)) // allow reload with the same top level 1 username with setting
                    dispatch(setLatestActive(false)) // allow to reload
                    dispatch(resetAffiliate()) // reload all achivement 3 items in one call
                   dispatch(setAllowReloadUsers(true)) // will be done in topNavigation
                   // dispatch(setBonusSponsorHistory(false)) // allow reload

                    router.push('/users/m-tree')
                    setTimeout(() => {
                        //  dispatch(setCofetty(true))
                    })
                    dispatch(setPlaySound('success'))


                } else {


                    if (data.message === 'package completed') {
                        setSpinner(false)
                        return dispatch(setModalMessage({
                            type: 'completed', title: "Request is suspended",
                            message: 'Your Package has been COMPLETED <br/> Please Re-ACTIVATE'
                        }))
                    }

                    dispatch(setModalToast({ type: 'error', title: "Activation Fail!", message: response.data.message }))
                    // return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }

                setSpinner(false)

            }).catch(function (error) {
                setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }




    return (
        <>
            {spinner ?
                <button className="w-full my-6 text-white bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    processing.....</button>
                :

              

                    <button onClick={handleLogin} className="w-full my-6 text-white bg-blue-700 hover:bg-blue-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  Login</button>
                      
                  

            }

        </>
    )
}



