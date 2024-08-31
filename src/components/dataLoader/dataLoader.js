import React, { useState, useEffect } from "react"
import Router, { useRouter } from "next/router"
import axios from 'axios'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMessage, setCofetty, setModalToast } from 'redux/reducers/ModalReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setAdmin_packages, setMypackages } from 'redux/reducers/PackageReducer'
import {
    setApp_title, setApp_domain, setApp_description, setApp_tags, setApp_currency, setAdmin_wallet, setSplittoEWallet, setSplittoRwallet
  } from 'redux/reducers/ConstantReducer'
  import {  setIsLogin, setName, setWallet,setEmail, setToken, setSponsor, setIsActive, setIsAdmin, setUserid,
    setEWallet, setRWallet, setWD_request, setTotal_wd_paid, 
   } from 'redux/reducers/AuthReducer'

//--------------------------------------

export default function BtnActivateBinary() {

    const router = useRouter()
    const [spinner, setSpinner] = useState(false)

    const dispatch = useDispatch()
     const { token, userid, isLogin } = useSelector((state) => state.AuthReducer)
    const { username, password } = useSelector((state) => state.FormReducer)


    useEffect(() => {
        if(isLogin){
             loadConstants()
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])
   

    const loadConstants = async () => {

             const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/pre-load?userid=${userid}`,
            method: 'GET',
          
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                const data = response.data.data
             //   console.log(data)

                dispatch(setApp_title(data.app_title))
                dispatch(setApp_domain(data.app_domain))
                dispatch(setApp_description(data.app_description))
                dispatch(setApp_tags(data.app_tags))
                dispatch(setApp_currency(data.app_currency))
                dispatch(setAdmin_wallet(data.admin_wallet_crypto))
              
                dispatch(setSplittoEWallet(data.alocate_E_Wallet))
                dispatch(setSplittoRwallet(data.alocate_R_Wallet))

                const userData = response.data.userData[0]
             //   console.log( userData)
               
                dispatch(setName(userData.name))
                dispatch(setIsActive(userData.isActive))
                dispatch(setIsAdmin(userData.isAdmin))
         
                dispatch(setEWallet(userData.e_wallet))    
                dispatch(setRWallet(userData.r_wallet)) 
                dispatch(setWD_request(userData.total_wd)) 
                dispatch(setTotal_wd_paid(userData.total_wd_paid)) 

                const adminPackage = response.data.packages
              //  console.log( adminPackage)
                dispatch(setAdmin_packages(adminPackage)) 

              // dispatch(setMypackages(adminPackage)) 

            }).catch(function (error) {
              
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }




    return (
        <>
          

        </>
    )
}



