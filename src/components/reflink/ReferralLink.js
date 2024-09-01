import React, { useEffect } from "react"
import Router, { useRouter } from "next/router"
import axios from 'axios'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setRefLink } from 'redux/reducers/ReferralReducer'
import { setFormSponsor } from 'redux/reducers/FormReducer'
//--------------------------------------

export default function ReferralLink() {

    const router = useRouter()
    const { ref } = router.query
    const dispatch = useDispatch();
    const { refLink, masterRef } = useSelector((state) => state.ReferralReducer)
    const { loginSidebar } = useSelector((state) => state.MainmenuReducer)

    useEffect(() => { // referal sponsor from URL if any
   
//    console.log('------------------REF LINK LOADED ---------------')
//    console.log(ref)

        if (ref && ref.length <= 10) { //  && !refLink // the URL link and not yet exist
            CheckRefUserExist()
        }else{
           dispatch(setRefLink(masterRef)) 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref])

    

    async function CheckRefUserExist() {

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/isActive?user=${ref}`,
            method: 'GET'
        })
            .then(async response => {
                if (response.data.isSuccess) {
                    dispatch(setRefLink(ref))
                    dispatch(setFormSponsor(ref))
                } else {
                    dispatch(setRefLink(masterRef))
                    dispatch(setFormSponsor(masterRef))
                }
            }).catch(function (error) {
                console.log(error)
            })
    }

    return (
        <></>
    )
}



